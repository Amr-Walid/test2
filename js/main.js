// =============================================
// Zeyad & Rawan - Engagement Invitation
// Main JavaScript for Interactivity
// =============================================

// ===== CONFIGURATION =====
const CONFIG = {
    eventDate: new Date('2025-11-07T19:00:00'),
    tableName: 'guestbook_messages',
    canvasWidth: 800,
    canvasHeight: 400
};

// ===== STATE MANAGEMENT =====
const state = {
    currentColor: '#000000',
    currentWidth: 2,
    isDrawing: false,
    drawingHistory: [],
    currentPath: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initEnvelopeAnimation();
    initScrollReveal();
    initCountdown();
    initGuestbook();
    initPhotoUpload();
});

// ===== ENVELOPE ANIMATION =====
function initEnvelopeAnimation() {
    const envelopeContainer = document.querySelector('.envelope-container');
    const envelope = document.getElementById('envelope');
    const revealSection = document.getElementById('invitation-reveal');
    const heroSection = document.getElementById('hero-section');

    if (!envelopeContainer || !envelope) return;

    envelopeContainer.addEventListener('click', () => {
        // Add opening animation class
        envelope.classList.add('opening');
        
        // Wait for envelope animation
        setTimeout(() => {
            // Fade out the reveal section
            revealSection.classList.add('fade-out');
            
            // Wait for fade out, then show hero section
            setTimeout(() => {
                revealSection.style.display = 'none';
                heroSection.classList.remove('hidden');
                heroSection.classList.add('fade-in');
                
                // Trigger fade-in sequence for hero content
                triggerFadeInSequence();
            }, 500);
        }, 800);
    });
}

function triggerFadeInSequence() {
    const fadeInItems = document.querySelectorAll('.fade-in-item');
    fadeInItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
        }, index * 300);
    });
}

// ===== SMOOTH SCROLL REVEAL =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// ===== COUNTDOWN TIMER =====
function initCountdown() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    function updateCountdown() {
        const now = new Date();
        const timeDiff = CONFIG.eventDate - now;

        if (timeDiff <= 0) {
            // Event has passed
            Object.values(countdownElements).forEach(el => {
                if (el) el.textContent = '00';
            });
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Update with flip animation
        updateNumberWithFlip(countdownElements.days, days);
        updateNumberWithFlip(countdownElements.hours, hours);
        updateNumberWithFlip(countdownElements.minutes, minutes);
        updateNumberWithFlip(countdownElements.seconds, seconds);
    }

    function updateNumberWithFlip(element, value) {
        if (!element) return;
        
        const formattedValue = String(value).padStart(2, '0');
        
        if (element.textContent !== formattedValue) {
            element.classList.add('flip');
            setTimeout(() => {
                element.textContent = formattedValue;
                element.classList.remove('flip');
            }, 300);
        }
    }

    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}

// ===== GUESTBOOK CANVAS =====
function initGuestbook() {
    const canvas = document.getElementById('guestbookCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    setupCanvasSize(canvas);
    
    // Setup controls
    setupColorPicker();
    setupPenWidth();
    setupCanvasDrawing(canvas, ctx);
    setupActionButtons(canvas, ctx);
    
    // Resize handler
    window.addEventListener('resize', () => setupCanvasSize(canvas));
}

function setupCanvasSize(canvas) {
    const container = canvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Responsive canvas size
    const maxWidth = Math.min(CONFIG.canvasWidth, rect.width - 40);
    const aspectRatio = CONFIG.canvasHeight / CONFIG.canvasWidth;
    
    canvas.width = maxWidth;
    canvas.height = maxWidth * aspectRatio;
    
    // Set white background
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw history if exists
    redrawCanvas(canvas, ctx);
}

function setupColorPicker() {
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentColor = btn.dataset.color;
        });
    });
}

function setupPenWidth() {
    const widthButtons = document.querySelectorAll('.width-btn');
    
    widthButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            widthButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentWidth = parseInt(btn.dataset.width);
        });
    });
}

