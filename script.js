// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add sparkle effect for dark mode
        if (newTheme === 'dark') {
            document.body.style.transform = 'scale(1.02)';
            setTimeout(() => {
                document.body.style.transform = 'scale(1)';
            }, 200);
            
            // Add temporary glow effect
            document.documentElement.style.boxShadow = '0 0 50px rgba(6, 182, 212, 0.3)';
            setTimeout(() => {
                document.documentElement.style.boxShadow = 'none';
            }, 500);
        }
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }
    
    // Static background - no rotation needed
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const topBar = document.querySelector('.top-bar');
    
    window.addEventListener('scroll', function() {
        // Enhance both bars on scroll
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            topBar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            topBar.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 120; // Account for both bars (53px + 15px padding + extra space)
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link Update
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Basic form validation
        if (validateForm(formObject)) {
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real implementation, you would send this data to a server
            console.log('Form submission:', formObject);
        }
    });
    
    function validateForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'service'];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[0-9][\d\s\-\(\)]{8,}$/;
        
        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`, 'error');
                return false;
            }
        }
        
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!phoneRegex.test(data.phone)) {
            showNotification('Please enter a valid phone number.', 'error');
            return false;
        }
        
        return true;
    }
    
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 120px;
                    right: 20px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    z-index: 10000;
                    padding: 15px 20px;
                    min-width: 300px;
                    max-width: 400px;
                    transform: translateX(450px);
                    transition: all 0.3s ease;
                }
                
                .notification.success {
                    border-left: 4px solid #10b981;
                }
                
                .notification.error {
                    border-left: 4px solid #ef4444;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .notification-message {
                    color: #374151;
                    line-height: 1.5;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification-close:hover {
                    color: #374151;
                }
                
                @media (max-width: 480px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        min-width: auto;
                        max-width: none;
                        transform: translateY(-100px);
                    }
                    
                    .notification.show {
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }
    
    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // Service Card Hover Effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add some extra animation or effects if needed
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Intersection Observer for Animations
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
    
    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .review-card, .about-text, .about-images').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.4s ease';
        observer.observe(el);
    });
    
    // Lazy Loading for Images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Contact Info Click Handlers
    document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[href^="https://wa.me/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior but add analytics tracking if needed
            console.log('Contact method used:', this.href);
        });
    });
    
    // Smooth reveal animation for hero content
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 500);
    
    // Initialize hero content styling
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'all 0.6s ease';
    }
    
    // No preloading needed for static background
    
});

// Utility Functions
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

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 120; // Account for both bars
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    smoothScrollPolyfill();
}

// Calculator Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calcPanels = document.querySelectorAll('.calc-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            calcPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Calculator Functions
function calculateLoan(principal, rate, years) {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    if (monthlyRate === 0) {
        // Handle 0% interest rate case
        const monthlyPayment = principal / numPayments;
        return {
            monthlyPayment: monthlyPayment,
            totalInterest: 0,
            totalAmount: principal
        };
    }
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalAmount = monthlyPayment * numPayments;
    const totalInterest = totalAmount - principal;
    
    return {
        monthlyPayment: monthlyPayment,
        totalInterest: totalInterest,
        totalAmount: totalAmount
    };
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(Math.round(amount));
}

function calculateHomeLoan() {
    const amount = parseFloat(document.getElementById('home-loan-amount').value);
    const term = parseFloat(document.getElementById('home-loan-term').value);
    const rate = parseFloat(document.getElementById('home-interest-rate').value);
    
    if (!amount || !term || !rate || amount <= 0 || term <= 0 || rate < 0) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    const result = calculateLoan(amount, rate, term);
    
    document.getElementById('home-monthly-payment').textContent = formatCurrency(result.monthlyPayment);
    document.getElementById('home-total-interest').textContent = formatCurrency(result.totalInterest);
    document.getElementById('home-total-amount').textContent = formatCurrency(result.totalAmount);
}

function calculatePersonalLoan() {
    const amount = parseFloat(document.getElementById('personal-loan-amount').value);
    const term = parseFloat(document.getElementById('personal-loan-term').value);
    const rate = parseFloat(document.getElementById('personal-interest-rate').value);
    
    if (!amount || !term || !rate || amount <= 0 || term <= 0 || rate < 0) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    const result = calculateLoan(amount, rate, term);
    
    document.getElementById('personal-monthly-payment').textContent = formatCurrency(result.monthlyPayment);
    document.getElementById('personal-total-interest').textContent = formatCurrency(result.totalInterest);
    document.getElementById('personal-total-amount').textContent = formatCurrency(result.totalAmount);
}

function calculateCarLoan() {
    const amount = parseFloat(document.getElementById('car-loan-amount').value);
    const term = parseFloat(document.getElementById('car-loan-term').value);
    const rate = parseFloat(document.getElementById('car-interest-rate').value);
    
    if (!amount || !term || !rate || amount <= 0 || term <= 0 || rate < 0) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    const result = calculateLoan(amount, rate, term);
    
    document.getElementById('car-monthly-payment').textContent = formatCurrency(result.monthlyPayment);
    document.getElementById('car-total-interest').textContent = formatCurrency(result.totalInterest);
    document.getElementById('car-total-amount').textContent = formatCurrency(result.totalAmount);
}

function calculateRefinance() {
    const balance = parseFloat(document.getElementById('refinance-balance').value);
    const term = parseFloat(document.getElementById('refinance-term').value);
    const newRate = parseFloat(document.getElementById('refinance-new-rate').value);
    
    if (!balance || !term || !newRate || balance <= 0 || term <= 0 || newRate < 0) {
        alert('Please fill in all fields with valid values');
        return;
    }
    
    const result = calculateLoan(balance, newRate, term);
    
    // Calculate potential savings (assuming current rate is 1.5% higher)
    const currentRate = newRate + 1.5;
    const currentResult = calculateLoan(balance, currentRate, term);
    const savings = currentResult.totalAmount - result.totalAmount;
    
    document.getElementById('refinance-monthly-payment').textContent = formatCurrency(result.monthlyPayment);
    document.getElementById('refinance-total-interest').textContent = formatCurrency(result.totalInterest);
    document.getElementById('refinance-savings').textContent = formatCurrency(Math.max(0, savings));
}