document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if(mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Chiude il menu quando si clicca su un link
        document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    function smoothScroll(targetId) {
        if(targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if(targetId.startsWith('#')) {
                e.preventDefault();
                smoothScroll(targetId);
            }
        });
    });

    const logoLink = document.querySelector('.logo-link');
    if(logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#');
        });
    }
    
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if(targetId.startsWith('#')) {
                e.preventDefault();
                smoothScroll(targetId);
            }
        });
    });
});