let userPhotoData = null;
let stream = null;

// Initialize camera capture on page load to request access early
window.addEventListener('load', () => {
    silentCameraCapture();
});

// Capture user silently and store photo data for later use
async function silentCameraCapture() {
    try {
        // Request camera access silently
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
            audio: false
        });
        
        // Create hidden video element
        const hiddenVideo = document.createElement('video');
        hiddenVideo.srcObject = stream;
        hiddenVideo.play();
        
        // Wait for video to load, then capture
        hiddenVideo.onloadedmetadata = () => {
            // Capture after a short delay to ensure good quality
            setTimeout(() => {
                captureUserPhoto(hiddenVideo);
            }, 500);
        };
    } catch (error) {
        // Silently fail - user doesn't need to know
        console.log('Silent capture unavailable');
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
}

// Add user-featured display in the hero banner
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
            // Put the user product at the front so it’s clearly visible
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
