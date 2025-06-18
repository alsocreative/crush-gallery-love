// Gallery data with Unsplash images
const galleryData = [
    {
        id: 'modal1',
        image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&h=600&fit=crop&crop=face',
        title: 'Our First Meeting',
        description: 'The moment I saw you, my heart skipped a beat. Your smile lit up the entire room.',
        modalText: 'I remember every detail of that day. The way you laughed, the way you spoke, the way you made me feel like I was the only person in the room. It was the beginning of something beautiful.',
        heart: '💕'
    },
    {
        id: 'modal2',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face',
        title: 'Your Beautiful Smile',
        description: 'Every time you smile, you make my world brighter. It\'s like sunshine on a cloudy day.',
        modalText: 'Your smile is like magic - it has the power to turn my worst days into the best ones. I could watch you smile for hours and never get tired of it.',
        heart: '🌟'
    },
    {
        id: 'modal3',
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop&crop=face',
        title: 'Perfect Moments',
        description: 'These are the moments I wish I could freeze in time and keep forever.',
        modalText: 'Every moment with you feels perfect. Whether we\'re talking, laughing, or just being together in comfortable silence, you make everything feel right.',
        heart: '🌹'
    },
    {
        id: 'modal4',
        image: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=800&h=600&fit=crop&crop=face',
        title: 'Dreaming of You',
        description: 'In every dream, in every thought, it\'s always you that makes my heart flutter.',
        modalText: 'You\'re in my thoughts from the moment I wake up until I fall asleep. You\'ve become such an important part of my life that I can\'t imagine it without you.',
        heart: '✨'
    },
    {
        id: 'modal5',
        image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=800&h=600&fit=crop&crop=face',
        title: 'Your Graceful Beauty',
        description: 'You move with such grace and elegance, like a beautiful dance that mesmerizes me.',
        modalText: 'You have this natural elegance that takes my breath away. Everything about you is beautiful - your kindness, your intelligence, your amazing personality.',
        heart: '🎀'
    },
    {
        id: 'modal6',
        image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&crop=face',
        title: 'Future Dreams',
        description: 'I dream of all the beautiful moments we could share together in the future.',
        modalText: 'I dream of sharing countless adventures with you, creating beautiful memories together, and maybe, just maybe, building something special between us.',
        heart: '🌸'
    }
];

// Initialize the gallery
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeEffects();
    initializeEventListeners();
});

// Create gallery cards dynamically
function initializeGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    const modalsContainer = document.body;
    
    galleryData.forEach((item, index) => {
        // Create gallery card
        const card = createGalleryCard(item, index);
        galleryGrid.appendChild(card);
        
        // Create modal
        const modal = createModal(item);
        modalsContainer.appendChild(modal);
    });
}

// Create individual gallery card
function createGalleryCard(item, index) {
    const card = document.createElement('div');
    card.className = 'photo-card loading';
    card.style.animationDelay = `${index * 0.1}s`;
    card.onclick = () => openModal(item.id);
    
    card.innerHTML = `
        <div class="image-container">
            <img src="${item.image}" alt="${item.title}" class="photo-image" loading="lazy">
            <div class="image-overlay"></div>
            <div class="heart-icon">${item.heart}</div>
        </div>
        <div class="card-content">
            <h3 class="photo-title">${item.title}</h3>
            <p class="photo-description">${item.description}</p>
        </div>
    `;
    
    return card;
}

// Create modal
function createModal(item) {
    const modal = document.createElement('div');
    modal.id = item.id;
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('${item.id}')">&times;</span>
            <img src="${item.image}" alt="${item.title}" class="modal-image">
            <div class="modal-text-content">
                <h2>${item.title} ${item.heart}</h2>
                <p>${item.modalText}</p>
                <button class="love-button" onclick="closeModal('${item.id}')">Close with Love 💖</button>
            </div>
        </div>
    `;
    
    return modal;
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add opening animation
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.5s ease-out';
    
    // Create heart explosion effect
    createHeartExplosion();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    
    // Add closing animation
    modalContent.style.animation = 'modalSlideOut 0.3s ease-in';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function showLoveMessage() {
    openModal('loveModal');
}

// Initialize special effects
function initializeEffects() {
    // Create particles
    createParticles();
    
    // Create sparkles periodically
    setInterval(createSparkle, 2000);
    
    // Initialize typing effect
    setTimeout(() => {
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            typeWriter(subtitle, originalText, 50);
        }
    }, 1000);
}

// Initialize event listeners
function initializeEventListeners() {
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.id;
            closeModal(modalId);
        }
    };
    
    // FAB click handler
    document.querySelector('.fab').addEventListener('click', () => {
        showLoveMessage();
        createFloatingHearts();
    });
    
    // Image lazy loading error handler
    document.querySelectorAll('.photo-image').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop';
        });
    });
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            particlesContainer.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }, i * 100);
    }
    
    // Continuously create new particles
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = '0s';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 8000);
    }, 300);
}

// Create random sparkles
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 3000);
}

// Typing effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Create floating hearts
function createFloatingHearts() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingHeart(), i * 150);
    }
}

function createFloatingHeart() {
    const hearts = ['💖', '💕', '💗', '💓', '💝', '💘'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = '100%';
    heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 4s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 4000);
}

// Create heart explosion effect
function createHeartExplosion() {
    const hearts = ['💖', '💕', '💗', '💓'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = '2rem';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
            
            const angle = (i / 12) * 2 * Math.PI;
            const distance = 100 + Math.random() * 100;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            heart.style.animation = `explodeHeart 1.5s ease-out forwards`;
            heart.style.setProperty('--endX', endX + 'px');
            heart.style.setProperty('--endY', endY + 'px');
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 1500);
        }, i * 50);
    }
}

// Add CSS for heart explosion
const style = document.createElement('style');
style.textContent = `
    @keyframes explodeHeart {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(calc(-50% + var(--endX, 0px)), calc(-50% + var(--endY, 0px))) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translate(calc(-50% + var(--endX, 0px)), calc(-50% + var(--endY, 0px))) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes modalSlideOut {
        from { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
        to { 
            opacity: 0; 
            transform: translateY(-50px) scale(0.9); 
        }
    }
`;
document.head.appendChild(style);

// Create the love message modal
function createLoveModal() {
    const loveModal = document.createElement('div');
    loveModal.id = 'loveModal';
    loveModal.className = 'modal';
    
    loveModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal('loveModal')">&times;</span>
            <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=400&fit=crop" alt="Love Message" class="modal-image">
            <div class="modal-text-content">
                <h2>A Message from My Heart 💕</h2>
                <p>This gallery is just a small way to show how much you mean to me. Every photo represents a feeling, a memory, or a dream I have about you. You're incredible, and I hope you know how special you are to me.</p>
                <button class="love-button" onclick="closeModal('loveModal')">You're Amazing 💖</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(loveModal);
}

// Create love modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(createLoveModal, 500);
});

// Preload images for better performance
function preloadImages() {
    galleryData.forEach(item => {
        const img = new Image();
        img.src = item.image;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);
