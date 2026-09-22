function mostrarError(input, mensaje) {
    input.classList.add("campo-error");
    const error = document.querySelector(`#error-${input.id}`);
    if (error) {
        error.textContent = mensaje;
    }
}

function limpiarError(input) {
    input.classList.remove("campo-error");
    const error = document.querySelector(`#error-${input.id}`);
    if (error) {
        error.textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();

    const formulario = document.querySelector("#formContacto");
    const inputs = [...formulario.querySelectorAll("input, textarea")];
    const mensajeGeneral = document.querySelector("#mensajeContacto");

    inputs.forEach(input => {
        input.addEventListener("input", () => limpiarError(input));
    });

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const nombre = document.querySelector("#nombre");
        const correo = document.querySelector("#correo");
        const asunto = document.querySelector("#asunto");
        const consulta = document.querySelector("#consulta");
        let valido = true;

        inputs.forEach(limpiarError);
        mensajeGeneral.className = "alerta-local";
        mensajeGeneral.textContent = "";

        if (nombre.value.trim().length < 3) {
            mostrarError(nombre, "Ingresa un nombre de al menos 3 caracteres.");
            valido = false;
        }

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoValido.test(correo.value.trim())) {
            mostrarError(correo, "Ingresa un correo válido, por ejemplo nombre@correo.cl.");
            valido = false;
        }

        if (asunto.value.trim().length < 4) {
            mostrarError(asunto, "El asunto debe tener al menos 4 caracteres.");
            valido = false;
        }

        if (consulta.value.trim().length < 10) {
            mostrarError(consulta, "El mensaje debe tener al menos 10 caracteres.");
            valido = false;
        }

        if (!valido) {
            mensajeGeneral.className = "alerta-local visible error";
            mensajeGeneral.textContent = "Revisa los campos destacados antes de continuar.";
            return;
        }

        mensajeGeneral.className = "alerta-local visible exito";
        mensajeGeneral.textContent = "Consulta validada correctamente. Esta demostración no envía datos a un servidor.";
        formulario.reset();
    });
});
