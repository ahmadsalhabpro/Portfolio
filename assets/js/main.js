document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ once: true, duration: 1000 });
    const header = document.querySelector('.header');
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const visitorCountSpan = document.getElementById('visitor-count');
    const portfolioGrid = document.getElementById('portfolio-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more');
    const contactForm = document.getElementById('contact-form');
    const loadingSpinner = document.getElementById('loading-spinner');

    // --- Loading Spinner Logic ---
    const showSpinner = () => {
        loadingSpinner.classList.remove('hidden');
    };

    const hideSpinner = () => {
        loadingSpinner.classList.add('hidden');
    };

    // Show spinner on page load, hide when everything is loaded
    showSpinner();
    window.addEventListener('load', hideSpinner);

    // --- Header and Navigation ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 20; // Adjust offset
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
    
    // Initial active link setup for the first section
    if (sections.length > 0) {
        navLinks.forEach(link => {
            if (link.href.includes(sections[0].getAttribute('id'))) {
                link.classList.add('active');
            }
        });
    }

    // --- Visitor Counter ---
    let visitorCount = parseInt(localStorage.getItem('portfolio_visitor_count')) || 0;
    visitorCount++;
    localStorage.setItem('portfolio_visitor_count', visitorCount);
    visitorCountSpan.textContent = visitorCount;

    // --- Back to Top Button ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Dynamic Portfolio Items (simulated from Mostaql) ---
    const allPortfolioItems = [
        {
            id: 1,
            title: "نظام إدارة مكتبة",
            description: "تطبيق ويب متكامل لإدارة الكتب والأعضاء والإعارات، مع واجهة مستخدم بديهية.",
            technologies: "Python, Django, PostgreSQL, HTML, CSS, JavaScript",
            image: "assets/images/project-library.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/12345",
            category: "web"
        },
        {
            id: 2,
            title: "متجر إلكتروني للملابس",
            description: "تصميم وتطوير متجر إلكتروني جذاب ومتجاوب لبيع الملابس، مع نظام دفع آمن.",
            technologies: "React, Node.js, Express, MongoDB, Stripe",
            image: "assets/images/project-ecommerce.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/67890",
            category: "web"
        },
        {
            id: 3,
            title: "تصميم هوية بصرية لشركة ناشئة",
            description: "إنشاء شعار وهوية بصرية كاملة لشركة تقنية جديدة، تشمل الألوان والخطوط والأنماط.",
            technologies: "Adobe Photoshop, Adobe Illustrator, Figma",
            image: "assets/images/project-branding.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/11223",
            category: "design"
        },
        {
            id: 4,
            title: "تطبيق تحليل بيانات للأسهم",
            description: "تطبيق Python يقوم بجمع وتحليل بيانات الأسهم وعرضها بشكل رسومي للمساعدة في اتخاذ القرارات.",
            technologies: "Python, Pandas, Matplotlib, Flask",
            image: "assets/images/project-stocks.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/44556",
            category: "python"
        },
        {
            id: 5,
            title: "موقع شخصي للمحامي",
            description: "تصميم وتطوير موقع ويب احترافي لمحامي لعرض خدماته ومقالاته القانونية.",
            technologies: "WordPress, Elementor, Custom CSS",
            image: "assets/images/project-lawyer.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/77889",
            category: "web"
        },
        {
            id: 6,
            title: "تصميم واجهة مستخدم لتطبيق جوال",
            description: "تصميم UX/UI لتطبيق جوال لإدارة المهام اليومية، مع التركيز على سهولة الاستخدام.",
            technologies: "Figma, Adobe XD",
            image: "assets/images/project-mobile-app.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/99001",
            category: "design"
        },
        {
            id: 7,
            title: "سكربت أتمتة إدخال البيانات",
            description: "سكربت Python يقوم بأتمتة عملية إدخال البيانات من ملفات Excel إلى نظام ويب.",
            technologies: "Python, Selenium, OpenPyXL",
            image: "assets/images/project-automation.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/22334",
            category: "python"
        },
        {
            id: 8,
            title: "نظام حجز مواعيد عيادة",
            description: "تطوير نظام لحجز وإدارة مواعيد المرضى في عيادة طبية، مع لوحة تحكم للأطباء.",
            technologies: "PHP, Laravel, MySQL, Vue.js",
            image: "assets/images/project-clinic.jpg", // Placeholder image
            link: "https://mostaql.com/portfolio/55667",
            category: "web"
        }
    ];

    let displayedItemsCount = 6; // Initial number of items to display
    let currentFilter = 'all';

    const renderPortfolioItems = (filter) => {
        portfolioGrid.innerHTML = ''; // Clear current items
        const filteredItems = filter === 'all' ? allPortfolioItems : allPortfolioItems.filter(item => item.category === filter);
        
        filteredItems.slice(0, displayedItemsCount).forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.classList.add('portfolio-item', item.category);
            portfolioItem.innerHTML = `
                &lt;img data-src="${item.image}" alt="${item.title}" class="lazy-load-img"&gt;
                <div class="portfolio-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="portfolio-technologies">التقنيات: ${item.technologies}</div>
                    <a href="${item.link}" target="_blank" class="portfolio-link">
                        عرض المشروع <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });

        // Update load more button visibility
        if (displayedItemsCount >= filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        initializeLazyLoading();
    };

    const initializeLazyLoading = () => {
        const lazyImages = document.querySelectorAll('img.lazy-load-img');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load-img');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            observer.observe(img);
        });
    };

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            displayedItemsCount = 6; // Reset count when filter changes
            renderPortfolioItems(currentFilter);
        });
    });

    // Load More functionality
    loadMoreBtn.addEventListener('click', () => {
        displayedItemsCount += 3; // Load 3 more items
        renderPortfolioItems(currentFilter);
    });

    // Initial render of portfolio items
    renderPortfolioItems(currentFilter);

    // --- Skill Bars Animation (on scroll into view) ---
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.dataset.width;
                progressBar.style.width = width;
                observer.unobserve(progressBar); // Stop observing once animated
            }
        });
    };

    const skillBarObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    skillProgressBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });

    // --- Contact Form Submission (Basic simulation) ---
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showSpinner(); // Show spinner on form submission

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Simulate API call
        try {
            // Replace with actual API endpoint for form submission (e.g., Formspree, Netlify Forms, or custom backend)
            const response = await new Promise(resolve => setTimeout(() => {
                // Simulate success or failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve({ status: 200, message: "تم إرسال رسالتك بنجاح!" });
                } else {
                    throw new Error("حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.");
                }
            }, 1500)); // Simulate network delay

            if (response.status === 200) {
                alert(response.message);
                contactForm.reset();
            } else {
                alert("حدث خطأ غير متوقع.");
            }
        } catch (error) {
            alert(error.message);
            console.error('Form submission error:', error);
        } finally {
            hideSpinner(); // Hide spinner after response
        }
    });

});
