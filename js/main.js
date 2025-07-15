// Check if device is mobile
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Remove all existing content
        document.body.innerHTML = '';
        
        // Create and append mobile message
        const mobileMessage = document.createElement('div');
        mobileMessage.className = 'mobile-message';
        mobileMessage.innerHTML = `<p>
            this<br>
            webpage<br>
            is not yet<br>
            available for<br>
            your<br>
            mobile<br>
            device :(<br>
        </p>`;
        document.body.appendChild(mobileMessage);
        
        // Stop execution of the rest of the script
        return;
    }

    // Hide loading screen when content is loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        // Add hover effect for all clickable elements
        const clickableElements = document.querySelectorAll('a, button, .project-slide, input[type="submit"]');
        
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when it leaves the window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    }

    // Initialize scrolling text animation
    const textTrack = document.querySelector('.text-track');
    if (textTrack) {
        textTrack.innerHTML += textTrack.innerHTML;
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form validation and submission logic here
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.opacity = '0';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const projects = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 1; // Start with middle slide

    function updateSlides() {
        projects.forEach((project, index) => {
            project.className = 'project-slide';
            
            if (index === currentIndex) {
                project.classList.add('current');
            } else if (index === currentIndex - 1 || 
                     (currentIndex === 0 && index === projects.length - 1)) {
                project.classList.add('prev');
            } else if (index === currentIndex + 1 || 
                     (currentIndex === projects.length - 1 && index === 0)) {
                project.classList.add('next');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateSlides();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateSlides();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Initialize slides
    updateSlides();

    // Header scroll effect
    const header = document.querySelector('.header');
    
    // Set initial state
    if (window.scrollY === 0) {
        header.classList.add('at-top');
        header.classList.remove('scrolled');
    } else {
        header.classList.add('scrolled');
        header.classList.remove('at-top');
    }

    // Update on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY === 0) {
            header.classList.add('at-top');
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
            header.classList.remove('at-top');
        }
    });

    // Add tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const activePane = document.getElementById(`${tabId}-content`);
            activePane.classList.add('active');

            // Reset and trigger animations
            const elementsToAnimate = activePane.querySelectorAll('.about-title, .skills-title, .hobbies-title, .about-text, .skills-text, .hobbies-text, .about-image-container, .skills-grid, .hobbies-image-container');
            
            elementsToAnimate.forEach(element => {
                element.classList.remove('visible');
                void element.offsetWidth; // Trigger reflow
                element.classList.add('visible');
            });
        });
    });

    // Add this to your existing header scroll logic
    let lastScrollTop = 0;
    const scrollThreshold = 100; // Minimum scroll amount before hiding/showing

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        // Check if we're past the hero section
        if (currentScroll > heroHeight) {
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down - hide header
                header.classList.add('header-hidden');
            } else if (currentScroll < lastScrollTop) {
                // Scrolling up - show header
                header.classList.remove('header-hidden');
            }
        } else {
            // In hero section - show header and handle transparency
            header.classList.remove('header-hidden');
            if (currentScroll === 0) {
                header.classList.add('at-top');
                header.classList.remove('scrolled');
            } else {
                header.classList.add('scrolled');
                header.classList.remove('at-top');
            }
        }
        
        lastScrollTop = currentScroll;
    });

    // Add this to your scroll event listener
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        const aboutSection = document.querySelector('.about');
        const header = document.querySelector('.header');
        
        // Check if header is over the about section
        const aboutRect = aboutSection.getBoundingClientRect();
        if (aboutRect.top <= header.offsetHeight && aboutRect.bottom >= 0) {
            header.classList.add('over-dark-section');
        } else {
            header.classList.remove('over-dark-section');
        }
    });

    // Add mouse movement effect to project images
    const projectSlides = document.querySelectorAll('.project-slide');
    
    projectSlides.forEach(slide => {
        slide.addEventListener('mousemove', (e) => {
            if (!slide.classList.contains('current')) return;
            
            const rect = slide.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Convert coordinates to percentages (-50 to 50)
            const xPercent = ((x / rect.width) - 0.5) * 100;
            const yPercent = ((y / rect.height) - 0.5) * 100;
            
            // Apply the transform
            const img = slide.querySelector('img');
            img.style.transform = `
                perspective(1000px)
                rotateY(${xPercent * 0.1}deg)
                rotateX(${-yPercent * 0.1}deg)
                translateX(${xPercent * 0.1}px)
                translateY(${yPercent * 0.1}px)
                scale(1.05)
            `;
        });
        
        // Reset transform when mouse leaves
        slide.addEventListener('mouseleave', () => {
            const img = slide.querySelector('img');
            img.style.transform = 'none';
        });
    });
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Check saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Project Cards Data
const projects = [
    {
        title: 'Project 1',
        description: 'Description of project 1',
        image: 'assets/project1.jpg',
        link: '#'
    },
    // Add more projects...
];

// Dynamically create project cards
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card animate-on-scroll';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" class="project-link">View Project</a>
        `;
        projectsGrid.appendChild(card);
    });
}

// Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form validation and submission logic here
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
    } else {
        backToTop.style.opacity = '0';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 