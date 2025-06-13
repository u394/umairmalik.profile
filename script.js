// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            }
        }
    });
});

// Navbar Background Change on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Header scroll behavior
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Always show header when scrolling
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.width = '100%';
    header.style.zIndex = '1000';
    header.style.background = 'var(--background)';
    header.style.transition = 'all 0.3s ease';

    lastScrollTop = currentScroll;
});

// Form Animation and Validation
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    // Add placeholder for label animation
    if (!input.placeholder) {
        input.placeholder = ' ';
    }
    
    // Add focus and blur events
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic form validation
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.parentElement.classList.add('error');
        } else {
            input.parentElement.classList.remove('error');
        }
    });
    
    if (isValid) {
        // Add loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10B981';
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    }
});

// Skill Progress Bars Animation
const skillCards = document.querySelectorAll('.skill-card');

const animateProgressBars = () => {
    skillCards.forEach(card => {
        const progress = card.querySelector('.progress');
        const targetWidth = progress.getAttribute('data-progress'); // Get the target width from data-progress
        progress.style.width = '0'; // Reset width to 0 to enable animation from start

        // Use a small timeout to allow the browser to render the 0 width before animating
        setTimeout(() => {
            progress.style.width = targetWidth;
        }, 50); // A small delay (e.g., 50ms)
    });
};

// Animate progress bars when skills section is in view
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing animation to hero text
const heroText = document.querySelector('.animated-text');
const text = heroText.textContent;
heroText.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing animation when page loads
window.addEventListener('load', typeWriter);

// More Skills Button Functionality
const moreSkillsBtn = document.querySelector('.more-skills-btn');
const hiddenSkills = document.querySelectorAll('.hidden-skill');
let isExpanded = false;

moreSkillsBtn.addEventListener('click', () => {
    isExpanded = !isExpanded;
    moreSkillsBtn.classList.toggle('active');
    
    if (isExpanded) {
        moreSkillsBtn.querySelector('span').textContent = 'Show Less';
        // Show skills with staggered delay
        hiddenSkills.forEach((skill, index) => {
            setTimeout(() => {
                skill.classList.add('show');
            }, index * 150); // 150ms delay between each skill
        });
    } else {
        moreSkillsBtn.querySelector('span').textContent = 'More Skills';
        // Hide skills with staggered delay
        hiddenSkills.forEach((skill, index) => {
            setTimeout(() => {
                skill.classList.remove('show');
            }, index * 100); // 100ms delay between each skill
        });
    }
});

