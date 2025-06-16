// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    console.log('Burger element:', burger);
    console.log('Nav element:', nav);
    console.log('Nav Links elements:', navLinks);

    if (burger && nav && navLinks) {
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
    }

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
        if (header) {
            header.style.position = 'fixed';
            header.style.top = '0';
            header.style.left = '0';
            header.style.width = '100%';
            header.style.zIndex = '1000';
            header.style.background = 'var(--background)';
            header.style.transition = 'all 0.3s ease';
        }
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
    if (form) {
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
    }

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

    if (skillsSection) {
        observer.observe(skillsSection);
    }

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
    if (heroText) {
        window.addEventListener('load', typeWriter);
    }

    // More Skills Button
    const moreSkillsBtn = document.querySelector('.more-skills-btn');
    const hiddenSkills = document.querySelectorAll('.hidden-skill');
    
    if (moreSkillsBtn) {
        moreSkillsBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            hiddenSkills.forEach(skill => {
                if (this.classList.contains('active')) {
                    skill.classList.add('show');
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    skill.classList.remove('show');
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // More Projects Button
    const moreProjectsBtn = document.querySelector('.more-projects-btn');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (moreProjectsBtn && projectsGrid) {
        moreProjectsBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                projectsGrid.classList.add('expanded');
                icon.style.transform = 'rotate(180deg)';
            } else {
                projectsGrid.classList.remove('expanded');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Project Reviews Data
    const projectReviews = {
        "Homewetbar Shopify Project": [
            {
                name: "John D.",
                rating: 5,
                comment: "This store is fantastic! The custom engraving option made my gift truly unique. The site was easy to navigate and the checkout process was smooth."
            },
            {
                name: "Sarah L.",
                rating: 4,
                comment: "Great selection of bar accessories. I found exactly what I needed. Shipping was quick, and the items arrived well-packaged. Highly recommended!"
            },
            {
                name: "Robert K.",
                rating: 5,
                comment: "The personalized bar tools I ordered were beautifully crafted. The website's customization options were intuitive, and the customer service was exceptional. Will definitely order again!"
            },
            {
                name: "Lisa M.",
                rating: 5,
                comment: "As a professional bartender, I'm very particular about my tools. HomeWetBar exceeded my expectations with their quality and selection. The website made it easy to find exactly what I needed."
            }
        ],
        "Tipsyscope Shopify Project": [
            {
                name: "Emily R.",
                rating: 5,
                comment: "Tipsy Scoop is a game-changer! The website made it super easy to order, and the ice cream flavors are out of this world. Love the barlour locator feature!"
            },
            {
                name: "Mark T.",
                rating: 5,
                comment: "Ordered for a party and everyone loved it. The site is clean and user-friendly, and the delivery was prompt. Will definitely be a returning customer."
            }
        ],
        "AdvantageLift Shopify Project": [
            {
                name: "Michael B.",
                rating: 5,
                comment: "Advantage Lifts has a top-notch website. Finding the right car lift was straightforward, and the detailed product descriptions were very helpful. Excellent quality products."
            },
            {
                name: "Jessica W.",
                rating: 4,
                comment: "The site provided all the information I needed to make an informed decision. The ordering process was efficient, and the customer support was responsive to my inquiries."
            }
        ],
        "Stand Out Socks Shopify Project": [
            {
                name: "David Thompson",
                rating: 5,
                comment: "Stand Out Socks has truly elevated my sock game! The subscription service is seamless, and the quality of the socks is exceptional. Love the variety!"
            },
            {
                name: "Emma Wilson",
                rating: 5,
                comment: "The website is super user-friendly, and I had no trouble customizing my gift box. The socks are incredibly comfortable and stylish. Highly recommend this platform!"
            }
        ],
        "Vitrus Shopify Project": [
            {
                name: "Alex K.",
                rating: 5,
                comment: "The Vitrus Shopify project is incredibly well-designed and user-friendly. Navigating through products is a breeze!"
            },
            {
                name: "Maria S.",
                rating: 4,
                comment: "Great e-commerce site for Vitrus! I appreciate the clear product displays and efficient checkout process. A very professional online store."
            }
        ],
        "Skinnyboost Shopify Project": [
            {
                name: "Chris T.",
                rating: 5,
                comment: "Skinnyboost's website is fantastic! It's easy to find products, and the information is very clear. A smooth and enjoyable shopping experience."
            },
            {
                name: "Laura P.",
                rating: 5,
                comment: "I love the Skinnyboost Shopify project. The site is visually appealing and highly functional. Definitely makes shopping for health products a pleasure."
            }
        ]
    };

    // Show Project Reviews in Modal
    const reviewModal = document.getElementById('reviewModal');
    const closeButton = document.querySelector('.close-button');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalReviewsContainer = document.getElementById('modalReviewsContainer');

    function showProjectReviews(projectTitle) {
        const reviews = projectReviews[projectTitle];
        if (reviews) {
            modalProjectTitle.textContent = projectTitle + ' Reviews';
            modalReviewsContainer.innerHTML = ''; // Clear previous reviews
            reviews.forEach(review => {
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review-item');
                reviewItem.innerHTML = `
                    <div class="review-header">
                        <h4>${review.name}</h4>
                        <div class="review-stars">
                            ${createStarRating(review.rating)}
                        </div>
                    </div>
                    <p>${review.comment}</p>
                `;
                modalReviewsContainer.appendChild(reviewItem);
            });
            reviewModal.style.display = 'block';
            document.body.classList.add('no-scroll'); // Prevent scrolling when modal is open
        }
    }

    // Close Modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            reviewModal.style.display = 'none';
            document.body.classList.remove('no-scroll'); // Re-enable scrolling
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == reviewModal) {
            reviewModal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    // Add click event listeners to project stars
    document.querySelectorAll('.project-stars').forEach(stars => {
        stars.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Stop the click from reaching the project card
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            showProjectReviews(projectTitle);
        });
    });

    // Add click event listeners to project cards (excluding stars)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if the click wasn't on the stars
            if (!e.target.closest('.project-stars')) {
                const link = this.querySelector('.project-link');
                if (link) {
                    window.open(link.href, '_blank');
                }
            }
        });
    });

    // Helper function to create star rating HTML
    function createStarRating(rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        return starsHtml;
    }
}); 
