

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Typed text effect for hero section
    const typedTextElement = document.getElementById('typed-text');
    const textToType = "Crafting Dynamic & Scalable Shopify & WordPress Solutions";
    let index = 0;
    
    function typeText() {
        if (index < textToType.length) {
            typedTextElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(typeText, 30);
        } else {
            // Add blinking cursor after typing is complete
            typedTextElement.innerHTML = typedTextElement.textContent + '<span class="cursor">|</span>';
            setInterval(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        // Save theme preference
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Skills filter functionality
    const skillsSearch = document.getElementById('skills-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillTags = document.querySelectorAll('.skill-tag');
    
    // Filter skills based on search input
    skillsSearch.addEventListener('input', filterSkills);
    
    // Filter skills based on level buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            filterSkills();
        });
    });
    
    function filterSkills() {
        const searchTerm = skillsSearch.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        skillTags.forEach(tag => {
            const skillName = tag.textContent.toLowerCase();
            const skillLevel = tag.classList.contains('expert') ? 'expert' : 
                              tag.classList.contains('advanced') ? 'advanced' : 'intermediate';
            
            // Check if skill matches both search term and level filter
            const matchesSearch = skillName.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || skillLevel === activeFilter;
            
            // Show/hide skill tag
            if (matchesSearch && matchesFilter) {
                tag.style.display = 'inline-block';
                tag.parentElement.parentElement.style.display = 'block';
            } else {
                tag.style.display = 'none';
                
                // Check if all skills in a category are hidden
                const categorySkills = tag.parentElement.querySelectorAll('.skill-tag');
                const allHidden = Array.from(categorySkills).every(skill => skill.style.display === 'none');
                
                if (allHidden) {
                    tag.parentElement.parentElement.style.display = 'none';
                }
            }
        });
    }
    
    // Experience section expand/collapse
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            // Toggle content visibility
            content.classList.toggle('active');
            
            // Toggle button text and icon
            if (content.classList.contains('active')) {
                button.querySelector('span').textContent = 'Hide Details';
                button.classList.add('active');
            } else {
                button.querySelector('span').textContent = 'View Details';
                button.classList.remove('active');
            }
        });
    });
    
    // Projects filter
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Get filter value
            const filter = tab.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Project modal functionality
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Project data for modal
    const projectData = [
        {
            id: 1,
            title: "DALL-E 2 PyTorch Implementation",
            description: "Open-source implementation of OpenAI's DALL-E 2 image generation model using PyTorch.",
            longDescription: "A PyTorch implementation of the DALL-E 2 architecture for generating high-quality images from text descriptions. The project includes optimizations for CUDA acceleration and containerization with Docker for easy deployment and scaling.",
            achievements: [
                "Implemented the full DALL-E 2 architecture with PyTorch",
                "Optimized for CUDA acceleration with 40% performance improvement",
                "Created Docker containers for easy deployment",
                "Built a web interface for text-to-image generation"
            ],
            technologies: ["PyTorch", "CUDA", "Docker", "HuggingFace", "Python"],
            completed: "2023",
            teamSize: 2,
            difficulty: 5,
            demoUrl: "#",
            githubUrl: "https://github.com",
            imageUrl: "https://via.placeholder.com/800x450"
        },
        {
            id: 2,
            title: "Multi-Agent RL Environment",
            description: "A flexible environment for training and evaluating multi-agent reinforcement learning algorithms.",
            longDescription: "A customizable environment for developing and testing multi-agent reinforcement learning algorithms. The system supports various reward structures, observation spaces, and agent interactions.",
            achievements: [
                "Designed a flexible multi-agent environment supporting various RL algorithms",
                "Implemented custom reward structures and observation spaces",
                "Created visualization tools for agent behavior analysis",
                "Benchmarked performance against standard environments"
            ],
            technologies: ["Python", "TensorFlow", "OpenAI Gym", "Ray", "Docker"],
            completed: "2023",
            teamSize: 2,
            difficulty: 4,
            demoUrl: "#",
            githubUrl: "https://github.com",
            imageUrl: "https://via.placeholder.com/800x450"
        },
        {
            id: 3,
            title: "Community Grant Management System",
            description: "Web application for managing community grant applications, reviews, and distributions.",
            longDescription: "A full-stack web application that streamlines the process of managing community grants from application to distribution. The system includes features for application submission, review workflows, and financial tracking.",
            achievements: [
                "Built a full-stack application with Next.js and PostgreSQL",
                "Implemented secure authentication and authorization",
                "Created a workflow system for grant application review",
                "Deployed on AWS with CI/CD pipeline"
            ],
            technologies: ["Next.js", "PostgreSQL", "AWS", "TypeScript", "Prisma"],
            completed: "2022",
            teamSize: 2,
            difficulty: 3,
            demoUrl: "#",
            githubUrl: "https://github.com",
            imageUrl: "https://via.placeholder.com/800x450"
        }
    ];
    
    // Open modal with project details
    projectDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = parseInt(btn.getAttribute('data-project'));
            const project = projectData.find(p => p.id === projectId);
            
            if (project) {
                // Set modal content
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-long-description').textContent = project.longDescription;
                
                // Set implementation details
                document.getElementById('modal-implementation').textContent = `This project was implemented using ${project.technologies.join(", ")}. The development process involved careful planning, iterative development, and rigorous testing to ensure high-quality results.`;
                
                // Set challenges
                document.getElementById('modal-challenges').textContent = "During development, we encountered several challenges including performance optimization, scalability concerns, and integration complexities. These were addressed through innovative approaches and best practices in software engineering.";
                
                // Set achievements
                const achievementsList = document.getElementById('modal-achievements');
                achievementsList.innerHTML = '';
                project.achievements.forEach(achievement => {
                    const li = document.createElement('li');
                    li.textContent = achievement;
                    achievementsList.appendChild(li);
                });
                
                // Set technologies
                const technologiesDiv = document.getElementById('modal-technologies');
                technologiesDiv.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tag';
                    span.textContent = tech;
                    technologiesDiv.appendChild(span);
                });
                
                // Set project info
                document.getElementById('modal-completed').textContent = project.completed;
                document.getElementById('modal-team').textContent = `${project.teamSize} people`;
                
                // Set difficulty stars
                const difficultyDiv = document.getElementById('modal-difficulty');
                difficultyDiv.innerHTML = '';
                for (let i = 0; i < 5; i++) {
                    const star = document.createElement('i');
                    star.className = i < project.difficulty ? 'fas fa-star' : 'far fa-star';
                    difficultyDiv.appendChild(star);
                }
                
                // Set links
                document.getElementById('modal-demo').href = project.demoUrl;
                document.getElementById('modal-github').href = project.githubUrl;
                
                // Set image
                document.getElementById('modal-image').querySelector('img').src = project.imageUrl;
                
                // Show modal
                modal.classList.add('active');
                
                // Reset to overview tab
                modalTabs.forEach(tab => tab.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                document.querySelector('[data-tab="overview"]').classList.add('active');
                document.getElementById('tab-overview').classList.add('active');
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Modal tabs
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            modalTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get email
        const email = document.getElementById('newsletter-email').value;
        
        // Simulate subscription
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalIcon = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Reset form
            newsletterForm.reset();
            
            // Show success message
            alert('Thank you for subscribing to my newsletter!');
            
            // Reset button
            submitBtn.innerHTML = originalIcon;
            submitBtn.disabled = false;
        }, 1500);
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-grid, .experience-card, .project-card');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('animate-fade-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
});

// Add this to your existing script.js file

// Projects filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Add animation classes to project cards
  projectCards.forEach(card => {
    card.classList.add('animate-fade-in-up');
  });
  
  // Filter projects based on category
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get filter value
      const filter = tab.getAttribute('data-filter');
      
      // Filter projects with animation
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Reset animation
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Add hover pulse effect to featured project
  const featuredHeading = document.querySelector('.featured-heading');
  if (featuredHeading) {
    featuredHeading.classList.add('animate-pulse');
  }
  
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all project cards
  projectCards.forEach(card => {
    observer.observe(card);
  });
  
  // Add parallax effect to project images on mouse move
  const projectImages = document.querySelectorAll('.project-image');
  
  projectImages.forEach(image => {
    image.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      const img = image.querySelector('img');
      img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    image.addEventListener('mouseleave', () => {
      const img = image.querySelector('img');
      img.style.transform = 'scale(1)';
    });
  });
});
