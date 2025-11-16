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