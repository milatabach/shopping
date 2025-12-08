// Shopping cart state
let cart = [];
let filteredProducts = [...products];
let lastReceiptHtml = '';
let cartSound = null;

// Map each product to a specific "feeling" about consumerism
const consumerismFeelingsById = {
    1: 'Everyday comfort disguised as a tiny upgrade you didn\'t really need',
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
    
    // Request camera permission on page load
    requestCameraPermission();
    
    // Prepare cash register sound effect
    try {
        cartSound = new Audio('Cash Register (Kaching) - Sound Effect (HD).mp3');
        cartSound.volume = 0.6;
    } catch (e) {
        console.warn('Unable to initialize cart sound:', e);
    }
});

// Request camera permission when page loads
function requestCameraPermission() {
    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
    })
    .then(stream => {
        // Stop the stream immediately after permission is granted
        stream.getTracks().forEach(track => track.stop());
        console.log('Camera permission granted');
    })
    .catch(err => {
        console.warn('Camera permission denied or unavailable:', err);
    });
}

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
                <div class="product-category">${product.category.replace('mom', 'Mom').replace('dad', 'Dad').replace('sibling', 'Sibling').replace('friends', 'Friends').replace('mens', "Men's").replace('womens', "Women's").replace('accessories', 'Accessories').replace('featured', 'Featured')}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event); event.stopPropagation();" type="button">Add to Cart</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add product to cart
