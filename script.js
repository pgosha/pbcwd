// Enhanced Contact Form JavaScript with Phone and Email Formatting

// Phone number formatting function
function formatPhoneNumber(value) {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');

    // Format based on length
    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(phone) && digitsOnly.length === 10;
}

// Add visual feedback functions
function showFieldError(field, message) {
    removeFieldError(field);

    field.style.borderColor = '#dc3545';
    field.style.backgroundColor = '#fff5f5';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
}

function removeFieldError(field) {
    field.style.borderColor = '#e9ecef';
    field.style.backgroundColor = 'white';

    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFieldSuccess(field) {
    removeFieldError(field);
    field.style.borderColor = '#28a745';
    field.style.backgroundColor = '#f8fff9';
}

//  form initialization
document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');

    // Phone number formatting and validation
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            const formatted = formatPhoneNumber(e.target.value);
            e.target.value = formatted;

            // Real-time validation feedback
            if (formatted.length > 0) {
                if (isValidPhone(formatted)) {
                    showFieldSuccess(phoneInput);
                } else if (formatted.length >= 14) {
                    showFieldError(phoneInput, 'Please enter a valid 10-digit phone number');
                } else {
                    removeFieldError(phoneInput);
                }
            } else {
                removeFieldError(phoneInput);
            }
        });

        // Prevent non-numeric input (except formatting characters)
        phoneInput.addEventListener('keypress', function (e) {
            const char = String.fromCharCode(e.which);
            if (!/[\d\(\)\-\s]/.test(char) && e.which !== 8 && e.which !== 0) {
                e.preventDefault();
            }
        });

        // Add placeholder and improve UX
        phoneInput.placeholder = '(204) 555-0123';
        phoneInput.setAttribute('maxlength', '14');
    }

    // Email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function (e) {
            const email = e.target.value.trim();
            if (email.length > 0) {
                if (isValidEmail(email)) {
                    showFieldSuccess(emailInput);
                } else {
                    showFieldError(emailInput, 'Please enter a valid email address');
                }
            } else {
                removeFieldError(emailInput);
            }
        });

        emailInput.addEventListener('input', function (e) {
            // Remove error styling while typing
            if (emailInput.style.borderColor === 'rgb(220, 53, 69)') {
                removeFieldError(emailInput);
            }
        });

        emailInput.placeholder = 'example@email.com';
    }

    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', function (e) {
            const name = e.target.value.trim();
            if (name.length === 0) {
                showFieldError(nameInput, 'Name is required');
            } else if (name.length < 2) {
                showFieldError(nameInput, 'Name must be at least 2 characters long');
            } else {
                showFieldSuccess(nameInput);
            }
        });

        nameInput.placeholder = 'Your name';
    }

    // Message validation
    if (messageInput) {
        messageInput.addEventListener('blur', function (e) {
            const message = e.target.value.trim();
            if (message.length === 0) {
                showFieldError(messageInput, 'Message is required');
            } else if (message.length < 10) {
                showFieldError(messageInput, 'Please provide more details (at least 10 characters)');
            } else {
                showFieldSuccess(messageInput);
            }
        });

        // Character counter for message
        const charCounter = document.createElement('div');
        charCounter.style.fontSize = '0.875rem';
        charCounter.style.color = '#6c757d';
        charCounter.style.textAlign = 'right';
        charCounter.style.marginTop = '0.25rem';
        messageInput.parentNode.appendChild(charCounter);

        messageInput.addEventListener('input', function (e) {
            const length = e.target.value.length;
            charCounter.textContent = `${length} characters`;

            if (length > 500) {
                charCounter.style.color = '#dc3545';
            } else {
                charCounter.style.color = '#6c757d';
            }
        });

        messageInput.setAttribute('maxlength', '500');
    }
});

// Enhanced form submission with better validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    let isValid = true;

    // Validate name
    const name = nameInput.value.trim();
    if (name.length === 0) {
        showFieldError(nameInput, 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const email = emailInput.value.trim();
    if (email.length === 0) {
        showFieldError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone (optional but if provided, must be valid)
    const phone = phoneInput.value.trim();
    if (phone.length > 0 && !isValidPhone(phone)) {
        showFieldError(phoneInput, 'Please enter a valid 10-digit phone number or leave blank');
        isValid = false;
    }

    // Validate message
    const message = messageInput.value.trim();
    if (message.length === 0) {
        showFieldError(messageInput, 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError(messageInput, 'Please provide more details (at least 10 characters)');
        isValid = false;
    }

    // If validation fails, scroll to first error and stop
    if (!isValid) {
        const firstError = document.querySelector('.field-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Get the submit button to show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters with properly formatted data
    const templateParams = {
        from_name: name,
        from_email: email,
        phone: phone || 'Not provided',
        service: document.getElementById('service').value || 'Not specified',
        message: message,
        to_name: 'PBC Windows and Doors'
    };

    // Initialize EmailJS
    (function () {
        emailjs.init('QhNLtwqDrMSavQtF6');
    })();

    // Send email using EmailJS
    emailjs.send('service_6bc2igs', 'template_xvzjuma', templateParams)
        .then(function (response) {
            // Simple success popup
            alert('✅ Thank you! Your message has been sent successfully. We will get back to you soon.');

            // Reset form and remove all validation styling
            const form = document.getElementById('contactForm');
            form.reset();
            document.querySelectorAll('.field-error').forEach(error => error.remove());
            document.querySelectorAll('input, textarea').forEach(field => {
                field.style.borderColor = '#e9ecef';
                field.style.backgroundColor = 'white';
            });
        })
        .catch(function (error) {
            // Simple error popup
            alert('❌ Sorry, there was an error sending your message. Please try again or contact us directly.');
        })
        .finally(function () {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const navDots = document.querySelectorAll('.nav-dot');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Navigation dots click handlers
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Arrow click handlers
document.querySelector('.next-arrow').addEventListener('click', nextSlide);
document.querySelector('.prev-arrow').addEventListener('click', prevSlide);

// Pause auto-advance on hover
const heroSection = document.querySelector('.hero');
let autoAdvance;

function startAutoAdvance() {
    autoAdvance = setInterval(nextSlide, 5000);
}

function stopAutoAdvance() {
    clearInterval(autoAdvance);
}

heroSection.addEventListener('mouseenter', stopAutoAdvance);
heroSection.addEventListener('mouseleave', startAutoAdvance);

startAutoAdvance();


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

// Header background change on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// loading animation
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });
});