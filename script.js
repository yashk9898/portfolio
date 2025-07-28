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
    initRedirects();
});

// Enhanced Smooth Scrolling with better error handling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    const smoothScrollTo = (targetId) => {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbarHeight = 80; // Height of fixed navbar
            const offsetTop = targetSection.offsetTop - navbarHeight;
            
            // Check if device is mobile/touch
            const isMobile = 'ontouchstart' in window || window.innerWidth <= 768;
            
            if (isMobile) {
                // Use native smooth scroll for mobile devices
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            } else {
                // Use requestAnimationFrame for desktop
                const startPosition = window.pageYOffset;
                const distance = offsetTop - startPosition;
                const duration = 1000; // 1 second
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                requestAnimationFrame(animation);
            }
        }
    };
    
    // Easing function for smooth animation
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScrollTo(targetId);
                
                // Add active state to clicked link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
    
    // Scroll indicator click
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo('#education');
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = ['#hero', '#education', '#skills', '#projects', '#contact'];
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(sectionId => {
            const section = document.querySelector(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
    
    // Add scroll indicator to show current section
    const sectionIndicator = document.createElement('div');
    sectionIndicator.className = 'section-indicator';
    sectionIndicator.innerHTML = `
        <div class="indicator-dot"></div>
        <div class="indicator-label"></div>
    `;
    document.body.appendChild(sectionIndicator);
    
    // Update scroll indicator
    window.addEventListener('scroll', function() {
        const sections = ['#hero', '#education', '#skills', '#projects', '#contact'];
        const sectionNames = ['Home', 'Education', 'Skills', 'Projects', 'Contact'];
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach((sectionId, index) => {
            const section = document.querySelector(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const indicator = document.querySelector('.section-indicator');
                    if (indicator) {
                        indicator.querySelector('.indicator-label').textContent = sectionNames[index];
                        indicator.style.opacity = '1';
                    }
                }
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

// Enhanced Mobile Gesture Support
function initMobileGestures() {
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndY = 0;
    let touchEndX = 0;
    let isScrolling = false;

    // Prevent default touch behaviors that might interfere
    document.addEventListener('touchmove', function(e) {
        // Allow normal scrolling but prevent horizontal scroll
        if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - touchStartY)) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
        isScrolling = false;
    });

    document.addEventListener('touchmove', function(e) {
        isScrolling = true;
    });

    document.addEventListener('touchend', function(e) {
        if (!isScrolling) {
            touchEndY = e.changedTouches[0].screenY;
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffY) > swipeThreshold || Math.abs(diffX) > swipeThreshold) {
            if (Math.abs(diffY) > Math.abs(diffX)) {
                // Vertical swipe
                if (diffY > 0) {
                    // Swipe up - navigate to next section
                    navigateSections('down');
                } else {
                    // Swipe down - navigate to previous section
                    navigateSections('up');
                }
            }
        }
    }
    
    // Mobile-specific scroll optimizations
    if ('ontouchstart' in window) {
        // Disable hover effects on mobile
        const hoverElements = document.querySelectorAll('.project-card, .education-card, .skill-category, .contact-card');
        hoverElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'none';
            });
        });
        
        // Improve touch targets
        const touchTargets = document.querySelectorAll('.nav-link, .btn, .project-link');
        touchTargets.forEach(target => {
            target.style.minHeight = '44px';
            target.style.padding = '12px 16px';
        });
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

// Redirect functionality
function initRedirects() {
    // Project links redirect with loading animation
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a placeholder link
            if (href === '#') {
                e.preventDefault();
                showNotification('Live demo coming soon!', 'info');
                return;
            }
            
            // External links - show loading and redirect
            if (href.startsWith('http')) {
                e.preventDefault();
                showLoadingOverlay();
                
                // Simulate loading time for better UX
                setTimeout(() => {
                    window.open(href, '_blank');
                    hideLoadingOverlay();
                }, 800);
            }
        });
    });
    
    // GitHub links redirect
    const githubLinks = document.querySelectorAll('a[href*="github.com"]');
    githubLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showLoadingOverlay();
            
            setTimeout(() => {
                window.open(this.href, '_blank');
                hideLoadingOverlay();
            }, 600);
        });
    });
    
    // Hero buttons redirect
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="http"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLoadingOverlay();
            
            setTimeout(() => {
                window.open(this.href, '_blank');
                hideLoadingOverlay();
            }, 800);
        });
    });
    
    // Contact buttons redirect
    const contactButtons = document.querySelectorAll('.contact-card a[href^="http"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showLoadingOverlay();
            
            setTimeout(() => {
                window.open(this.href, '_blank');
                hideLoadingOverlay();
            }, 600);
        });
    });
    
    // Email links redirect
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Opening email client...', 'info');
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 500);
        });
    });
}

// Loading overlay functions
function showLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Redirecting...</p>
        </div>
    `;
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Add loading spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-content {
            text-align: center;
            color: white;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'info' ? '#667eea' : type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced section navigation with projects
function navigateSections(direction) {
    const sections = ['#hero', '#education', '#skills', '#projects', '#contact'];
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

// Update getCurrentSection to include projects
function getCurrentSection() {
    const sections = ['#hero', '#education', '#skills', '#projects', '#contact'];
    const scrollPosition = window.pageYOffset + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.querySelector(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
            return sections[i];
        }
    }
    return '#hero';
}

// Add keyboard shortcut for projects
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Escape':
                console.log('Escape pressed');
                break;
            case 'ArrowUp':
                e.preventDefault();
                navigateSections('up');
                break;
            case 'ArrowDown':
                e.preventDefault();
                navigateSections('down');
                break;
            case 'h':
            case 'H':
                e.preventDefault();
                smoothScrollTo('#hero');
                break;
            case 'e':
            case 'E':
                e.preventDefault();
                smoothScrollTo('#education');
                break;
            case 's':
            case 'S':
                e.preventDefault();
                smoothScrollTo('#skills');
                break;
            case 'p':
            case 'P':
                e.preventDefault();
                smoothScrollTo('#projects');
                break;
            case 'c':
            case 'C':
                e.preventDefault();
                smoothScrollTo('#contact');
                break;
        }
    });
} 