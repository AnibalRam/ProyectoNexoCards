const MAX_INTENTOS = 5;
const BLOQUEO_MS = 60 * 1000;

function obtenerEstadoLogin() {
    return JSON.parse(localStorage.getItem("nexoLoginEstado")) || {
        intentos: 0,
        bloqueadoHasta: 0
    };
}

function guardarEstadoLogin(estado) {
    localStorage.setItem("nexoLoginEstado", JSON.stringify(estado));
}

function mostrarMensajeLogin(texto, tipo = "error") {
    const mensaje = document.querySelector("#mensajeLogin");
    mensaje.textContent = texto;
    mensaje.className = `alerta-local visible ${tipo}`;
}

function actualizarBloqueo() {
    const estado = obtenerEstadoLogin();
    const boton = document.querySelector("#btnIngresar");
    const ahora = Date.now();

    if (estado.bloqueadoHasta > ahora) {
        const segundos = Math.ceil((estado.bloqueadoHasta - ahora) / 1000);
        boton.disabled = true;
        mostrarMensajeLogin(`Ingreso bloqueado temporalmente. Intenta nuevamente en ${segundos} segundos.`);
        return true;
    }

    if (estado.bloqueadoHasta && estado.bloqueadoHasta <= ahora) {
        guardarEstadoLogin({ intentos: 0, bloqueadoHasta: 0 });
        boton.disabled = false;
        const mensaje = document.querySelector("#mensajeLogin");
        mensaje.className = "alerta-local";
        mensaje.textContent = "";
    }

    return false;
}

document.addEventListener("DOMContentLoaded", () => {
    if (obtenerSesion()) {
        window.location.href = "index.html";
        return;
    }

    actualizarBloqueo();
    setInterval(actualizarBloqueo, 1000);

    const formulario = document.querySelector("#formLogin");

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        if (actualizarBloqueo()) {
            return;
        }

        const correo = document.querySelector("#correo").value.trim().toLowerCase();
        const clave = document.querySelector("#clave").value.trim();

        if (!correo || !clave) {
            mostrarMensajeLogin("Completa correo y contraseña.");
            return;
        }

        const cuenta = CUENTAS_DEMO.find(usuario =>
            usuario.correo.toLowerCase() === correo && usuario.clave === clave
        );

        if (cuenta && !cuenta.activo) {
            mostrarMensajeLogin("La cuenta de demostración está inactiva.");
            return;
        }

        if (!cuenta) {
            const estado = obtenerEstadoLogin();
            estado.intentos += 1;

            if (estado.intentos >= MAX_INTENTOS) {
                estado.intentos = 0;
                estado.bloqueadoHasta = Date.now() + BLOQUEO_MS;
                guardarEstadoLogin(estado);
                actualizarBloqueo();
                return;
            }

            guardarEstadoLogin(estado);
            mostrarMensajeLogin(`Credenciales incorrectas. Intento ${estado.intentos} de ${MAX_INTENTOS}.`);
            return;
        }

        guardarEstadoLogin({ intentos: 0, bloqueadoHasta: 0 });
        iniciarSesion(cuenta);
        window.location.href = "index.html";
    });
});
