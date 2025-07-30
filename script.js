// Form validation
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Basic validation
    let isValid = true;

    if (nameInput.value.trim() === '') {
        isValid = false;
        highlightError(nameInput);
    } else {
        removeHighlight(nameInput);
    }

    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        isValid = false;
        highlightError(emailInput);
    } else {
        removeHighlight(emailInput);
    }

    if (subjectInput.value.trim() === '') {
        isValid = false;
        highlightError(subjectInput);
    } else {
        removeHighlight(subjectInput);
    }

    if (messageInput.value.trim() === '') {
        isValid = false;
        highlightError(messageInput);
    } else {
        removeHighlight(messageInput);
    }

    if (isValid) {
        // In a real scenario, you would send the form data to a server
        // For demonstration purposes, we'll just show a success message
        showSuccessMessage();
        contactForm.reset();
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function highlightError(input) {
    input.style.borderColor = 'var(--secondary-accent)';
    input.style.backgroundColor = 'rgba(255, 107, 107, 0.1)';
}

function removeHighlight(input) {
    input.style.borderColor = 'rgba(0,0,0,0.1)';
    input.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.backgroundColor = 'rgba(46, 213, 115, 0.1)';
    successMessage.style.color = '#2ed573';
    successMessage.style.padding = '1rem';
    successMessage.style.borderRadius = 'var(--border-radius)';
    successMessage.style.marginTop = '1rem';
    successMessage.style.textAlign = 'center';
    successMessage.innerText = 'Your message has been sent successfully!';

    contactForm.appendChild(successMessage);

    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Scroll reveal animation
const revealElements = document.querySelectorAll('.section, .project-card, .skill-category, .testimonial-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        } else {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
        }
    });
};

// Set initial state for reveal elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'all 0.6s ease';
});

// Mobile menu toggle
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.style.fontSize = '1.5rem';
        menuToggle.style.cursor = 'pointer';

        const header = document.querySelector('header');
        const navLinks = document.querySelector('.nav-links');

        // Style the mobile menu
        navLinks.style.position = 'fixed';
        navLinks.style.top = '0';
        navLinks.style.right = '-100%';
        navLinks.style.width = '70%';
        navLinks.style.height = '100vh';
        navLinks.style.backgroundColor = 'var(--bg-color)';
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.justifyContent = 'center';
        navLinks.style.alignItems = 'center';
        navLinks.style.transition = 'right 0.3s ease';
        navLinks.style.zIndex = '999';
        navLinks.style.boxShadow = '-5px 0 15px rgba(0,0,0,0.1)';

        // Insert menu toggle before theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        header.insertBefore(menuToggle, themeToggle);

        // Toggle menu on click
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.right === '-100%') {
                navLinks.style.right = '0';
                menuToggle.innerHTML = '✕';
            } else {
                navLinks.style.right = '-100%';
                menuToggle.innerHTML = '☰';
            }
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.right = '-100%';
                menuToggle.innerHTML = '☰';
            });
        });
    }
};

// Initialize skill bars animation
const initSkillBars = () => {
    const skillSections = document.querySelector('#skills');
    const skillBars = document.querySelectorAll('.chart-bar-fill');

    const animateSkillBars = () => {
        const sectionTop = skillSections.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            skillBars.forEach(bar => {
                bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.innerText;
            });
        }
    };

    window.addEventListener('scroll', animateSkillBars);

    // Initial check in case skills are already visible
    animateSkillBars();
};

// Initialize testimonial slider
const initTestimonialSlider = () => {
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonials = document.querySelectorAll('.testimonial-card');

    if (testimonials.length > 1) {
        let currentIndex = 0;
        const autoSlideInterval = 5000; // 5 seconds

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        dotsContainer.style.display = 'flex';
        dotsContainer.style.justifyContent = 'center';
        dotsContainer.style.gap = '0.5rem';
        dotsContainer.style.marginTop = '2rem';

        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.style.width = '10px';
            dot.style.height = '10px';
            dot.style.borderRadius = '50%';
            dot.style.backgroundColor = index === 0 ? 'var(--accent-color)' : 'rgba(0,0,0,0.2)';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'var(--transition)';

            dot.addEventListener('click', () => {
                scrollToTestimonial(index);
                updateDots(index);
                currentIndex = index;
            });

            dotsContainer.appendChild(dot);
        });

        // Append dots after testimonial container
        const testimonialsSection = document.querySelector('#testimonials');
        testimonialsSection.appendChild(dotsContainer);

        // Auto slide function
        const autoSlide = () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            scrollToTestimonial(currentIndex);
            updateDots(currentIndex);
        };

        // Start auto slide
        let slideInterval = setInterval(autoSlide, autoSlideInterval);

        // Pause auto slide on hover
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        // Resume auto slide when mouse leaves
        testimonialContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(autoSlide, autoSlideInterval);
        });

        // Update dots
        const updateDots = (index) => {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.style.backgroundColor = i === index ? 'var(--accent-color)' : 'rgba(0,0,0,0.2)';
            });
        };

        // Scroll to testimonial
        const scrollToTestimonial = (index) => {
            const testimonialWidth = testimonials[0].offsetWidth + parseInt(getComputedStyle(testimonials[0]).marginRight);
            testimonialContainer.scrollTo({
                left: testimonialWidth * index,
                behavior: 'smooth'
            });
        };
    }
};

// Document loaded event
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    initSkillBars();
    initTestimonialSlider();

    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);

    // Initial check for elements that might be in view on load
    revealOnScroll();
});

// Window resize event
window.addEventListener('resize', () => {
    // Update cursor visibility based on screen size
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
    } else {
        cursor.style.display = 'none';
    }
});