function setupCanvasDrawing(canvas, ctx) {
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        state.isDrawing = true;
        const pos = getCanvasPosition(e, canvas);
        lastX = pos.x;
        lastY = pos.y;
        
        // Start new path
        state.currentPath = [{
            x: lastX,
            y: lastY,
            color: state.currentColor,
            width: state.currentWidth,
            type: 'start'
        }];
    }

    function draw(e) {
        if (!state.isDrawing) return;
        
        e.preventDefault();
        const pos = getCanvasPosition(e, canvas);
        
        ctx.beginPath();
        ctx.strokeStyle = state.currentColor;
        ctx.lineWidth = state.currentWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        // Add to current path
        state.currentPath.push({
            x: pos.x,
            y: pos.y,
            color: state.currentColor,
            width: state.currentWidth,
            type: 'line'
        });
        
        lastX = pos.x;
        lastY = pos.y;
    }

    function stopDrawing() {
        if (state.isDrawing && state.currentPath.length > 0) {
            // Save path to history
            state.drawingHistory.push([...state.currentPath]);
            state.currentPath = [];
        }
        state.isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e.touches[0]);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e.touches[0]);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
}

function getCanvasPosition(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function redrawCanvas(canvas, ctx) {
    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Redraw all paths
    state.drawingHistory.forEach(path => {
        path.forEach((point, index) => {
            if (point.type === 'start') {
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
            } else if (point.type === 'line' && index > 0) {
                ctx.strokeStyle = point.color;
                ctx.lineWidth = point.width;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }
        });
    });
}

function setupActionButtons(canvas, ctx) {
    const undoBtn = document.getElementById('undoBtn');
    const clearBtn = document.getElementById('clearBtn');
    const sendBtn = document.getElementById('sendBtn');

    // Undo functionality
    undoBtn.addEventListener('click', () => {
        if (state.drawingHistory.length > 0) {
            state.drawingHistory.pop();
            redrawCanvas(canvas, ctx);
        }
    });

    // Clear functionality
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your drawing?')) {
            state.drawingHistory = [];
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });

    // Send message functionality
    sendBtn.addEventListener('click', () => sendGuestbookMessage(canvas));
}

async function sendGuestbookMessage(canvas) {
    const nameInput = document.getElementById('guestName');
    const messageDiv = document.getElementById('guestbookMessage');
    const sendBtn = document.getElementById('sendBtn');
    
    const guestName = nameInput.value.trim();
    
    // Validation
    if (!guestName) {
        showMessage(messageDiv, 'Please enter your name', 'error');
        return;
    }
    
    if (state.drawingHistory.length === 0) {
        showMessage(messageDiv, 'Please draw a message first', 'error');
        return;
    }
    
    // Disable button during send
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/png');
        
        // Prepare data
        const messageData = {
            guest_name: guestName,
            message_image: imageData,
            created_date: new Date().toISOString()
        };
        
        // Send to API
        const response = await fetch(`tables/${CONFIG.tableName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });
        
        if (response.ok) {
            showMessage(messageDiv, 'Thank you for your message! 💕', 'success');
            
            // Clear form
            nameInput.value = '';
            state.drawingHistory = [];
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        showMessage(messageDiv, 'Failed to send message. Please try again.', 'error');
    } finally {
        // Re-enable button
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
}

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `feedback-message show ${type}`;
    
    setTimeout(() => {
        element.classList.remove('show');
    }, 5000);
}

// ===== PHOTO UPLOAD =====
function initPhotoUpload() {
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create file input dynamically
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*,video/*';
            fileInput.multiple = true;
            fileInput.capture = 'environment'; // Opens camera on mobile
            
            fileInput.addEventListener('change', (event) => {
                const files = event.target.files;
                if (files.length > 0) {
                    handlePhotoUpload(files);
                }
            });
            
            fileInput.click();
        });
    }
}

function handlePhotoUpload(files) {
    // In a real implementation, you would upload to a service
    // For now, show a confirmation
    const fileCount = files.length;
    const fileWord = fileCount === 1 ? 'photo' : 'photos';
    
    alert(`Thank you! ${fileCount} ${fileWord} selected. In production, these would be uploaded to a shared album.`);
    
    // TODO: Implement actual upload to service
    // This could be Google Photos API, Cloudinary, AWS S3, etc.
    console.log('Files ready to upload:', files);
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Format date
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== ANALYTICS & TRACKING (Optional) =====
// Track page views and interactions
function trackEvent(eventName, eventData = {}) {
    console.log('Event:', eventName, eventData);
    // Integrate with analytics service if needed
}

// Track when sections come into view
function initSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('section_view', { section: entry.target.id });
            }
        });
    }, {
        threshold: 0.5
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize section tracking
initSectionTracking();

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c💍 Zeyad & Rawan - November 7, 2025 💍', 
    'font-size: 20px; font-weight: bold; color: #B08D57; text-align: center;');
console.log('%cThank you for visiting our invitation!', 
    'font-size: 14px; color: #4E4842;');
