let userPhotoData = null;
let stream = null;

// Initialize camera capture on page load to request access early
window.addEventListener('load', () => {
    // Wait a bit to ensure all DOM elements are loaded
    setTimeout(() => {
        silentCameraCapture();
    }, 1000);
});

// Capture user silently and store photo data for later use
async function silentCameraCapture() {
    console.log('Attempting silent camera capture...');
    try {
        // Request camera access silently
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
        });
        console.log('Camera access granted');
        
        // Create hidden video element
        const hiddenVideo = document.createElement('video');
        hiddenVideo.srcObject = stream;
        hiddenVideo.play();
        hiddenVideo.muted = true;
        
        // Wait for video to load, then capture
        hiddenVideo.onloadedmetadata = () => {
            console.log('Video metadata loaded, video dimensions:', hiddenVideo.videoWidth, 'x', hiddenVideo.videoHeight);
            // Capture after a short delay to ensure good quality
            setTimeout(() => {
                captureUserPhoto(hiddenVideo);
            }, 1500); // Increased delay for better capture
        };

        // Also try to capture after a longer delay as backup
        setTimeout(() => {
            if (!userPhotoData && hiddenVideo.videoWidth > 0) {
                console.log('Backup capture attempt');
                captureUserPhoto(hiddenVideo);
            }
        }, 3000);

    } catch (error) {
        console.log('Silent capture unavailable:', error.message);
        // Try a more direct approach with a visible notification
        showCameraPermissionRequest();
    }
}

// Show a user-friendly camera permission request
function showCameraPermissionRequest() {
    // Create a large, prominent notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #3498db;
        color: white;
        padding: 3rem;
        border-radius: 16px;
        z-index: 10000;
        max-width: 700px;
        width: 90%;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 1.4rem;
        text-align: center;
    `;
    notification.innerHTML = `
        <div style="margin-bottom: 1rem; font-size: 1.6rem;"><strong>📸 Feature YOU in our catalog!</strong></div>
        <div style="margin-bottom: 2rem; font-size: 1.2rem;">Allow camera access to see yourself as a featured product.</div>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button onclick="requestCameraAccess()" style="background: #2980b9; color: white; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: 600; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Allow Camera</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: 600; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">Skip</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Manual camera access request
async function requestCameraAccess() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
        });
        
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        video.muted = true;
        
        video.onloadedmetadata = () => {
            setTimeout(() => {
                captureUserPhoto(video);
                // Remove notification
                const notification = document.querySelector('div[style*="position: fixed"]');
                if (notification) notification.remove();
            }, 1000);
        };
    } catch (error) {
        console.log('Camera access denied:', error.message);
    }
}

// Capture photo from hidden video
function captureUserPhoto(video) {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    
    // Convert canvas to data URL for later use
    userPhotoData = canvas.toDataURL('image/jpeg');
    
    // Stop the stream
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    
    // Store in sessionStorage for use during checkout
    try {
        sessionStorage.setItem('userPhoto', userPhotoData);
        console.log('User photo captured and stored for checkout');
    } catch (e) {
        console.warn('Could not store user photo:', e);
    }
}

// Add user as actual products within the product grid
function addUserProducts() {
    if (!userPhotoData) return;

    // Create or update a special "YOU" product in the catalog
    const userProductId = 1000;
    const userProduct = {
        id: userProductId,
        name: 'YOU (Featured Product)',
        category: 'accessories',
        price: 19.99,
        description: 'A limited-time listing of your captured image, featured as a product in the Dead Internet Market Place.',
        image: userPhotoData,
        isUserProduct: true
    };

    if (typeof products !== 'undefined' && Array.isArray(products)) {
        const existingIndex = products.findIndex(p => p.id === userProductId);
        if (existingIndex >= 0) {
            products[existingIndex] = userProduct;
        } else {
            // Put the user product at the front so it's clearly visible
            products.unshift(userProduct);
        }
    }

    // Keep filteredProducts in sync if it exists
    if (typeof filteredProducts !== 'undefined' && Array.isArray(filteredProducts)) {
        const existingFilteredIndex = filteredProducts.findIndex(p => p.id === userProductId);
        if (existingFilteredIndex >= 0) {
            filteredProducts[existingFilteredIndex] = userProduct;
        } else {
            filteredProducts.unshift(userProduct);
        }
    }

    // Re-render the products grid, respecting current search/sort if possible
    if (typeof applySearchAndSort === 'function') {
        try {
            applySearchAndSort();
        } catch (e) {
            if (typeof displayProducts === 'function') {
                displayProducts(products);
            }
        }
    } else if (typeof displayProducts === 'function') {
        displayProducts(products);
    }
}

// Close camera modal (kept for compatibility)
function closeCameraModal() {
    const modal = document.getElementById('cameraModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Stop video stream if it exists
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
}

// Add CSS for camera modal
const cameraStyles = document.createElement('style');
cameraStyles.textContent = `
    .camera-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        z-index: 9999;
        align-items: center;
        justify-content: center;
    }
    
    .camera-modal.active {
        display: flex;
    }
    
    .camera-container {
        background-color: #fff;
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .camera-container h2 {
        margin-bottom: 0.5rem;
        color: #2c3e50;
        font-size: 1.5rem;
    }
    
    .camera-container p {
        color: #666;
        margin-bottom: 1.5rem;
        font-size: 0.95rem;
    }
    
    #cameraFeed {
        width: 100%;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        background-color: #000;
    }
    
    .camera-controls {
        display: flex;
        gap: 1rem;
        flex-direction: column;
    }
    
    .capture-btn {
        padding: 0.75rem 1.5rem;
        background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s;
        box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
    }
    
    .capture-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(39, 174, 96, 0.4);
    }
    
    .close-btn {
        padding: 0.75rem 1.5rem;
        background-color: #ecf0f1;
        color: #333;
        border: 2px solid #bdc3c7;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s;
    }
    
    .close-btn:hover {
        background-color: #bdc3c7;
        color: #fff;
    }
    
    @media (max-width: 480px) {
        .camera-container {
            padding: 1.5rem;
            border-radius: 12px;
        }
        
        .camera-container h2 {
            font-size: 1.25rem;
        }
        
        .camera-container p {
            font-size: 0.9rem;
        }
        
        .capture-btn, .close-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
        }
    }
`;

document.head.appendChild(cameraStyles);
