// Lightweight Fireworks Animation for Diwali
// Compatible with Chrome, Firefox, Edge, Safari, and IE11+

class DiwaliFireworks {
    constructor(container, customConfig = {}) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.fireworks = [];
        this.particles = [];
        this.animationId = null;
        this.isRunning = false;
        
        // Default Configuration
        const defaultConfig = {
            fireworkCount: 3,
            particleCount: 50,
            gravity: 0.1,
            friction: 0.99,
            speed: 2,
            autoCreate: true,
            clickToCreate: true,
            colors: [
                '#f26521', // Primary Orange
                '#ff8c42', // Secondary Orange
                '#FFD700', // Gold
                '#FF6B35', // Orange Red
                '#ffe4d6', // Light Orange
                '#F39D52', // Original Orange
                '#FFD07A', // Golden
                '#FFF1DA'  // Cream
            ]
        };
        
        // Merge custom config with default config
        this.config = { ...defaultConfig, ...customConfig };
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.bindEvents();
        this.start();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        // Start fireworks on click (if enabled)
        if (this.config.clickToCreate) {
            this.container.addEventListener('click', (e) => {
                this.createFirework(e.clientX - this.container.getBoundingClientRect().left, e.clientY - this.container.getBoundingClientRect().top);
            });
        }
    }
    
    createFirework(x, y) {
        // For split-screen layout, adjust target positions to avoid content areas
        let targetX, targetY;
        
        if (x && y) {
            // User clicked - use click position
            targetX = x;
            targetY = y;
        } else {
            // Auto-generated - avoid center content area for split-screen
            if (this.container.classList.contains('hero-split-screen')) {
                // For split-screen, create fireworks in the image areas
                const isLeftSide = Math.random() < 0.5;
                targetX = isLeftSide ? 
                    Math.random() * this.canvas.width * 0.3 : 
                    Math.random() * this.canvas.width * 0.3 + this.canvas.width * 0.7;
                targetY = Math.random() * this.canvas.height * 0.4 + this.canvas.height * 0.1;
            } else {
                // Default behavior for other layouts
                targetX = Math.random() * this.canvas.width;
                targetY = Math.random() * this.canvas.height * 0.5;
            }
        }
        
        const firework = {
            x: x || Math.random() * this.canvas.width,
            y: this.canvas.height,
            targetX: targetX,
            targetY: targetY,
            speed: this.config.speed,
            color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
            trail: [],
            exploded: false
        };
        
        this.fireworks.push(firework);
    }
    
    explode(firework) {
        const particleCount = this.config.particleCount;
        const angleStep = (Math.PI * 2) / particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = i * angleStep;
            const velocity = Math.random() * 8 + 2;
            
            const particle = {
                x: firework.x,
                y: firework.y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: firework.color,
                life: 1,
                decay: Math.random() * 0.02 + 0.01,
                size: Math.random() * 3 + 1
            };
            
            this.particles.push(particle);
        }
    }
    
    updateFireworks() {
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            
            if (!firework.exploded) {
                // Move firework towards target
                const dx = firework.targetX - firework.x;
                const dy = firework.targetY - firework.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 5) {
                    // Explode when reaching target
                    this.explode(firework);
                    this.fireworks.splice(i, 1);
                } else {
                    // Move towards target
                    firework.x += (dx / distance) * firework.speed;
                    firework.y += (dy / distance) * firework.speed;
                    
                    // Add to trail
                    firework.trail.push({ x: firework.x, y: firework.y });
                    if (firework.trail.length > 10) {
                        firework.trail.shift();
                    }
                }
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity and friction
            particle.vy += this.config.gravity;
            particle.vx *= this.config.friction;
            particle.vy *= this.config.friction;
            
            // Update life
            particle.life -= particle.decay;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw fireworks
        this.fireworks.forEach(firework => {
            // Draw trail
            this.ctx.strokeStyle = firework.color;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            for (let i = 0; i < firework.trail.length - 1; i++) {
                this.ctx.moveTo(firework.trail[i].x, firework.trail[i].y);
                this.ctx.lineTo(firework.trail[i + 1].x, firework.trail[i + 1].y);
            }
            this.ctx.stroke();
            
            // Draw firework
            this.ctx.fillStyle = firework.color;
            this.ctx.beginPath();
            this.ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.updateFireworks();
        this.updateParticles();
        this.draw();
        
        // Auto-create fireworks (if enabled)
        if (this.config.autoCreate && Math.random() < 0.02 && this.fireworks.length < this.config.fireworkCount) {
            this.createFirework();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }
    
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
        }
    }
    
    destroy() {
        this.stop();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize fireworks when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize fireworks for hero sections
    const heroSections = document.querySelectorAll('.hero');
    
    heroSections.forEach(hero => {
        if (hero.querySelector('.hero-decoration')) {
            // Special configuration for hero-split-screen
            if (hero.classList.contains('hero-split-screen')) {
                const fireworks = new DiwaliFireworks(hero, {
                    fireworkCount: 2, // Reduced for split-screen layout
                    particleCount: 40, // Slightly reduced
                    autoCreate: true, // Enable auto-creation
                    clickToCreate: true, // Enable click to create
                    colors: [
                        '#f26521', // Primary Orange
                        '#ff8c42', // Secondary Orange
                        '#FFD700', // Gold
                        '#FF6B35', // Orange Red
                        '#ffe4d6', // Light Orange
                        '#F39D52', // Original Orange
                        '#FFD07A', // Golden
                        '#FFF1DA'  // Cream
                    ]
                });
                hero._fireworks = fireworks;
            } else {
                const fireworks = new DiwaliFireworks(hero);
                hero._fireworks = fireworks;
            }
        }
    });
    
    // Initialize fireworks for PDP hero section
    const pdpHero = document.querySelector('.pdp-header');
    if (pdpHero && pdpHero.querySelector('.hero-decoration')) {
        const pdpFireworks = new DiwaliFireworks(pdpHero);
        pdpHero._fireworks = pdpFireworks;
    }
    
    // Add fireworks to theme showcase
    const themeShowcase = document.querySelector('.theme-showcase');
    if (themeShowcase) {
        const showcaseFireworks = new DiwaliFireworks(themeShowcase);
        themeShowcase._fireworks = showcaseFireworks;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiwaliFireworks;
}

