// Variables globales
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');

// Gestion du scroll de la navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation du hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Réinitialiser l'animation du hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navigation active
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Animation des barres de compétences
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Animation des barres de langue
const animateLanguageBars = () => {
    const languageBars = document.querySelectorAll('.level-bar');
    
    languageBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
};

// Animation des statistiques
const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = stat.textContent;
        const number = parseInt(finalNumber.replace('+', ''));
        let currentNumber = 0;
        const increment = number / 30;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= number) {
                currentNumber = number;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentNumber) + (finalNumber.includes('+') ? '+' : '');
        }, 50);
    });
};

// Observer pour les animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animations spécifiques selon la section
            if (entry.target.id === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            
            if (entry.target.id === 'about') {
                setTimeout(() => {
                    animateStats();
                    animateLanguageBars();
                }, 300);
            }
        }
    });
}, observerOptions);

// Observer tous les éléments qui doivent être animés
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter la classe fade-in aux éléments
    const animatedElements = document.querySelectorAll('section, .skill-item, .timeline-item, .project-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Animation initiale de chargement
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Formulaire de contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulation d'envoi
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Animation de chargement
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'une requête (remplacer par vraie API)
    setTimeout(() => {
        // Créer le message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message envoyé avec succès ! Je vous répondrai bientôt.';
        
        // Ajouter le message après le formulaire
        contactForm.appendChild(successMessage);
        
        // Réinitialiser le formulaire
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
        
    }, 2000);
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Offset pour la navbar fixe
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation de typing effect pour le nom (optionnel)
const typewriterEffect = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Parallax effect pour le hero (optionnel)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Gestion du thème sombre (fonctionnalité future)
const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// Restaurer le thème depuis localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

// Performance: Lazy loading pour les images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
});

// Animation de chargement de la page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animer l'apparition progressive des éléments
    const elementsToAnimate = document.querySelectorAll('.hero-text, .hero-image');
    elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('loading');
        }, index * 200);
    });
});

// Fonction utilitaire pour débouncer les événements
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimisation du scroll avec debounce
const handleScroll = debounce(() => {
    // Logique de scroll optimisée
    const scrollTop = window.pageYOffset;
    
    // Mettre à jour la position des éléments parallax
    document.documentElement.style.setProperty('--scroll', scrollTop);
}, 10);

window.addEventListener('scroll', handleScroll);

// Fonction pour copier l'email dans le presse-papier
const copyEmail = () => {
    const email = 'lahssouhicham@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        // Afficher une notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copié dans le presse-papier !';
        notification.className = 'success-message';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
};

// Ajouter un gestionnaire de clic sur l'email
document.addEventListener('DOMContentLoaded', () => {
    const emailElements = document.querySelectorAll('[href^="mailto:"]');
    emailElements.forEach(el => {
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            copyEmail();
        });
    });
});