// Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Observe individual elements for staggered animations
        document.querySelectorAll('.about-text, .about-image, .skill-card, .contact-intro, .contact-form').forEach(el => {
            observer.observe(el);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission with animation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Simulate form submission
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
            
            setTimeout(() => {
                submitBtn.textContent = 'Nachricht gesendet!';
                submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #66BB6A)';
                
                // Reset form
                this.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #21573d, #297559)';
                }, 2000);
            }, 1500);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - scrolled / hero.offsetHeight;
            }
        });

        // Typing effect for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Add cursor blink animation to hero title
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-title');
            const originalText = heroTitle.textContent;
            
            // Add typing cursor
            heroTitle.style.borderRight = '3px solid #4CAF50';
            heroTitle.style.animation = 'blink 1s infinite';
            
            // Add blink keyframes if not exists
            if (!document.querySelector('#blink-style')) {
                const style = document.createElement('style');
                style.id = 'blink-style';
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { border-color: #4CAF50; }
                        51%, 100% { border-color: transparent; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Remove cursor after animation
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }, 3000);
        });

        // Add floating particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(76, 175, 80, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${5 + Math.random() * 5}s linear forwards;
            `;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 10000);
        }

        // Add float up animation
        if (!document.querySelector('#float-style')) {
            const style = document.createElement('style');
            style.id = 'float-style';
            style.textContent = `
                @keyframes floatUp {
                    to {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Create particles periodically
        setInterval(createParticle, 2000);

        // Add hover sound effect simulation (visual feedback)
        document.querySelectorAll('.skill-card, .cta-button, .submit-btn').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.filter = 'brightness(1.1)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.filter = 'brightness(1)';
            });
        });

        // Progress bar animation when skills section is visible
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.style.getPropertyValue('--progress');
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skills').forEach(section => {
            skillsObserver.observe(section);
        });

        // Add tilt effect to skill cards
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });

        // Dynamic background color change based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const hue = 120 + (scrollPercent * 60); // From green to blue-green
            
            document.body.style.background = `linear-gradient(45deg, 
                hsl(${hue}, 45%, 15%) 0%, 
                hsl(${hue + 10}, 40%, 18%) 38%, 
                hsl(${hue}, 45%, 15%) 100%)`;
        });

        // Easter egg: Konami code
        let konamiCode = [];
        const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
        
        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            konamiCode = konamiCode.slice(-10);
            
            if (konamiCode.join(',') === konami.join(',')) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s linear infinite';
                
                // Add rainbow animation
                if (!document.querySelector('#rainbow-style')) {
                    const style = document.createElement('style');
                    style.id = 'rainbow-style';
                    style.textContent = `
                        @keyframes rainbow {
                            0% { filter: hue-rotate(0deg); }
                            100% { filter: hue-rotate(360deg); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(() => {
                    document.body.style.animation = 'none';
                }, 5000);
            }
        });