// PDP Replica Script - No Slider Components

// Mobile Navigation Toggle (only if elements exist)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll (only if navbar exists)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .step, .contact-form, .feature-item, .pack-option, .video-feature');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Form submission handling (only if contact form exists)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]')?.value;
        const email = contactForm.querySelector('input[type="email"]')?.value;
        const message = contactForm.querySelector('textarea')?.value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Quantity selector functionality
document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    
    if (quantityInput && minusBtn && plusBtn) {
        minusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        quantityInput.addEventListener('change', () => {
            const value = parseInt(quantityInput.value);
            if (value < 1) quantityInput.value = 1;
            if (value > 10) quantityInput.value = 10;
        });
    }
});

// Add to cart functionality
document.querySelectorAll('.add-to-cart, .btn-primary').forEach(btn => {
    if (btn.textContent.includes('Add to Cart') || btn.classList.contains('add-to-cart')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const quantity = document.getElementById('quantity')?.value || '1';
            showNotification(`${quantity} Laddoo Kit(s) added to cart!`, 'success');
            
            // Add visual feedback
            btn.style.background = '#4CAF50';
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Added! <span class="btn-icon">✓</span>';
            setTimeout(() => {
                btn.style.background = '';
                btn.innerHTML = originalText;
            }, 2000);
        });
    }
});

// Buy now functionality
document.querySelectorAll('.buy-now').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const quantity = document.getElementById('quantity')?.value || '1';
        showNotification(`Redirecting to checkout for ${quantity} Laddoo Kit(s)...`, 'success');
        
        // Add visual feedback
        btn.style.background = '#f26521';
        btn.style.color = '#ffffff';
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Processing... <span class="btn-icon">⚡</span>';
        setTimeout(() => {
            btn.style.background = '';
            btn.style.color = '';
            btn.innerHTML = originalText;
        }, 2000);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.diya');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Laddoo click animation
document.querySelectorAll('.laddoo, .product-laddoo').forEach(laddoo => {
    laddoo.addEventListener('click', () => {
        laddoo.style.animation = 'none';
        laddoo.style.transform = 'scale(1.2)';
        setTimeout(() => {
            laddoo.style.animation = '';
            laddoo.style.transform = '';
        }, 300);
    });
});

// Add sparkle effect on click
document.addEventListener('click', (e) => {
    if (e.target.closest('.laddoo, .product-laddoo')) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        background: #FFD700;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleEffect 1s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Add sparkle animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleEffect {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating particles effect
function createFloatingParticles() {
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
    }
    
    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize floating particles
createFloatingParticles();

// Add hover effects for product cards
document.querySelectorAll('.product-card, .pack-option, .feature-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Hero title is displayed without animation
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.pdp-main-title');
    if (heroTitle) {
        // Ensure title is visible immediately without animation
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'none';
    }
});

// Video play button functionality
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', () => {
            showNotification('Video player would open here!', 'info');
            
            // Add visual feedback
            playButton.style.transform = 'scale(1.2)';
            playButton.style.background = '#4CAF50';
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
                playButton.style.background = '';
            }, 300);
        });
    }
});

// Bulk order button functionality
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Bulk Orders') || btn.textContent.includes('Contact')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Contact form would open here!', 'info');
            
            // Add visual feedback
            btn.style.background = '#f26521';
            btn.style.color = '#ffffff';
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Opening... <span class="btn-icon">📞</span>';
            setTimeout(() => {
                btn.style.background = '';
                btn.style.color = '';
                btn.innerHTML = originalText;
            }, 2000);
        });
    }
});

// Responsive image loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            console.warn('Image failed to load:', img.src);
        });
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('PDP Replica script loaded successfully - No slider components included');
