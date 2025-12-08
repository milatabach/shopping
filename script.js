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
    const categoryCheckboxes = document.querySelectorAll('.filter-group input[value="mom"], .filter-group input[value="dad"], .filter-group input[value="sibling"], .filter-group input[value="friends"]');
    
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    filteredProducts = products.filter(product => {
        // Category filter only
        return selectedCategories.length === 0 || selectedCategories.includes(product.category);
    });
    
    applySortOnly();
}

// Sort products
function sortProducts() {
    applySortOnly();
}

// Apply sorting only (no search)
function applySortOnly() {
    const sortValue = document.getElementById('sortSelect').value;
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

// Checkout with existential choice - side by side layout with user camera
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checking out.');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Build items HTML
    const itemsHtml = cart.map((item, index) => `
        <div style="padding: 10px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1; text-align: left;">
                <div style="font-weight: bold; margin-bottom: 4px;">${item.name}</div>
                <div style="font-size: 0.9em; color: #666;">Qty: ${item.quantity}</div>
            </div>
            <div style="text-align: right; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
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
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        overflow-y: auto;
    `;
    
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 40px;
        max-width: 900px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        display: flex;
        gap: 40px;
        align-items: flex-start;
    `;
    
    checkoutModal.innerHTML = `
        <div style="flex: 1; min-width: 0;">
            <h3 style="margin: 0 0 20px 0; font-size: 1.2em; color: #333;">Your Items</h3>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                ${itemsHtml}
            </div>
            <div style="padding: 20px 0; border-top: 2px solid #333; display: flex; justify-content: space-between; align-items: center; font-size: 1.1em; font-weight: bold;">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
        
        <div style="flex: 1; min-width: 0; text-align: center;">
            <canvas id="userPhotoCanvas" style="width: 100%; max-height: 350px; border-radius: 8px; margin-bottom: 20px; object-fit: cover; background: #000; display: none;"></canvas>
            <img id="userPhoto" style="width: 100%; max-height: 350px; border-radius: 8px; margin-bottom: 20px; object-fit: cover; background: #000;">
            <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="font-size: 1.15em; color: #333; font-weight: bold; margin: 0; line-height: 1.6;">
                    Give all of this to your loved ones<br>or give yourself to them?
                </p>
            </div>
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button id="giveThemBtn" style="padding: 12px; background: #ff6b35; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: bold;">Give Them This</button>
                <button id="giveYourselfBtn" style="padding: 12px; background: #004e89; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: bold;">Give Yourself</button>
            </div>
        </div>
    `;
    
    checkoutOverlay.appendChild(checkoutModal);
    document.body.appendChild(checkoutOverlay);
    
    // Access user camera
    startUserCamera();
    
    // Handle button clicks
    document.getElementById('giveThemBtn').onclick = () => {
        completeCheckout('Give Them This', checkoutOverlay);
    };
    
    document.getElementById('giveYourselfBtn').onclick = () => {
        completeCheckout('Give Yourself', checkoutOverlay);
    };
    
    // Close cart sidebar if open
    const sidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    if (sidebar && cartOverlay && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }
}

// Start user camera for checkout - capture a random photo
function startUserCamera() {
    const canvas = document.getElementById('userPhotoCanvas');
    const img = document.getElementById('userPhoto');
    
    if (!canvas || !img) return;
    
    // Access user's camera
    navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
    })
    .then(stream => {
        // Create video element temporarily to capture frame
        const video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
            
            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            // Wait a random time between 500ms - 2000ms before capturing
            const randomDelay = Math.random() * 1500 + 500;
            setTimeout(() => {
                // Capture frame from video to canvas
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0);
                
                // Convert canvas to image
                const photoData = canvas.toDataURL('image/jpeg');
                img.src = photoData;
                
                // Stop the camera stream
                stream.getTracks().forEach(track => track.stop());
            }, randomDelay);
        };
    })
    .catch(err => {
        console.warn('Camera access denied or unavailable:', err);
        // Show fallback message
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
        `;
        fallback.textContent = 'Camera not available. Please allow camera access.';
        img.parentNode.insertBefore(fallback, img);
        img.style.display = 'none';
    });
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
        <h2 style="margin: 0 0 20px 0; font-size: 2em; color: #333;">Order Confirmed!</h2>
        <p style="font-size: 1.1em; color: #666; margin: 20px 0; line-height: 1.6;">
            Let's hope this is enough to show love to your loved ones.
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
