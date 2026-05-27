document.addEventListener('DOMContentLoaded', () => {
    
    /* 1. Preloader Removal */
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 700); 

    /* 2. Dark/Light Theme State Management */
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    rootElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = rootElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        rootElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); 
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    /* 3. Dynamic Typing Effect */
    const typingText = document.querySelector('.typing-text');
    const phrases = ["Machine Learning.", "Web Development.", "Artificial Intelligence."]; 
    let phraseIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, letterIndex + 1);
            letterIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && letterIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // টাইপিং ইফেক্ট শুরু করার আগে একটু সময় নেওয়া
    setTimeout(type, 2000); 

    /* 4. Scroll Reveal API (Modern & Optimized) */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // একবার অ্যানিমেশন হওয়ার পর অবজার্ভ করা বন্ধ করবে
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

});