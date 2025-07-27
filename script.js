// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeTechShowcase();
    initializeCounters();
    initializeContactForm();
    initializeTypingAnimation();
    initializeTechIcons();
    initializeAdvancedAnimations();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Navbar scroll effect
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrolled > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Parallax effect for floating icons
        const floatingIcons = document.querySelectorAll('.tech-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            icon.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Back to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    document.querySelectorAll('.about-card').forEach(el => el.classList.add('fade-in'));
    document.querySelectorAll('.skill-category').forEach((el, index) => {
        el.classList.add('scale-in');
        el.style.animationDelay = `${index * 0.2}s`;
    });
    document.querySelectorAll('.timeline-item').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
    });
    document.querySelectorAll('.project-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

// Skill Bar Animations
function initializeSkillBars() {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-category').forEach(category => {
        skillObserver.observe(category);
    });
}

// Tech Showcase Animations
function initializeTechShowcase() {
    const techShowcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const techItems = entry.target.querySelectorAll('.tech-item');
                const techProgress = entry.target.querySelectorAll('.tech-progress');
                
                // Animate tech items
                techItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(0)';
                        item.style.opacity = '1';
                    }, index * 150);
                });
                
                // Animate progress bars
                techProgress.forEach((progress, index) => {
                    const level = progress.getAttribute('data-level');
                    setTimeout(() => {
                        progress.style.setProperty('--progress-width', level + '%');
                        progress.querySelector('::after') && (progress.querySelector('::after').style.width = level + '%');
                        // Use a different approach for pseudo-elements
                        progress.style.background = `linear-gradient(90deg, 
                            var(--accent-color) 0%, 
                            var(--secondary-color) ${level}%, 
                            rgba(255, 255, 255, 0.2) ${level}%)`;
                    }, index * 200 + 500);
                });
            }
        });
    }, { threshold: 0.3 });

    // Initially hide tech items for animation
    document.querySelectorAll('.tech-item').forEach(item => {
        item.style.transform = 'translateX(-50px)';
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease-out';
    });

    document.querySelectorAll('.tech-category-showcase').forEach(category => {
        techShowcaseObserver.observe(category);
    });

    // Add click handlers for tech items
    document.querySelectorAll('.tech-item').forEach(item => {
        item.addEventListener('click', function() {
            const techName = this.getAttribute('data-tech');
            showTechInfo(techName);
            
            // Add a visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Advanced Animations
function initializeAdvancedAnimations() {
    // Parallax scrolling for tech showcase
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const techShowcase = document.querySelector('.tech-showcase');
        
        if (techShowcase) {
            const rate = scrolled * -0.5;
            techShowcase.style.backgroundPosition = `center ${rate}px`;
        }
        
        // Advanced floating animations
        const floatingIcons = document.querySelectorAll('.tech-icon');
        floatingIcons.forEach((icon, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.1 + (index * 30);
            icon.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
        });
    });
    
    // Add mouseenter/mouseleave effects for tech categories
    document.querySelectorAll('.tech-category-showcase').forEach(category => {
        category.addEventListener('mouseenter', function() {
            const techItems = this.querySelectorAll('.tech-item');
            techItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(10px) scale(1.02)';
                }, index * 50);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const techItems = this.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.style.transform = '';
            });
        });
    });
    
    // Create floating particles for tech showcase
    createTechParticles();
}

// Enhanced Tech Particles
function createTechParticles() {
    const techShowcase = document.querySelector('.tech-showcase');
    if (!techShowcase) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'tech-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    techShowcase.appendChild(particleContainer);
    
    // Create different types of particles
    const symbols = ['⚡', '🚀', '⚙️', '🔧', '💻', '☁️', '🐳', '🔥'];
    
    for (let i = 0; i < 20; i++) {
        createAdvancedParticle(particleContainer, symbols);
    }
}

function createAdvancedParticle(container, symbols) {
    const particle = document.createElement('div');
    particle.className = 'tech-particle';
    
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const size = Math.random() * 20 + 10;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.textContent = symbol;
    particle.style.cssText = `
        position: absolute;
        font-size: ${size}px;
        left: ${startX}px;
        opacity: 0.3;
        animation: float-tech-particle ${duration}s linear ${delay}s infinite;
        pointer-events: none;
        color: rgba(245, 158, 11, 0.6);
    `;
    
    container.appendChild(particle);
}
function initializeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats-grid').forEach(grid => {
        counterObserver.observe(grid);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 40);
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Typing Animation
function initializeTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;

    const texts = [
        'Hi, I\'m Sivakumar Adabala',
        'Azure DevOps Engineer',
        'Cloud Infrastructure Expert',
        'CI/CD Automation Specialist',
        'Terraform & Kubernetes Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting new text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Tech Icons Interaction
function initializeTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const techName = this.getAttribute('data-tech');
            showTechTooltip(this, techName);
        });
        
        icon.addEventListener('mouseleave', function() {
            hideTechTooltip();
        });
        
        icon.addEventListener('click', function() {
            const techName = this.getAttribute('data-tech');
            showTechInfo(techName);
        });
    });
}

