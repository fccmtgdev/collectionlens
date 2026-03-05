document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Subtly animate feature cards and steps on scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .step');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }

        slides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    let intervalId = setInterval(nextSlide, slideInterval);

    function resetTimer() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, slideInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.dataset.index));
            resetTimer();
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });
    }

    // Simple parallax effect for the hero visual on desktop
    const heroVisual = document.querySelector('.mockup-container');
    if (heroVisual && window.innerWidth > 992) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroVisual.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
        });
    }

    // Documentation Sidebar Scroll-Spy
    const docLinks = document.querySelectorAll('.doc-side-link');
    const docSections = document.querySelectorAll('.doc-section, .doc-subsection, .doc-subsection-inner');

    if (docLinks.length > 0 && docSections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -80% 0px',
            threshold: 0
        };

        const docObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    docLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        docSections.forEach(section => docObserver.observe(section));
    }

    // Smooth scrolling for navigation and sidebar links
    document.querySelectorAll('.nav-link, .doc-side-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Account for fixed navbar height
                const navHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    // Dynamic Store Links Detection
    const CHROME_LINK = "https://chromewebstore.google.com/detail/mtg-collection-lens/nkgmdnkmdkafgjmckimpjafpmlcgfnpl";
    const FIREFOX_LINK = "https://addons.mozilla.org/addon/mtg-collection-lens/";

    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    const storeLinks = document.querySelectorAll('.install-link');

    storeLinks.forEach(link => {
        if (isFirefox) {
            link.href = FIREFOX_LINK;
            // Update text if it's explicitly "Chrome Web Store"
            if (link.textContent.trim() === 'Chrome Web Store') {
                link.textContent = 'Firefox Add-ons';
            }
        } else {
            link.href = CHROME_LINK;
        }
    });
});