// More Projects functionality
function toggleMoreProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    const moreProjectsBtn = document.querySelector('.more-projects-btn');
    const isExpanded = projectsGrid.classList.contains('expanded');

    if (!isExpanded) {
        // Add more projects
        const additionalProjects = [
            {
                title: 'Vitrus Shopify Project',
                image: 'Images/Vitrus.png',
                link: 'https://vitrus.com/',
                description: 'A comprehensive e-commerce platform for Vitrus, featuring advanced product filtering and customer reviews.',
                tech: ['HTML', 'CSS', 'Bootstrap', 'Shopify', 'Liquid'],
                rating: 5
            },
            {
                title: 'Skinnyboost Shopify Project',
                image: 'Images/Skinyboast.png',
                link: 'https://www.skinnyboost.com/',
                description: 'A health and wellness e-commerce platform with subscription management and loyalty program integration.',
                tech: ['HTML', 'CSS', 'Bootstrap', 'Shopify', 'Liquid'],
                rating: 5
            }
        ];

        additionalProjects.forEach(project => {
            const projectCard = createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        projectsGrid.classList.add('expanded');
        moreProjectsBtn.innerHTML = 'Show Less <i class="fas fa-arrow-up"></i>';
    } else {
        // Remove additional projects
        const projects = projectsGrid.querySelectorAll('.project-card');
        for (let i = 3; i < projects.length; i++) {
            projects[i].remove();
        }

        projectsGrid.classList.remove('expanded');
        moreProjectsBtn.innerHTML = 'More Projects <i class="fas fa-arrow-right"></i>';
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${project.link}" class="project-link" target="_blank">
                        <i class="fas fa-link"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Project reviews data
const projectReviews = {
    'Homewetbar Shopify Project': [
        {
            name: 'John Smith',
            rating: 5,
            comment: 'Excellent work on the HomeWetBar project! The gift logic implementation was flawless and the UI is very intuitive. The custom product options work perfectly.'
        },
        {
            name: 'Sarah Johnson',
            rating: 4,
            comment: 'Great job on the e-commerce platform. The checkout process is smooth and the mobile responsiveness is outstanding. Would have loved to see more payment options.'
        }
    ],
    'Tipsyscope Shopify Project': [
        {
            name: 'Michael Brown',
            rating: 5,
            comment: 'Amazing work on the Tipsy Scoop website! The barlour location finder is very user-friendly and the nationwide shipping integration works perfectly.'
        },
        {
            name: 'Emily Davis',
            rating: 5,
            comment: 'The ice cream product showcase is beautiful and the ordering system is very efficient. The custom flavor builder is a great feature!'
        }
    ],
    'AdvantageLift Shopify Project': [
        {
            name: 'Robert Wilson',
            rating: 5,
            comment: 'Outstanding work on the Advantage Lifts platform! The product comparison feature is excellent and the technical specifications are well presented.'
        },
        {
            name: 'Lisa Anderson',
            rating: 4,
            comment: 'Great job on the garage equipment showcase. The 3D product views are impressive and the installation guides are very helpful.'
        }
    ],
    'Stand Out Socks Shopify Project': [
        {
            name: 'David Thompson',
            rating: 5,
            comment: 'Exceptional work on the Stand Out Socks platform! The subscription management system is seamless and the customer experience is outstanding. The sock customization options are brilliant.'
        },
        {
            name: 'Emma Wilson',
            rating: 5,
            comment: 'The subscription model implementation is perfect, and the website design is both playful and professional. The gift box feature is particularly well executed.'
        }
    ],
    'Vitrus Shopify Project': [
        {
            name: 'David Miller',
            rating: 5,
            comment: 'Excellent work on the Vitrus project! The product catalog is well organized and the search functionality is very efficient.'
        },
        {
            name: 'Jennifer Taylor',
            rating: 4,
            comment: 'Great implementation of the e-commerce features. The customer reviews section is well integrated and the product filtering works perfectly.'
        }
    ],
    'Skinnyboost Shopify Project': [
        {
            name: 'James Wilson',
            rating: 5,
            comment: 'Amazing work on the Skinnyboost website! The subscription model implementation is flawless and the product recommendations are spot on.'
        },
        {
            name: 'Patricia Moore',
            rating: 5,
            comment: 'The health product showcase is beautiful and the checkout process is very smooth. The loyalty program integration is excellent!'
        }
    ]
};

// Function to create star rating HTML
function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Modal elements
    const modal = document.getElementById('reviewModal');
    const closeButton = document.querySelector('.close-button');

    // Function to show project reviews
    function showProjectReviews(projectTitle) {
        if (!modal) return; // Check if modal exists
        
        const modalTitle = document.getElementById('modalProjectTitle');
        const reviewsContainer = document.getElementById('modalReviewsContainer');
        
        if (!modalTitle || !reviewsContainer) return; // Check if other elements exist
        
        modalTitle.textContent = projectTitle;
        reviewsContainer.innerHTML = '';
        
        const reviews = projectReviews[projectTitle] || [];
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review-item';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <h4>${review.name}</h4>
                    <div class="review-stars">
                        ${createStarRating(review.rating)}
                    </div>
                </div>
                <p>${review.comment}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
        
        modal.style.display = 'block';
    }

    // Add click event listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectTitle = card.querySelector('h3').textContent;
            showProjectReviews(projectTitle);
        });
    });

    // Close modal when clicking the close button
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Handle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (navLinks && navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.menu-toggle')) {
            navLinks.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });

    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking a link
                if (navLinks) navLinks.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });
});

// Attach event listeners to all project star ratings
function attachStarClickListeners() {
    document.querySelectorAll('.project-stars').forEach(starsDiv => {
        starsDiv.style.cursor = 'pointer'; // Make it clear it's clickable
        starsDiv.removeEventListener('click', handleStarClick); // Prevent duplicate listeners
        starsDiv.addEventListener('click', handleStarClick);
    });
}

function handleStarClick(event) {
    // Find the closest parent project card to get the title
    const projectCard = event.target.closest('.project-card');
    if (projectCard) {
        const projectTitle = projectCard.querySelector('h3').textContent;
        showProjectReviews(projectTitle);
    }
}

// Initial attachment of listeners for existing cards
document.addEventListener('DOMContentLoaded', attachStarClickListeners);

// Also attach listeners when more projects are loaded dynamically
const originalToggleMoreProjects = toggleMoreProjects; // Save original function
toggleMoreProjects = function() {
    originalToggleMoreProjects(); // Call the original functionality
    setTimeout(attachStarClickListeners, 100); // Re-attach after new cards are rendered
}; 
