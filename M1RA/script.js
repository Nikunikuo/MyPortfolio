document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Grid effect animation
    animateGrid();
    
    // Add scroll reveal animations
    const sections = document.querySelectorAll('section');
    
    function checkVisibility() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
    
    // Add parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroElements = document.querySelectorAll('.hero-content, .hologram-container');
        
        heroElements.forEach(element => {
            const speed = element.classList.contains('hero-content') ? 0.3 : 0.1;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Add type effect to data-readout
    const dataItems = document.querySelectorAll('.data-item');
    
    dataItems.forEach((item, index) => {
        const text = item.textContent;
        item.textContent = '';
        
        setTimeout(() => {
            typeEffect(item, text, 0);
        }, index * 1000);
    });
});

function animateGrid() {
    const gridOverlay = document.querySelector('.grid-overlay');
    let gridSize = 50;
    let direction = 1;
    
    setInterval(() => {
        if (gridSize >= 60) direction = -1;
        if (gridSize <= 40) direction = 1;
        
        gridSize += direction;
        
        gridOverlay.style.backgroundSize = `${gridSize}px ${gridSize}px`;
    }, 100);
    
    // Add pulse to grid highlight
    setInterval(() => {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        
        const highlight = document.createElement('div');
        highlight.classList.add('grid-highlight');
        highlight.style.position = 'absolute';
        highlight.style.left = `${randomX}px`;
        highlight.style.top = `${randomY}px`;
        highlight.style.width = '100px';
        highlight.style.height = '100px';
        highlight.style.background = 'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, rgba(0, 229, 255, 0) 70%)';
        highlight.style.borderRadius = '50%';
        highlight.style.pointerEvents = 'none';
        highlight.style.zIndex = '-1';
        
        document.body.appendChild(highlight);
        
        setTimeout(() => {
            highlight.remove();
        }, 2000);
    }, 3000);
}

function typeEffect(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => {
            typeEffect(element, text, index + 1);
        }, 30);
    }
}

// Add animation classes to features and progress steps on scroll
const animateOnScroll = () => {
    const features = document.querySelectorAll('.feature');
    const progressSteps = document.querySelectorAll('.progress-step');
    const socialCards = document.querySelectorAll('.social-card');
    
    const triggerBottom = window.innerHeight * 0.8;
    
    features.forEach((feature, index) => {
        const featureTop = feature.getBoundingClientRect().top;
        
        if (featureTop < triggerBottom) {
            setTimeout(() => {
                feature.classList.add('active');
            }, index * 200);
        }
    });
    
    progressSteps.forEach((step, index) => {
        const stepTop = step.getBoundingClientRect().top;
        
        if (stepTop < triggerBottom) {
            setTimeout(() => {
                step.classList.add('active');
            }, index * 300);
        }
    });
    
    socialCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerBottom) {
            setTimeout(() => {
                card.classList.add('active');
            }, index * 200);
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Hologram effect animation
const hologramEffect = () => {
    const hologram = document.querySelector('.hologram-effect');
    
    if (hologram) {
        let scale = 0.95;
        let growing = true;
        
        setInterval(() => {
            if (growing) {
                scale += 0.002;
                if (scale >= 1) growing = false;
            } else {
                scale -= 0.002;
                if (scale <= 0.95) growing = true;
            }
            
            hologram.style.transform = `scale(${scale})`;
        }, 50);
    }
};

hologramEffect();
