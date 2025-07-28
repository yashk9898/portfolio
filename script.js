// Enhanced Dynamic Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all dynamic features
    initSmoothScrolling();
    initScrollAnimations();
    // Removed initTypingEffects();
    initParticleSystem();
    initInteractiveElements();
    initParallaxEffects();
    initScrollProgress();
    initDynamicBackground();
    initSkillAnimations();
    initContactInteractions();
    initMobileGestures();
    initKeyboardShortcuts();
});

// Smooth Scrolling with enhanced easing
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    const smoothScrollTo = (targetId) => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
}

// Advanced Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.education-card, .skill-category, .contact-card, .work-together-card, .learning-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Removed initTypingEffects function

// Enhanced Particle System
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleColors = ['#667eea', '#764ba2', '#f093fb', '#f5576c'];
    
    function createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.7';
        particle.style.zIndex = '1';
        
        const heroRect = hero.getBoundingClientRect();
        particle.style.left = Math.random() * heroRect.width + 'px';
        particle.style.top = heroRect.height + 'px';
        
        hero.appendChild(particle);
        
        const duration = 3000 + Math.random() * 3000;
        const animation = particle.animate([
            { 
                transform: 'translateY(0px) rotate(0deg)', 
                opacity: 0.7 
            },
            { 
                transform: `translateY(-${heroRect.height}px) rotate(360deg)`, 
                opacity: 0 
            }
        ], {
            duration: duration,
            easing: 'linear'
        });
        
        animation.onfinish = () => particle.remove();
    }
    
    // Create particles at different intervals
    setInterval(createParticle, 1500);
    setInterval(() => createParticle(), 2500);
}

// Interactive Elements with Hover Effects
function initInteractiveElements() {
    // Skill tags with enhanced hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            this.style.transition = 'all 0.3s ease';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Education cards with 3D hover effect
    const educationCards = document.querySelectorAll('.education-card');
    
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
    });
    
    // Contact cards with ripple effect
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(102, 126, 234, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.clientX - this.offsetLeft) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop) + 'px';
            ripple.style.width = ripple.style.height = '20px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Advanced Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-circle');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Removed hero content parallax
    });
}

// Dynamic Scroll Progress Bar
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
    progressBar.style.zIndex = '1001';
    progressBar.style.transition = 'width 0.3s ease';
    progressBar.style.boxShadow = '0 0 10px rgba(102, 126, 234, 0.5)';
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Dynamic Background Effects
function initDynamicBackground() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create floating geometric shapes
    const shapes = ['circle', 'square', 'triangle'];
    const colors = ['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)', 'rgba(240, 147, 251, 0.1)'];
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        shape.style.position = 'absolute';
        shape.style.width = Math.random() * 100 + 50 + 'px';
        shape.style.height = shape.style.width;
        shape.style.background = color;
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.opacity = '0.3';
        shape.style.pointerEvents = 'none';
        shape.style.zIndex = '0';
        
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
        } else if (shapeType === 'triangle') {
            shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        }
        
        shape.style.animation = `float ${6 + Math.random() * 4}s ease-in-out infinite`;
        shape.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(shape);
    }
}

// Skill Category Animations
function initSkillAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        category.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon');
            const tags = this.querySelectorAll('.skill-tag');
            
            // Animate icon
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'all 0.3s ease';
            
            // Animate tags with stagger
            tags.forEach((tag, tagIndex) => {
                setTimeout(() => {
                    tag.style.transform = 'scale(1.05) translateY(-2px)';
                    tag.style.transition = 'all 0.3s ease';
                }, tagIndex * 50);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon');
            const tags = this.querySelectorAll('.skill-tag');
            
            icon.style.transform = 'scale(1) rotate(0deg)';
            
            tags.forEach(tag => {
                tag.style.transform = 'scale(1) translateY(0)';
            });
        });
    });
}

// Enhanced Contact Interactions
function initContactInteractions() {
    const contactItems = document.querySelectorAll('.contact-item span');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.textContent;
            
            // Create temporary input to copy text
            const tempInput = document.createElement('input');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            
            // Enhanced feedback animation
            const originalText = this.textContent;
            const originalColor = this.style.color;
            
            this.textContent = '✓ Copied!';
            this.style.color = '#4caf50';
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = originalColor;
                this.style.transform = 'scale(1)';
            }, 2000);
        });
        
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.3)';
        });
    });
}

// Mobile Gesture Support
function initMobileGestures() {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndY = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffY) > swipeThreshold || Math.abs(diffX) > swipeThreshold) {
            if (Math.abs(diffY) > Math.abs(diffX)) {
                // Vertical swipe
                if (diffY > 0) {
                    // Swipe up - could trigger next section
                    console.log('Swipe up detected');
                } else {
                    // Swipe down - could trigger previous section
                    console.log('Swipe down detected');
                }
            } else {
                // Horizontal swipe
                if (diffX > 0) {
                    // Swipe left
                    console.log('Swipe left detected');
                } else {
                    // Swipe right
                    console.log('Swipe right detected');
                }
            }
        }
    }
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Escape':
                // Close any open modals or menus
                console.log('Escape pressed');
                break;
            case 'ArrowUp':
                // Navigate to previous section
                e.preventDefault();
                navigateSections('up');
                break;
            case 'ArrowDown':
                // Navigate to next section
                e.preventDefault();
                navigateSections('down');
                break;
            case 'h':
            case 'H':
                // Go to hero section
                e.preventDefault();
                smoothScrollTo('#hero');
                break;
            case 'e':
            case 'E':
                // Go to education section
                e.preventDefault();
                smoothScrollTo('#education');
                break;
            case 's':
            case 'S':
                // Go to skills section
                e.preventDefault();
                smoothScrollTo('#skills');
                break;
            case 'c':
            case 'C':
                // Go to contact section
                e.preventDefault();
                smoothScrollTo('#contact');
                break;
        }
    });
}

// Helper function for section navigation
function navigateSections(direction) {
    const sections = ['#hero', '#education', '#skills', '#contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    let nextIndex;
    if (direction === 'up') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    } else {
        nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    }
    
    smoothScrollTo(sections[nextIndex]);
}

// Helper function to get current section
function getCurrentSection() {
    const sections = ['#hero', '#education', '#skills', '#contact'];
    const scrollPosition = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    return '#hero';
}

// Helper function for smooth scrolling
function smoothScrollTo(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navbar background effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initialize page with fade-in effect
document.body.style.opacity = '0'; 