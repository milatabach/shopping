// Shopping cart state
let cart = [];
let filteredProducts = [...products];
let lastReceiptHtml = '';
let cartSound = null;

// Map each product to a specific "feeling" about consumerism
const consumerismFeelingsById = {
    1: 'Everyday comfort disguised as a tiny upgrade you didn’t really need',
    2: 'The hope that a better fit will finally mean a better self',
    3: 'Buying the feeling of being seen, admired, and perfectly in season',
    4: 'Carrying the weight of everything you own, and a little status too',
    5: 'The fantasy that new gear will transform you into your best self',
    6: 'Wrapping yourself in softness to quiet a harder world',
    7: 'Ironed respectability you can put on like armor',
    8: 'Discipline, flexibility, and self‑improvement sewn into stretchy fabric',
    9: 'A glossy shield between your eyes and an overwhelming reality',
    10: 'Insulation against both the cold and the uncertainty outside',
    11: 'Luxury as proof that you are finally worth the softness',
    12: 'Casual freedom trimmed to an acceptable length',
    14: 'Preparedness for leaving, even when you rarely do',
    15: 'Old‑world stability bought off a modern rack',
    16: 'The belief that sweat can be aesthetic and productive',
    18: 'Cozy retreat you can zip into when everything feels too loud',
    19: 'Professional polish that asks your body to stay inside the lines',
    20: 'A small circle of warmth in a cooling world',
    22: 'A fabric illusion that life might wrap up neatly too',
    23: 'Nostalgic simplicity that still comes with a price tag',
    24: 'Borrowed toughness from a jacket that has never seen a war',
    25: 'A soft accent to prove you thought about how you look',
    26: 'Elastic permission to keep moving, never stopping',
    27: 'Rebellious cool that now comes pre‑distressed and overproduced',
    28: 'Organized identity: cards, cash, and carefully curated self',
    29: 'Casual success stitched into a tiny embroidered logo',
    30: 'The sound of your steps trying to keep up with expectations',
    31: 'Happiness, bottled and barcoded, sold in limited editions',
    32: 'Time, once priceless, now on sale while supplies last',
    33: 'Dreams outsourced to a brand and delivered overnight',
    34: 'Confidence in capsule form, activated at checkout',
    35: 'Peace of mind offered as a premium subscription to yourself',
    1000: 'You, briefly packaged and priced for someone else'
};

function getConsumerismFeelingForItem(item) {
    if (item && Object.prototype.hasOwnProperty.call(consumerismFeelingsById, item.id)) {
        return consumerismFeelingsById[item.id];
    }

    if (item && item.isCustom) {
        return 'A personalized desire, instantly manufactured on demand';
    }

    // Generic fallback in case something slips through
    return 'Another small purchase trying to fill a much larger gap';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    setupSearchListener();

    // Prepare cash register sound effect
    try {
        cartSound = new Audio('Cash Register (Kaching) - Sound Effect (HD).mp3');
        cartSound.volume = 0.6;
    } catch (e) {
        console.warn('Unable to initialize cart sound:', e);
    }
});

function playCartSound() {
    if (!cartSound) return;
    try {
        cartSound.currentTime = 0;
        const playPromise = cartSound.play();
        if (playPromise && typeof playPromise.then === 'function') {
            playPromise.catch(() => {
                /* ignore autoplay / user gesture errors */
            });
        }
    } catch (e) {
        console.warn('Cart sound failed to play:', e);
    }
}

// Display products on the page
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
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
    playCartSound();
}

