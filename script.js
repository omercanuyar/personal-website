// Get user's preferred language from localStorage or default to English
let currentLang = localStorage.getItem('language') || 'en';

// Scroll animation for sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Scroll to top functionality
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollIndicator.classList.add('visible');
    } else {
        scrollIndicator.classList.remove('visible');
    }
});

scrollIndicator.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateContent();
    updateActiveButton();
}

function updateContent() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = key.split('.').reduce((obj, i) => obj[i], translations[currentLang]);
        if (translation) {
            element.textContent = translation;
        }
    });
    document.documentElement.lang = currentLang;
}

function updateActiveButton() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === currentLang.toLowerCase()) {
            btn.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize language
    updateContent();
    updateActiveButton();

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover animations for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Initialize AOS (Animate on Scroll)
    document.querySelectorAll('.timeline-item, .skill-item, .contact-link').forEach(el => {
        observer.observe(el);
    });
});
