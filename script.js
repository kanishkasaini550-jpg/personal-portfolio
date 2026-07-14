document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. TYPING ANIMATION (HERO)
    // ==========================================================================
    const typingTextElement = document.querySelector('.typing-text');
    const roles = ["Full-Stack Developer", "UI/UX Designer", "Creative Thinker", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Delete characters
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Type characters
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of the typed word
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next word
            typingSpeed = 500; // Small pause before starting to type next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingTextElement) {
        typeEffect();
    }


    // ==========================================================================
    // 2. MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // ==========================================================================
    // 3. THEME TOGGLER (DARK / LIGHT MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved theme, otherwise default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            let newTheme = 'dark';

            if (currentTheme === 'dark') {
                newTheme = 'light';
            }

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    // ==========================================================================
    // 4. SCROLL PROGRESS INDICATOR & BACK-TO-TOP BUTTON
    // ==========================================================================
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Calculate scroll progress percentage
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const scrolledPercentage = (window.scrollY / totalScrollHeight) * 100;
            if (scrollProgress) {
                scrollProgress.style.width = `${scrolledPercentage}%`;
            }
        }

        // Control back-to-top button visibility
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // ==========================================================================
    // 5. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS & SCROLL REVEALS
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    
    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25 // Trigger when 25% of the section is visible
    };

    // Active Link Observer logic
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Reveal Elements on Scroll Observer
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Unobserve element after revealing once
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================================================
    // 6. SKILL BARS ANIMATION
    // ==========================================================================
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillsSection = document.getElementById('skills');

    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Fill up each progress bar
                    skillBars.forEach(bar => {
                        const progress = bar.getAttribute('data-progress');
                        bar.style.width = progress;
                    });
                    // Stop observing once animated
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillsObserver.observe(skillsSection);
    }


    // ==========================================================================
    // 7. PROJECTS FILTERING LOGIC
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state on buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show matching cards with transition
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Wait for transition out
                }
            });
        });
    });


    // ==========================================================================
    // 8. CONTACT FORM VALIDATION & SIMULATED SUBMISSION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successPanel = document.getElementById('form-success');
    const successResetBtn = document.getElementById('success-reset-btn');
    const submitBtn = document.getElementById('submit-btn');

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    if (contactForm && successPanel) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset error classes
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => group.classList.remove('error'));

            let hasErrors = false;

            // Form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            // Validation
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('error');
                hasErrors = true;
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                emailInput.parentElement.classList.add('error');
                hasErrors = true;
            }
            
            if (!subjectInput.value.trim()) {
                subjectInput.parentElement.classList.add('error');
                hasErrors = true;
            }

            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('error');
                hasErrors = true;
            }

            // Stop if errors exist
            if (hasErrors) return;

            // Submit to Web3Forms API
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    // Toggle success overlay active state
                    successPanel.classList.add('active');
                    contactForm.reset();
                } else {
                    console.log(res);
                    alert(res.message || "Something went wrong!");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Form submission failed. Please try again.");
            })
            .then(() => {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            });
        });

        // Reset feedback form state
        if (successResetBtn) {
            successResetBtn.addEventListener('click', () => {
                successPanel.classList.remove('active');
            });
        }
    }
});
