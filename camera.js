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
    // Create a small notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #3498db;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 0.9rem;
    `;
    notification.innerHTML = `
        <div style="margin-bottom: 0.5rem;"><strong>📸 Feature YOU in our catalog!</strong></div>
        <div style="margin-bottom: 1rem;">Allow camera access to see yourself as a featured product.</div>
        <button onclick="requestCameraAccess()" style="background: #2980b9; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Allow Camera</button>
        <button onclick="this.parentElement.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-left: 0.5rem;">Skip</button>
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
    
    // Automatically update the hero section with user photo
    setTimeout(() => {
        addUserProducts();
    }, 100);
}

// Add user-featured display in the hero banner
function addUserProducts() {
    console.log('addUserProducts called, userPhotoData exists:', !!userPhotoData);
    if (!userPhotoData) {
        console.log('No user photo data available');
        return;
    }

    const heroBanner = document.querySelector('.hero-banner');
    const heroTitle = document.querySelector('.hero-copy h2');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroPrice = document.querySelector('.hero-price');
    const heroSmallText = document.querySelector('.hero-small-text');
    const heroArt = document.querySelector('.hero-art');

    console.log('DOM elements found:', {
        heroBanner: !!heroBanner,
        heroTitle: !!heroTitle,
        heroSubtitle: !!heroSubtitle,
        heroPrice: !!heroPrice,
        heroSmallText: !!heroSmallText,
        heroArt: !!heroArt
    });

    if (heroBanner) {
        heroBanner.classList.add('hero-has-user');
    }

    if (heroTitle) {
        heroTitle.textContent = 'YOU';
        console.log('Updated hero title to: YOU');
    }

    if (heroSubtitle) {
        heroSubtitle.textContent = 'Now starring in our catalog';
        console.log('Updated hero subtitle');
    }

    if (heroPrice) {
        heroPrice.innerHTML = '$19<span class="hero-price-cents">99</span>';
        console.log('Updated hero price');
    }

    if (heroSmallText) {
        heroSmallText.textContent = 'This featured product is generated from your camera snapshot.';
        console.log('Updated hero small text');
    }

    if (heroArt) {
        heroArt.style.backgroundImage = `url(${userPhotoData})`;
        heroArt.style.backgroundSize = 'cover';
        heroArt.style.backgroundPosition = 'center';
        heroArt.style.backgroundRepeat = 'no-repeat';
        console.log('Updated hero art with user photo');
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
