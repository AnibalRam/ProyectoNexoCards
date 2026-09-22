const DURACION_SESION_MS = 30 * 60 * 1000;

function obtenerSesion() {
    const sesion = JSON.parse(sessionStorage.getItem("nexoSesion"));

    if (!sesion) {
        return null;
    }

    if (Date.now() > sesion.expira) {
        sessionStorage.removeItem("nexoSesion");
        return null;
    }

    return sesion;
}

function iniciarSesion(cuenta) {
    const sesion = {
        nombre: cuenta.nombre,
        correo: cuenta.correo,
        rol: cuenta.rol,
        expira: Date.now() + DURACION_SESION_MS
    };

    sessionStorage.setItem("nexoSesion", JSON.stringify(sesion));
}

function cerrarSesion() {
    sessionStorage.removeItem("nexoSesion");
    window.location.href = "login.html";
}

function protegerPagina() {
    const sesion = obtenerSesion();

    if (!sesion) {
        window.location.href = "login.html";
        return null;
    }

    const usuarioActivo = document.querySelector("#usuarioActivo");
    if (usuarioActivo) {
        usuarioActivo.textContent = `${sesion.nombre} · ${sesion.rol}`;
    }

    if (sesion.rol === "admin") {
        document.querySelectorAll(".admin-only").forEach(elemento => {
            elemento.style.display = "block";
        });
    }

    return sesion;
}

function exigirAdministrador() {
    const sesion = protegerPagina();

    if (!sesion || sesion.rol !== "admin") {
        return null;
    }

    return sesion;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".cerrarSesion").forEach(boton => {
        boton.addEventListener("click", evento => {
            evento.preventDefault();
            cerrarSesion();
        });
    });
});
