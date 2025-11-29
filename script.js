// Shopping cart state
let cart = [];
let filteredProducts = [...products];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupSearchListener();
});

// Display products on the page
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-category">${product.category.replace('mens', "Men's").replace('womens', "Women's").replace('accessories', 'Accessories')}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showCartNotification();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle cart sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Show cart notification
function showCartNotification() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.5s ease';
    }, 10);
}

// Filter products
function filterProducts() {
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[value="mens"], .filter-group input[value="womens"], .filter-group input[value="accessories"]');
    const priceCheckboxes = document.querySelectorAll('.filter-group input[value="0-50"], .filter-group input[value="50-100"], .filter-group input[value="100-200"], .filter-group input[value="200+"]');
    
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    const selectedPriceRanges = Array.from(priceCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    filteredProducts = products.filter(product => {
        // Category filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        // Price filter
        let priceMatch = selectedPriceRanges.length === 0;
        if (!priceMatch) {
            priceMatch = selectedPriceRanges.some(range => {
                if (range === '0-50') return product.price < 50;
                if (range === '50-100') return product.price >= 50 && product.price < 100;
                if (range === '100-200') return product.price >= 100 && product.price < 200;
                if (range === '200+') return product.price >= 200;
                return false;
            });
        }
        
        return categoryMatch && priceMatch;
    });
    
    applySearchAndSort();
}

// Sort products
function sortProducts() {
    applySearchAndSort();
}

// Setup search listener
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        applySearchAndSort();
    });
}

// Apply search and sort
function applySearchAndSort() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    
    // Apply search filter
    let results = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Apply sorting
    switch(sortValue) {
        case 'price-low':
            results.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            results.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            results.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    displayProducts(results);
}

// Add bounce animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);
