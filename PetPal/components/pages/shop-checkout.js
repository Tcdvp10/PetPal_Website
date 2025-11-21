// shop-checkout.js

// ---------- CART DATA MANAGEMENT ----------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

// Update cart icon with number of items
function updateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return; // Only runs if cart icon exists
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Remove old badge if exists
    const oldBadge = cartIcon.querySelector('.cart-count');
    if (oldBadge) oldBadge.remove();

    // Add badge if there are items
    if (count > 0) {
        const badge = document.createElement('span');
        badge.classList.add('cart-count');
        badge.textContent = count;
        badge.style.position = 'absolute';
        badge.style.top = '0';
        badge.style.right = '0';
        badge.style.backgroundColor = 'red';
        badge.style.color = 'white';
        badge.style.fontSize = '12px';
        badge.style.borderRadius = '50%';
        badge.style.padding = '2px 6px';
        cartIcon.style.position = 'relative';
        cartIcon.appendChild(badge);
    }
}

// ---------- ADD TO CART FUNCTION ----------
function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
}

// ---------- DISPLAY CART ON CHECKOUT ----------
function displayCart() {
    const cartList = document.getElementById('cart-items');
    const totalPriceEl = document.getElementById('total-price');
    if (!cartList) return;

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartList.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceEl.textContent = total.toFixed(2);
}

// ---------- SIMULATE PAYMENT ----------
const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear cart
        cart = [];
        saveCart();

        // Clear order summary
        displayCart();

        // Optionally, reset form
        checkoutForm.reset();

        //redirection to success page
        window.location.href = 'success.html';
    });
}

// ---------- NAV CART ICON CLICK ----------
const cartIcon = document.querySelector('.cart-icon');
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// ---------- INITIALIZATION ----------
displayCart();
updateCartIcon();

// ---------- OPTIONAL: Add buy buttons on shop page ----------
const buyButtons = document.querySelectorAll('.buy-button'); // Make sure buttons have this class
buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseFloat(btn.dataset.price)
        };
        addToCart(product);
        alert(`${product.name} added to cart!`);
    });
});

//The code for the searchbar starts here now
const searchInput = document.querySelector(".search-container input");
const searchContainer = document.querySelector(".search-container");
const products = document.querySelectorAll(".product-box");

// Create suggestions list element
const suggestionList = document.createElement("ul");
suggestionList.classList.add("search-suggestions");
searchContainer.appendChild(suggestionList);

// Function to update suggestions
function updateSuggestions(value) {
    suggestionList.innerHTML = "";
    if (!value) {
        suggestionList.style.display = "none";
        // Show all products when input is empty
        products.forEach(p => p.style.display = "block");
        return;
    }

    const filteredProducts = [];
    products.forEach(product => {
        const title = product.querySelector("h3").textContent.toLowerCase();
        if (title.includes(value.toLowerCase())) {
            product.style.display = "block";  // show matching product
            filteredProducts.push(title);
        } else {
            product.style.display = "none";  // hide non-matching
        }
    });

    if (filteredProducts.length === 0) {
        suggestionList.style.display = "none";
        return;
    }

    filteredProducts.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        li.addEventListener("click", () => {
            searchInput.value = item;
            updateSuggestions(item); // update filtering
            suggestionList.style.display = "none";
        });
        suggestionList.appendChild(li);
    });

    suggestionList.style.display = "block";
}

// Listen to input
searchInput.addEventListener("input", (e) => {
    updateSuggestions(e.target.value);
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
        suggestionList.style.display = "none";
    }
});