function addToCart(productId, event) {
    try {
        const product = products.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            showToast('Product not found', 'error');
            return;
        }
        
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
        showToast(`${product.name} added to cart!`, 'success');
        
        // Auto-open cart sidebar
        const sidebar = document.getElementById('cartSidebar');
        const overlay = document.getElementById('cartOverlay');
        if (sidebar && !sidebar.classList.contains('active')) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        }
        
        // Add button animation feedback
        const button = event?.target || document.querySelector(`button[onclick*="addToCart(${productId})"]`);
        if (button) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Error adding item to cart', 'error');
    }
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
    
    // Update cart count with animation
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        const oldCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = totalItems;
        
        // Pulse animation when count changes
        if (totalItems > oldCount) {
            cartCount.classList.add('pulse');
            setTimeout(() => {
                cartCount.classList.remove('pulse');
            }, 500);
        }
    }
    
    // Update cart items with smooth animations
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item" style="animation-delay: ${index * 0.05}s">
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
                showToast('Quantity updated', 'success');
            }
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        showToast(`${item.name} removed from cart`, 'success');
    }
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
    if (cartIcon) {
        cartIcon.style.animation = 'none';
        setTimeout(() => {
            cartIcon.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Filter products
function filterProducts() {
    const selectedRadio = document.querySelector('input[name="category"]:checked');
    const selectedCategory = selectedRadio ? selectedRadio.value : 'all';
    
    filteredProducts = products.filter(product => {
        // Category filter - show all if 'all' is selected
        return selectedCategory === 'all' || product.category === selectedCategory;
    });
    
    // Display filtered products
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    applySortOnly();
}

// Apply sorting only (no search)
function applySortOnly() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) {
        displayProducts(filteredProducts);
        return;
    }
    
    const sortValue = sortSelect.value;
    let results = [...filteredProducts];
    
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

// Checkout with existential choice - minimalistic layout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }
    
    // Build items HTML without prices
    const itemsHtml = cart.map((item, index) => `
        <div style="padding: 12px 0; ${index < cart.length - 1 ? 'border-bottom: 1px solid #e0e0e0;' : ''}">
            <div style="font-weight: 500; color: #2c3e50; margin-bottom: 4px;">${item.name}</div>
            <div style="font-size: 0.85em; color: #7f8c8d;">Qty: ${item.quantity}</div>
        </div>
    `).join('');
    
    // Create checkout modal
    const checkoutOverlay = document.createElement('div');
    checkoutOverlay.id = 'checkoutOverlay';
    checkoutOverlay.className = 'checkout-overlay';
    checkoutOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 40px;
        max-width: 1000px;
        width: 100%;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    `;
    
    checkoutModal.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px;">
            <!-- Cart Items Column -->
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 1.1em; color: #2c3e50; font-weight: 600;">Your Cart</h3>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 6px;">
                    ${itemsHtml}
                </div>
            </div>
            
            <!-- User Photo as Product Card Column -->
            <div>
                <h3 style="margin: 0 0 20px 0; font-size: 1.1em; color: #2c3e50; font-weight: 600;">Or This</h3>
                <div class="product-card" style="margin: 0; cursor: default;">
                    <img id="userPhoto" class="product-image" style="display: block;">
                    <canvas id="userPhotoCanvas" style="display: none;"></canvas>
                    <div class="product-info">
                        <div class="product-category" style="color: #f39c12;">FEATURED</div>
                        <div class="product-name">YOU</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Question and Buttons -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 1.2em; color: #2c3e50; margin: 0 0 25px 0; line-height: 1.5; font-weight: 700;">
                Give them everything in your cart… or give them you?
            </p>
            <div style="display: flex; gap: 15px; justify-content: center; max-width: 500px; margin: 0 auto;">
                <button id="stickWithCartBtn" style="flex: 1; padding: 14px 20px; background: #2c3e50; color: white; border: 2px solid #2c3e50; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: 600; transition: all 0.3s;">Stick with my cart</button>
                <button id="bestGiftBtn" style="flex: 1; padding: 14px 20px; background: #2c3e50; color: white; border: 2px solid #2c3e50; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: 600; transition: all 0.3s;">I am the best gift</button>
            </div>
        </div>
    `;
    
    checkoutOverlay.appendChild(checkoutModal);
    document.body.appendChild(checkoutOverlay);
    
    // Load user photo
    startUserCamera();
    
    // Add hover effects to buttons
    const stickBtn = document.getElementById('stickWithCartBtn');
    const bestBtn = document.getElementById('bestGiftBtn');
    
    stickBtn.addEventListener('mouseenter', () => {
        stickBtn.style.background = '#34495e';
    });
    stickBtn.addEventListener('mouseleave', () => {
        stickBtn.style.background = '#2c3e50';
    });
    
    bestBtn.addEventListener('mouseenter', () => {
        bestBtn.style.background = '#34495e';
    });
    bestBtn.addEventListener('mouseleave', () => {
        bestBtn.style.background = '#2c3e50';
    });
    
    // Handle button clicks
    stickBtn.onclick = () => {
        completeCheckout('Stick with my cart', checkoutOverlay);
    };
    
    bestBtn.onclick = () => {
        completeCheckout('I am the best gift', checkoutOverlay);
    };
    
    // Close cart sidebar if open
    const sidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (sidebar && cartOverlay && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

// Start user camera for checkout - use stored photo from initial capture
function startUserCamera() {
    const canvas = document.getElementById('userPhotoCanvas');
    const img = document.getElementById('userPhoto');
    
    if (!canvas || !img) return;
    
    // Try to get the stored photo from sessionStorage
    try {
        const storedPhoto = sessionStorage.getItem('userPhoto');
        if (storedPhoto) {
            // Use the photo captured at page load
            img.src = storedPhoto;
            console.log('Using stored user photo from initial capture');
            return;
        }
    } catch (e) {
        console.warn('Could not retrieve stored photo:', e);
    }
    
    // Fallback: If no stored photo, show message
    console.warn('No stored photo available');
    const fallback = document.createElement('div');
    fallback.style.cssText = `
        width: 100%;
        max-height: 350px;
        border-radius: 8px;
        margin-bottom: 20px;
        background: #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 0.9em;
        padding: 2rem;
        text-align: center;
    `;
    fallback.textContent = 'Photo not available. Please refresh the page and allow camera access.';
    img.parentNode.insertBefore(fallback, img);
    img.style.display = 'none';
}

// Complete the checkout after choice
function completeCheckout(choice, overlay) {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Remove the checkout modal
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
    
    // Create confirmation modal
    const confirmationOverlay = document.createElement('div');
    confirmationOverlay.id = 'confirmationOverlay';
    confirmationOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
    `;
    
    const confirmationModal = document.createElement('div');
    confirmationModal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 50px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;
    
    confirmationModal.innerHTML = `
        <h2 style="margin: 0 0 20px 0; font-size: 2em; color: #333;"> Do you think this will be enough to have their love?</h2>
        <p style="font-size: 1.1em; color: #666; margin: 20px 0; line-height: 1.6;">
            Order Confirmed! Your loved one should expect it in the mail in 1–2 hours.
        </p>
        <button id="closeConfirmBtn" style="padding: 12px 30px; background: #004e89; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: bold; margin-top: 20px;">Continue Shopping</button>
    `;
    
    confirmationOverlay.appendChild(confirmationModal);
    document.body.appendChild(confirmationOverlay);
    
    // Handle close button
    document.getElementById('closeConfirmBtn').onclick = () => {
        if (confirmationOverlay && confirmationOverlay.parentNode) {
            confirmationOverlay.parentNode.removeChild(confirmationOverlay);
        }
    };
    
    // Clear the cart
    cart = [];
    updateCart();
}