function showTechTooltip(element, techName) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tech-tooltip';
    tooltip.textContent = techName;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => tooltip.style.opacity = '1', 10);
}

function hideTechTooltip() {
    const tooltip = document.querySelector('.tech-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function showTechInfo(techName) {
    const techInfo = {
        'Docker': 'Containerization platform for packaging applications with dependencies',
        'Kubernetes': 'Container orchestration platform for automating deployment, scaling, and management',
        'AWS': 'Amazon Web Services - Cloud computing platform with comprehensive services',
        'Azure': 'Microsoft Azure - Primary cloud platform with 6+ years expertise',
        'Azure DevOps': 'Microsoft DevOps platform for CI/CD, project management, and collaboration',
        'Jenkins': 'Open-source automation server for continuous integration and deployment',
        'GitLab': 'Complete DevOps platform for source code management and CI/CD pipelines',
        'Terraform': 'Infrastructure as Code tool for building, changing, and versioning infrastructure',
        'Grafana': 'Open-source analytics and monitoring platform with beautiful dashboards',
        'Git': 'Distributed version control system for tracking changes in source code',
        'Python': 'High-level programming language perfect for automation and scripting',
        'Linux': 'Open-source operating system kernel, foundation of many server environments',
        'Ansible': 'Automation tool for configuration management, application deployment, and orchestration',
        'Prometheus': 'Open-source monitoring and alerting toolkit for reliability and observability',
        'Elasticsearch': 'Distributed search and analytics engine for all types of data',
        'Node.js': 'JavaScript runtime for building scalable server-side applications',
        'PowerShell': 'Task automation and configuration management framework from Microsoft',
        'LinkerD': 'Service mesh for Kubernetes providing observability, reliability, and security',
        'Velero': 'Open source tool for backing up and restoring Kubernetes cluster resources',
        'Pluto': 'Tool for detecting deprecated Kubernetes apiVersions in Helm charts and manifests',
        'SQL': 'Structured Query Language for managing and manipulating relational databases',
        'MongoDB': 'NoSQL document database for modern applications',
        'Power BI': 'Business analytics tool for creating interactive visualizations and reports'
    };
    
    const info = techInfo[techName] || 'DevOps technology for modern infrastructure';
    showNotification(`🚀 ${techName}: ${info}`, 'info');
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Particle Animation for Hero Section
function createParticles() {
    const heroSection = document.querySelector('.hero');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    heroSection.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        left: ${startX}px;
        animation: float-particle ${duration}s linear ${delay}s infinite;
    `;
    
    container.appendChild(particle);
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            top: 100vh;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            top: -10px;
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Initialize particles when page loads
window.addEventListener('load', () => {
    createParticles();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate positions for responsive design
    const floatingIcons = document.querySelectorAll('.tech-icon');
    floatingIcons.forEach((icon, index) => {
        // Reset positions for mobile
        if (window.innerWidth <= 768) {
            icon.style.display = 'none';
        } else {
            icon.style.display = 'block';
        }
    });
});

// Preloader (optional)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <span class="logo-text">DevOps</span>
                <span class="logo-accent">Pro</span>
            </div>
            <div class="preloader-spinner">
                <div class="spinner-circle"></div>
            </div>
            <p>Loading amazing content...</p>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        text-align: center;
    `;
    
    document.body.appendChild(preloader);
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
// showPreloader();

// Performance optimization
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Handle scroll-dependent animations here if needed
}, 10));

// Image lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
// initializeLazyLoading();

// Console welcome message
console.log(`
🚀 Welcome to the DevOps Portfolio!
   Built with modern web technologies
   
   Features:
   • Responsive design
   • Smooth animations
   • Interactive elements
   • Performance optimized
   
   Contact me for amazing DevOps projects!
`);

// Add some easter eggs for developers
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (!window.konamiIndex) window.konamiIndex = 0;
    
    if (e.keyCode === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
            // Add some fun animation
            document.body.style.animation = 'rainbow 2s linear infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            window.konamiIndex = 0;
        }
    } else {
        window.konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
