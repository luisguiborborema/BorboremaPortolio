document.addEventListener('DOMContentLoaded', function() {
    // --- Código do Carrossel ---
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-prev-btn');
    const nextButton = document.querySelector('.carousel-next-btn');
    let currentIndex = 0;

    // Apenas inicializa o carrossel se os elementos existirem na página (útil para páginas diferentes do index.html)
    if (carouselContainer && carouselSlides.length > 0 && prevButton && nextButton) {
        function goToSlide(index) {
            if (index < 0) {
                currentIndex = carouselSlides.length - 1;
            } else if (index >= carouselSlides.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const translateValue = -currentIndex * 100 + '%';
            carouselContainer.style.transform = 'translateX(' + translateValue + ')';
        }

        prevButton.addEventListener('click', function() {
            goToSlide(currentIndex - 1);
        });

        nextButton.addEventListener('click', function() {
            goToSlide(currentIndex + 1);
        });

        // Para exibir a primeira imagem ao carregar a página
        goToSlide(0);
    }


    // --- Código do Menu Hambúrguer ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) { // Apenas executa se os elementos existirem
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link (para mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    // --- Marcar Link da Navbar Ativo --- // <--- MOVIDO PARA CÁ
    const allNavLinks = document.querySelectorAll('.nav-links a'); // Renomeado para evitar conflito com 'navLinks' global
    const currentPagePath = window.location.pathname; // Pega o caminho do arquivo atual (ex: /sobremim.html)

    allNavLinks.forEach(link => {
        // Pega o nome do arquivo do href do link (ex: sobremim.html)
        const linkPath = link.getAttribute('href');

        // Compara o caminho do link com o caminho da página atual
        // Ajuste para casos onde o index.html pode ser apenas '/' no servidor
        if (linkPath === 'index.html' && (currentPagePath === '/' || currentPagePath.endsWith('/index.html'))) {
            link.classList.add('active');
        } else if (linkPath !== 'index.html' && currentPagePath.includes(linkPath)) {
            link.classList.add('active');
        }
    });

    // --- Código do Efeito de Digitação (Typing Effect) ---
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) { // Apenas executa se o elemento existir na página
        const textToType = ["Desenvolvedor Full-Stack", "Especialista em IA", "Criador de Soluções", "Desenvolvedor Web"]; // Ajuste seus textos
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBetweenTexts = 2000;

        function type() {
            const currentText = textToType[textIndex];
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = delayBetweenTexts;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textToType.length;
                speed = typingSpeed;
            }

            setTimeout(type, speed);
        }
        type();
    }


    // --- Código do ScrollReveal.js ---
    // Apenas inicializa se o objeto ScrollReveal estiver disponível (garantido pela ordem de script no HTML)
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            distance: '80px',
            duration: 1200,
            easing: 'ease-in-out',
            delay: 150,
            reset: false
        });

        // Revelar elementos específicos:
        ScrollReveal().reveal('.hero-text-content', { origin: 'left' });
        ScrollReveal().reveal('.hero-image-container', { origin: 'right' });
        ScrollReveal().reveal('.section-title', { origin: 'top' });
        ScrollReveal().reveal('.career-intro', { origin: 'top', delay: 400 });

        // Itens em grid/lista (com atraso sequencial)
        ScrollReveal().reveal('.about-content', { origin: 'bottom', interval: 200 });
        ScrollReveal().reveal('.education-item', { origin: 'bottom', interval: 150 });
        ScrollReveal().reveal('.language-item', { origin: 'bottom', interval: 150 });
        ScrollReveal().reveal('.tech-tag', { origin: 'bottom', interval: 50, scale: 0.8 });
        ScrollReveal().reveal('.value-item', { origin: 'bottom', interval: 200 });
        ScrollReveal().reveal('.timeline-item', { origin: 'left', interval: 250 });
        ScrollReveal().reveal('.skill-item', { origin: 'bottom', interval: 200 });
        ScrollReveal().reveal('.portfolio-item', { origin: 'bottom', interval: 200 });

        // Elementos específicos na seção de contato
        ScrollReveal().reveal('.contact-content p', { origin: 'top', delay: 200 });
        ScrollReveal().reveal('.contact-form', { origin: 'bottom', delay: 400 });
        ScrollReveal().reveal('.social-links', { origin: 'bottom', delay: 600 });
    }
}); // Fechamento do ÚNICO document.addEventListener
