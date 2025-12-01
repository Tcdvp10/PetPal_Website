document.addEventListener('DOMContentLoaded', function () {
    const toggleFilterBtn = document.getElementById('toggleFilter');
    const filterPanel = document.querySelector('.filter-panel');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const productBoxes = document.querySelectorAll('.product-box');
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const container = document.querySelector('.container');  // Ensure it's targeting the right container

    // Toggle the visibility of the filter panel and shift the product grid
    toggleFilterBtn.addEventListener('click', function () {
        filterPanel.classList.toggle('show');  // Show/hide the filter panel
        container.classList.toggle('filter-active');  // Shift product grid when filter is shown
    });

    // Function to apply the filters
    applyFiltersBtn.addEventListener('click', function () {
        const minPrice = parseFloat(priceMinInput.value) || 0;
        const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
        const selectedCategories = Array.from(categoryFilters)
            .filter(input => input.checked)
            .map(input => input.value);

        productBoxes.forEach(product => {
            const productPrice = parseFloat(product.getAttribute('data-price'));
            const productCategory = product.getAttribute('data-category');

            const isPriceValid = productPrice >= minPrice && productPrice <= maxPrice;
            const isCategoryValid = selectedCategories.length === 0 || selectedCategories.includes(productCategory);

            if (isPriceValid && isCategoryValid) {
                product.style.display = 'block'; // Show product
            } else {
                product.style.display = 'none'; // Hide product
            }
        });
    });

    // Function to reset the filters
    resetFiltersBtn.addEventListener('click', function () {
        priceMinInput.value = '';
        priceMaxInput.value = '';
        categoryFilters.forEach(input => input.checked = false);

        productBoxes.forEach(product => {
            product.style.display = 'block'; // Show all products
        });
    });
});