// Add a custom item that isn't in the product catalog
function addCustomItem() {
    const name = prompt('Enter the name of the item:');
    if (!name || !name.trim()) {
        return;
    }

    // Automatically generate a plausible price between $5 and $250
    const min = 5;
    const max = 250;
    const price = parseFloat((Math.random() * (max - min) + min).toFixed(2));

    const query = encodeURIComponent(name.trim());
    const customItem = {
        id: Date.now(), // simple unique id
        name: name.trim(),
        category: 'custom',
        price,
        description: 'Custom item added by you. Price and preview generated automatically by the marketplace.',
        // Use a placeholder image that always loads, with the item name rendered as text
        image: `https://dummyimage.com/600x600/f2f2f2/555&text=${query}`,
        quantity: 1,
        isCustom: true
    };

    cart.push(customItem);
    updateCart();
    showCartNotification();
    playCartSound();
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
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
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
            if (change > 0) {
                playCartSound();
            }
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

// Generate and show receipt
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }
    
    // Use any stored camera photo to feature the user in the hero banner
    if (typeof addUserProducts === 'function') {
        try {
            addUserProducts();
        } catch (e) {
            console.warn('Hero update failed:', e);
        }
    }

    const receiptDetails = document.getElementById('receiptDetails');
    const receiptModal = document.getElementById('receiptModal');
    const receiptOverlay = document.getElementById('receiptOverlay');

    if (!receiptDetails || !receiptModal || !receiptOverlay) {
        console.warn('Receipt elements not found in the DOM.');
        return;
    }

    const now = new Date();
    const orderId = 'DIM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const itemsHtml = cart.map((item, index) => {
        const feeling = getConsumerismFeelingForItem(item);
        return `
        <tr>
            <td>${index + 1}</td>
            <td>${feeling}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
        `;
    }).join('');

    const receiptHtml = `
        <div class="receipt-meta">
            <div>
                <div class="receipt-store-name">Dead Internet Market Place</div>
                <div class="receipt-store-tagline">A marketplace for everything, even you.</div>
            </div>
            <div class="receipt-meta-right">
                <div><strong>Order #:</strong> ${orderId}</div>
                <div><strong>Date:</strong> ${now.toLocaleString()}</div>
            </div>
        </div>
        <table class="receipt-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Feeling</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>
        <div class="receipt-summary">
            <div class="receipt-summary-row">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
        <p class="receipt-footer-text">Keep this receipt for your records. This is a fictional marketplace—no real purchases were made.</p>
    `;

    lastReceiptHtml = receiptHtml;
    receiptDetails.innerHTML = receiptHtml;

    // Close cart sidebar if open
    const sidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (sidebar && cartOverlay && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }

    receiptModal.classList.add('active');
    receiptOverlay.classList.add('active');
}

function closeReceipt() {
    const receiptModal = document.getElementById('receiptModal');
    const receiptOverlay = document.getElementById('receiptOverlay');
    if (receiptModal) {
        receiptModal.classList.remove('active');
    }
    if (receiptOverlay) {
        receiptOverlay.classList.remove('active');
    }
}

function printReceipt() {
    const content = lastReceiptHtml || (document.getElementById('receiptDetails')?.innerHTML || '');
    if (!content) {
        alert('No receipt available to print.');
        return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('Please allow pop-ups to print your receipt.');
        return;
    }

    printWindow.document.write(`
        <html>
            <head>
                <title>Order Receipt - Dead Internet Market Place</title>
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                        padding: 20px;
                        color: #333;
                        background-color: #ffffff;
                    }
                    h1 {
                        text-align: center;
                        margin-bottom: 1rem;
                    }
                    .receipt-meta {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 1rem;
                        gap: 1rem;
                        font-size: 0.9rem;
                    }
                    .receipt-store-name {
                        font-weight: 700;
                        font-size: 1.1rem;
                        margin-bottom: 0.25rem;
                    }
                    .receipt-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 1rem;
                    }
                    .receipt-table th,
                    .receipt-table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        font-size: 0.9rem;
                    }
                    .receipt-table th {
                        background-color: #f5f5f5;
                        text-align: left;
                    }
                    .receipt-summary {
                        text-align: right;
                        margin-top: 1rem;
                        font-size: 1rem;
                        font-weight: 600;
                    }
                    .receipt-footer-text {
                        margin-top: 1.5rem;
                        font-size: 0.8rem;
                        color: #777;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h1>Order Receipt</h1>
                ${content}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
