document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("whatsapp-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const equipo = document.getElementById("equipo").value;
        const jugadores = document.getElementById("jugadores").value;
        const telefono = document.getElementById("telefono").value;

        const mensaje = `Hola! Quiero inscribir un equipo en el torneo 3x3:%0A%0A👤 Nombre: ${nombre}%0A🏀 Equipo: ${equipo}%0A👥 Jugadores: ${jugadores}%0A📱 WhatsApp: ${telefono}`;

        const numeroDestino = "573236388183"; // Reemplaza con tu número real (con código de país, sin espacios)

        const url = `https://wa.me/${numeroDestino}?text=${mensaje}`;

        // Crea un enlace dinámico y lo abre en una nueva pestaña
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.click();

    });

});

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
