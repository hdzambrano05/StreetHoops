document.addEventListener("DOMContentLoaded", function () {
    // Gestión de la navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const toggleIcon = document.querySelector('.toggle-icon');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        toggleIcon.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            toggleIcon.classList.remove('open');
        });
    });

    // Gestión del Modal de Noticias (único)
    const modal = document.getElementById('noticiaModal');
    const closeBtn = modal ? modal.querySelector('.close-modal') : null;
    const modalBtn = document.querySelector('.modal-btn');

    // Mostrar el modal después de un pequeño delay
    if (modal) {
        setTimeout(() => {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 50);
        }, 1000);

        // Cerrar el modal al hacer clic en la X
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => { modal.style.display = 'none'; }, 300);
            });
        }

        // Cerrar el modal al hacer clic fuera de él
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => { modal.style.display = 'none'; }, 300);
            }
        });

        // Cerrar el modal y desplazarse al formulario
        if (modalBtn) {
            modalBtn.addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => { modal.style.display = 'none'; }, 300);
            });
        }
    }

    // Gestión del Formulario Multi-paso
    const form = document.getElementById('whatsapp-form');
    const pages = document.querySelectorAll('.form-page');
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const inputs = form.querySelectorAll('input, select');

    // Función para actualizar el resumen
    function updateSummary() {
        document.getElementById('summary-nombre').textContent = document.getElementById('nombre').value;
        document.getElementById('summary-equipo').textContent = document.getElementById('equipo').value;
        document.getElementById('summary-jugadores').textContent = document.getElementById('jugadores').value + ' jugadores';
        document.getElementById('summary-telefono').textContent = document.getElementById('telefono').value;
    }

    // Función para validar los campos de una página
    function validatePage(pageNumber) {
        const currentPage = document.querySelector(`.form-page[data-page="${pageNumber}"]`);
        const pageInputs = currentPage.querySelectorAll('input, select');
        let isValid = true;

        pageInputs.forEach(input => {
            if (input.required && !input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    // Manejar botones siguiente
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentPage = parseInt(button.getAttribute('data-next')) - 1;
            const nextPage = parseInt(button.getAttribute('data-next'));

            if (validatePage(currentPage)) {
                // Actualizar progreso
                steps.forEach((step, index) => {
                    if (index < nextPage) {
                        step.classList.add('active');
                    }
                });

                // Cambiar página con animación
                pages.forEach(page => {
                    page.classList.remove('active');
                    if (parseInt(page.getAttribute('data-page')) === nextPage) {
                        page.classList.add('active');
                    }
                });

                // Actualizar resumen si vamos a la última página
                if (nextPage === 3) {
                    updateSummary();
                }
            }
        });
    });

    // Manejar botones anterior
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const prevPage = parseInt(button.getAttribute('data-prev'));

            // Actualizar progreso
            steps.forEach((step, index) => {
                if (index >= prevPage) {
                    step.classList.remove('active');
                }
            });

            // Cambiar página con animación
            pages.forEach(page => {
                page.classList.remove('active');
                if (parseInt(page.getAttribute('data-page')) === prevPage) {
                    page.classList.add('active');
                }
            });
        });
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const equipo = document.getElementById('equipo').value;
        const jugadores = document.getElementById('jugadores').value;
        const telefono = document.getElementById('telefono').value;

        // Mensaje formateado para WhatsApp con emojis
        const mensaje = `¡Hola! Me quiero inscribir al torneo StreetHoops 3x3 🏀\n\n*Datos del equipo:*\n▫️ Nombre: ${nombre}\n▫️ Equipo: ${equipo}\n▫️ Jugadores: ${jugadores}\n▫️ WhatsApp: ${telefono}`;

        // Codificar el mensaje para la URL
        const mensajeCodificado = encodeURIComponent(mensaje);

        // Abrir WhatsApp en nueva pestaña
        window.open(`https://wa.me/573236388183?text=${mensajeCodificado}`, '_blank');
    });

    // Animación de campos de entrada
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Si el input ya tiene valor
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});

// Animaciones de scroll
document.addEventListener("scroll", () => {
    const reveals = document.querySelectorAll(".scroll-reveal");
    const windowHeight = window.innerHeight;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveal.classList.add("visible");
        }
    });
});
