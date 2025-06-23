document.addEventListener('DOMContentLoaded', () => {
    // Configuración de la animación de entrada
    const animateEntrance = () => {
        const cards = document.querySelectorAll('.fade-in-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });
    };

    // Menú móvil
    const setupMobileMenu = () => {
        const menuButton = document.querySelector('.mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu');
        let isMenuOpen = false;

        if (menuButton) {
            menuButton.addEventListener('click', () => {
                isMenuOpen = !isMenuOpen;
                navMenu.style.display = isMenuOpen ? 'flex' : 'none';
                menuButton.classList.toggle('active');
            });
        }
    };

    // Modo oscuro
    const setupDarkMode = () => {
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const body = document.body;

        // Check for saved dark mode preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '☀️';
            } else {
                localStorage.setItem('darkMode', null);
                darkModeToggle.textContent = '🌙';
            }
        });
    };

    // Efectos de hover en las tarjetas
    const setupCardHoverEffects = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
                card.style.boxShadow = 'var(--card-shadow-hover)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--card-shadow)';
            });
        });
    };

    // Formulario de newsletter
    const setupNewsletterForm = () => {
        const form = document.querySelector('.newsletter-form');
        const input = form?.querySelector('.newsletter-input');
        const subscriberCount = document.querySelector('.subscriber-count');
        let subscribers = 0;

        if (form && input) {
            // Efecto de focus en el input
            input.addEventListener('focus', () => {
                input.style.borderColor = 'var(--accent-blue)';
                input.style.boxShadow = '0 0 0 3px rgba(77, 171, 247, 0.2)';
            });

            input.addEventListener('blur', () => {
                input.style.borderColor = '#e0e0e0';
                input.style.boxShadow = 'none';
            });

            // Manejo del envío del formulario
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = input.value;

                if (email && email.includes('@')) {
                    subscribers++;
                    subscriberCount.textContent = `You'll be subscriber number ${subscribers}`;
                    input.value = '';
                }
            });
        }
    };

    // Estado de carga inicial
    const setupLoadingState = () => {
        const loadingOverlay = document.querySelector('.loading-overlay');
        
        if (loadingOverlay) {
            // Simular tiempo de carga
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    animateEntrance();
                }, 300);
            }, 1000);
        }
    };

    // Inicializar todas las funcionalidades
    setupMobileMenu();
    setupDarkMode();
    setupCardHoverEffects();
    setupNewsletterForm();
    setupLoadingState();

    // Manejar navegación suave
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

    // Inicializar el mapa
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = new google.maps.Map(mapContainer, {
            center: { lat: 53.3498, lng: -6.2603 }, // Dublin, Ireland
            zoom: 12,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#98e2c6" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#a8d4ff" }]
                }
            ],
            disableDefaultUI: true
        });

        // Añadir marcador personalizado
        new google.maps.Marker({
            position: { lat: 53.3498, lng: -6.2603 },
            map: map,
            icon: {
                url: 'avatar.png',
                scaledSize: new google.maps.Size(40, 40)
            }
        });
    }

    // Toggle Lockdown button
    const toggleButton = document.querySelector('.toggle-btn');
    let isLocked = false;

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            isLocked = !isLocked;
            toggleButton.querySelector('span').textContent = isLocked ? '🔓' : '🔒';
            document.body.style.filter = isLocked ? 'grayscale(100%)' : 'none';
        });
    }

    // Efecto hover en los tiles
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tiles.forEach(t => {
                if (t !== tile) {
                    t.style.opacity = '0.7';
                }
            });
        });

        tile.addEventListener('mouseleave', () => {
            tiles.forEach(t => {
                t.style.opacity = '1';
            });
        });
    });

    // Simulación de Spotify "Now Playing"
    const tracks = [
        { name: "I Don't Belong", artist: "Fontaines D.C." },
        { name: "Boys in the Better Land", artist: "Fontaines D.C." },
        { name: "Big", artist: "Fontaines D.C." }
    ];
    
    let currentTrack = 0;
    const spotifyTile = document.querySelector('.spotify-tile');
    
    if (spotifyTile) {
        setInterval(() => {
            const trackName = spotifyTile.querySelector('.track-name');
            const artist = spotifyTile.querySelector('.artist');
            
            currentTrack = (currentTrack + 1) % tracks.length;
            
            if (trackName && artist) {
                trackName.textContent = tracks[currentTrack].name;
                artist.textContent = tracks[currentTrack].artist;
            }
        }, 5000);
    }

    // Efecto de hover en los project tiles
    const projectTiles = document.querySelectorAll('.project-tile');
    projectTiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            tile.style.transform = 'scale(1.02)';
        });

        tile.addEventListener('mouseleave', () => {
            tile.style.transform = '';
        });
    });

    // Initialize map
    function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 53.3498, lng: -6.2603 }, // Dublin coordinates
            zoom: 12,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"color": "#000000"}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"weight": 4}]
                }
            ]
        });

        const marker = new google.maps.Marker({
            position: { lat: 53.3498, lng: -6.2603 },
            map: map,
            title: 'Dublin'
        });
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}); 