document.addEventListener('DOMContentLoaded', () => {
    // Wait for initial page load animations to complete
    setTimeout(() => {
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        // Observe all elements that need animations - now including skills and hobbies sections
        const animatedElements = document.querySelectorAll(
            '.about-content, .about-title, .about-image-container, .about-text, .location-tag, .name-tag, ' +
            '.skills-content, .skills-text, .skills-grid, ' +
            '.hobbies-content, .hobbies-text, .hobbies-image-container'
        );

        // Separate observer for project section with different animation behavior
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('visible');
                    entry.target.classList.add('animated');
                    projectObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        // Observe project elements
        const projectElements = document.querySelectorAll('.projects-title, .projects-carousel');
        
        animatedElements.forEach(element => {
            element.classList.remove('visible');
            observer.observe(element);
        });

        projectElements.forEach(element => {
            element.classList.remove('visible');
            projectObserver.observe(element);
        });

        // Delay for hero section
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-content, .mega-text span, .scrolling-text');
            heroElements.forEach(element => {
                element.classList.add('visible');
            });
        }, 100); // Changed to 0.5 seconds

        // Add animation reset and trigger for tab switching
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                const tabContent = document.getElementById(`${tabId}-content`);
                
                // Reset animations for the new tab
                const elementsToAnimate = tabContent.querySelectorAll(
                    '.about-content, .about-title, .about-image-container, .about-text, ' +
                    '.skills-text, .skills-grid, ' +
                    '.hobbies-text, .hobbies-image-container'
                );

                elementsToAnimate.forEach(element => {
                    element.classList.remove('visible', 'animated');
                    observer.observe(element);
                });
            });
        });
    }, 100);

    // Add horizontal scroll with mouse wheel for hobbies gallery
    const hobbiesGallery = document.querySelector('.hobbies-gallery');
    if (hobbiesGallery) {
        hobbiesGallery.addEventListener('wheel', (e) => {
            if (hobbiesGallery.matches(':hover')) {
                e.preventDefault();
                hobbiesGallery.scrollLeft += e.deltaY;
            }
        });
    }

    // Add mouse movement effect to hero text
    const heroText = document.querySelector('.mega-text');
    
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const moveX = (x - 0.5) * 40;  // Increased from 20 to 40 for more horizontal movement
        const moveY = (y - 0.5) * 20;  // Kept vertical movement the same
        
        heroText.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    document.addEventListener('mouseleave', () => {
        heroText.style.transform = 'translate(0, 0)';
    });

    // Add this inside the DOMContentLoaded event listener
    const contactSection = document.querySelector('.contact');
    const contactElements = contactSection.querySelectorAll('.contact-title, .touch-title, .contact-description, .contact-email');

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    contactElements.forEach(element => {
        contactObserver.observe(element);
    });

    // Add hover effect to contact description
    const contactDescription = document.querySelector('.contact-description p');
    contactDescription.innerHTML = contactDescription.textContent.split('').map(char => 
        char === ' ' ? ' ' : `<span>${char}</span>`
    ).join('');

    const chars = contactDescription.querySelectorAll('span');
    chars.forEach((char, i) => {
        char.style.transitionDelay = `${i * 0.02}s`;
    });

    // Add ripple effect to project title letters
    const projectTitleLetters = document.querySelectorAll('.projects-title span');
    
    projectTitleLetters.forEach(letter => {
        letter.addEventListener('mouseover', function(e) {
            // Create ripple element
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            // Position ripple at cursor position
            const rect = letter.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to letter
            letter.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });

        // Add 3D rotation effect
        letter.addEventListener('mousemove', function(e) {
            const rect = letter.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            letter.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
        });

        // Reset transform on mouse leave
        letter.addEventListener('mouseleave', function() {
            letter.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}); 