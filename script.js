// Particle system for background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Styling
        particle.style.position = 'absolute';
        particle.style.background = 'rgba(0, 243, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(0, 243, 255, 0.8)';

        // Random animation
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;

        particlesContainer.appendChild(particle);
    }
}

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Update timestamp
function updateTimestamp() {
    const timestampElement = document.getElementById('timestamp');
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    timestampElement.textContent = formatted;
}

// Menu navigation
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            menuItems.forEach(mi => mi.classList.remove('active'));

            // Add active class to clicked item
            item.classList.add('active');

            // Get section name
            const section = item.getAttribute('data-section');
            console.log(`Navigating to: ${section}`);

            // Future: Add section switching logic here
        });
    });
}

// Button interactions
function initializeButtons() {
    const buttons = document.querySelectorAll('.cta-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.querySelector('.button-text').textContent;
            console.log(`Button clicked: ${buttonText}`);

            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            // Future: Add navigation logic here
            if (buttonText === 'DEPLOY LOGGER') {
                console.log('Opening troops logger...');
            } else if (buttonText === 'VIEW DATABASE') {
                console.log('Opening database view...');
            }
        });
    });
}

// Stat counter animation
function animateStats() {
    const statValues = document.querySelectorAll('.stat-value');

    statValues.forEach(stat => {
        const target = parseInt(stat.textContent) || 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, duration / steps);
    });
}

// Random coordinate generator (for demo)
function updateCoordinates() {
    const coordsElement = document.getElementById('coords');
    const lat = (Math.random() * 180 - 90).toFixed(4);
    const lon = (Math.random() * 360 - 180).toFixed(4);
    const latDir = lat >= 0 ? 'N' : 'S';
    const lonDir = lon >= 0 ? 'E' : 'W';
    coordsElement.textContent = `${Math.abs(lat)}° ${latDir}, ${Math.abs(lon)}° ${lonDir}`;
}

// Hologram interaction
function initializeHologram() {
    const hologram = document.querySelector('.hologram');

    hologram.addEventListener('mouseenter', () => {
        const rings = document.querySelectorAll('.hologram-ring');
        rings.forEach(ring => {
            ring.style.borderColor = '#ff00ff';
            ring.style.boxShadow = '0 0 40px #ff00ff';
        });
    });

    hologram.addEventListener('mouseleave', () => {
        const rings = document.querySelectorAll('.hologram-ring');
        rings.forEach(ring => {
            ring.style.borderColor = '#00f3ff';
            ring.style.boxShadow = '';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Whiteout Survival Command Center - Initializing...');

    createParticles();
    updateTimestamp();
    initializeMenu();
    initializeButtons();
    initializeHologram();

    // Update timestamp every second
    setInterval(updateTimestamp, 1000);

    // Update coordinates every 5 seconds (for demo)
    setInterval(updateCoordinates, 5000);

    console.log('System online.');
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + L for logger
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        console.log('Keyboard shortcut: Open Logger');
    }

    // Ctrl/Cmd + D for database
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        console.log('Keyboard shortcut: Open Database');
    }
});
