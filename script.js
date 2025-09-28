// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const mobileMenuButton = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('nav-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // Image Slider Functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        function showSlide(index) {
            // Hide all slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Initialize first slide
        showSlide(0);
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            if (validateForm()) {
                submitForm();
            }
        });
    }
    
    // Form Validation
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name').value.trim();
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Role validation
        const role = document.getElementById('role').value;
        if (!role) {
            showError('role', 'Please select your role');
            isValid = false;
        }
        
        // Subject validation
        const subject = document.getElementById('subject').value.trim();
        if (!subject) {
            showError('subject', 'Subject is required');
            isValid = false;
        }
        
        // Message validation
        const message = document.getElementById('message').value.trim();
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldName, message) {
        const errorElement = document.getElementById(fieldName + '-error');
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = message;
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm() {
        const submitButton = document.querySelector('.submit-button');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');
        const formMessages = document.getElementById('form-messages');
        
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            if (formMessages) {
                formMessages.className = 'form-messages success';
                formMessages.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
            }
            
            // Reset button
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                if (formMessages) {
                    formMessages.className = 'form-messages hidden';
                }
            }, 5000);
            
        }, 2000);
    }
    
    // Real-time validation (clear errors when user starts typing)
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            const fieldName = this.name;
            const errorElement = document.getElementById(fieldName + '-error');
            
            if (errorElement && errorElement.textContent) {
                errorElement.textContent = '';
                this.classList.remove('error');
            }
        });
    });

    // Smooth scrolling for anchor links
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

    // Add keyboard navigation support for slider
    document.addEventListener('keydown', function(e) {
        if (slides.length > 0) {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
        }
    });
});

// Accessibility: Announce slide changes to screen readers
function announceSlideChange(slideNumber, totalSlides) {
    const announcement = `Slide ${slideNumber + 1} of ${totalSlides}`;
    
    // Create or update announcement element
    let announcer = document.getElementById('slide-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'slide-announcer';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.style.position = 'absolute';
        announcer.style.left = '-10000px';
        announcer.style.width = '1px';
        announcer.style.height = '1px';
        announcer.style.overflow = 'hidden';
        document.body.appendChild(announcer);
    }
    
    announcer.textContent = announcement;
}