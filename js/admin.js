document.addEventListener("DOMContentLoaded", () => {
    const sesion = exigirAdministrador();
    const contenido = document.querySelector("#contenidoAdmin");

    if (!sesion) {
        contenido.innerHTML = `
            <section class="bloque-nexo">
                <div class="alert alert-danger mb-0">
                    Esta sección es exclusiva para el administrador.
                    <a href="index.html" class="alert-link">Volver al inicio</a>.
                </div>
            </section>`;
        return;
    }

    const formulario = document.querySelector("#formCarta");
    const tabla = document.querySelector("#tablaCartas");
    const mensaje = document.querySelector("#mensajeAdmin");
    const listaCategorias = document.querySelector("#listaCategorias");

    function actualizarSugerenciasCategoria() {
        listaCategorias.innerHTML = "";
        obtenerCategorias().forEach(categoria => {
            const opcion = document.createElement("option");
            opcion.value = categoria;
            listaCategorias.appendChild(opcion);
        });
    }

    function limpiarFormulario() {
        formulario.reset();
        document.querySelector("#idCarta").value = "";
        document.querySelector("#activo").checked = true;
        document.querySelector("#destacado").checked = false;
        document.querySelector("#tituloFormulario").textContent = "Agregar carta";
    }

    function mostrarMensaje(texto, tipo = "exito") {
        mensaje.textContent = texto;
        mensaje.className = `alerta-local visible ${tipo}`;
    }

    function listarCartas() {
        const cartas = obtenerCartas();
        tabla.innerHTML = "";

        cartas.forEach(carta => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${carta.codigo}</td>
                <td>${carta.nombre}</td>
                <td>${carta.categoria}</td>
                <td>$${carta.precio.toLocaleString("es-CL")}</td>
                <td>${carta.stock}</td>
                <td>${carta.activo ? "Activo" : "Inactivo"}</td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-primary me-1" data-editar="${carta.id}">Editar</button>
                    <button type="button" class="btn btn-sm btn-outline-danger" data-eliminar="${carta.id}">Eliminar</button>
                </td>`;
            tabla.appendChild(fila);
        });
    }

    function validarDatos(datos, idActual) {
        const errores = [];
        const cartas = obtenerCartas();

        if (!datos.codigo) errores.push("El código es obligatorio.");
        if (!datos.nombre) errores.push("El nombre es obligatorio.");
        if (!datos.categoria) errores.push("La categoría es obligatoria.");
        if (!datos.descripcion) errores.push("La descripción es obligatoria.");
        if (!Number.isFinite(datos.precio) || datos.precio < 0) errores.push("El precio debe ser un número igual o mayor que 0.");
        if (!Number.isInteger(datos.stock) || datos.stock < 0) errores.push("El stock debe ser un entero igual o mayor que 0.");

        const duplicado = cartas.some(carta =>
            carta.codigo.toLowerCase() === datos.codigo.toLowerCase() &&
            Number(carta.id) !== Number(idActual)
        );

        if (duplicado) errores.push("El código ya existe. Usa un código único.");

        return errores;
    }

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const sesionActual = obtenerSesion();
        if (!sesionActual || sesionActual.rol !== "admin") {
            mostrarMensaje("La sesión no tiene permisos de administrador.", "error");
            return;
        }

        const idActual = document.querySelector("#idCarta").value;
        const datos = {
            codigo: document.querySelector("#codigo").value.trim(),
            nombre: document.querySelector("#nombreCarta").value.trim(),
            categoria: document.querySelector("#categoriaCarta").value.trim(),
            descripcion: document.querySelector("#descripcion").value.trim(),
            precio: Number(document.querySelector("#precio").value),
            stock: Number(document.querySelector("#stock").value),
            imagen: document.querySelector("#imagen").value.trim() || "img/carta-generica.svg",
            activo: document.querySelector("#activo").checked,
            destacado: document.querySelector("#destacado").checked
        };

        const errores = validarDatos(datos, idActual);
        if (errores.length) {
            mostrarMensaje(errores.join(" "), "error");
            return;
        }

        let cartas = obtenerCartas();

        if (idActual) {
            cartas = cartas.map(carta =>
                Number(carta.id) === Number(idActual)
                    ? { ...carta, ...datos }
                    : carta
            );
            mostrarMensaje("Carta actualizada correctamente.");
        } else {
            const nuevoId = cartas.length
                ? Math.max(...cartas.map(carta => Number(carta.id))) + 1
                : 1;
            cartas.push({ id: nuevoId, ...datos });
            mostrarMensaje("Carta agregada correctamente.");
        }

        guardarCartas(cartas);
        limpiarFormulario();
        actualizarSugerenciasCategoria();
        listarCartas();
    });

    tabla.addEventListener("click", evento => {
        const idEditar = evento.target.dataset.editar;
        const idEliminar = evento.target.dataset.eliminar;

        if (idEditar) {
            const carta = buscarCartaPorId(idEditar);
            document.querySelector("#idCarta").value = carta.id;
            document.querySelector("#codigo").value = carta.codigo;
            document.querySelector("#nombreCarta").value = carta.nombre;
            document.querySelector("#categoriaCarta").value = carta.categoria;
            document.querySelector("#descripcion").value = carta.descripcion;
            document.querySelector("#precio").value = carta.precio;
            document.querySelector("#stock").value = carta.stock;
            document.querySelector("#imagen").value = carta.imagen;
            document.querySelector("#activo").checked = carta.activo;
            document.querySelector("#destacado").checked = carta.destacado;
            document.querySelector("#tituloFormulario").textContent = "Editar carta";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        if (idEliminar) {
            const sesionActual = obtenerSesion();
            if (!sesionActual || sesionActual.rol !== "admin") {
                mostrarMensaje("La sesión no tiene permisos para eliminar.", "error");
                return;
            }

            if (confirm("¿Seguro que deseas eliminar esta carta?")) {
                const cartas = obtenerCartas().filter(carta => Number(carta.id) !== Number(idEliminar));
                guardarCartas(cartas);
                listarCartas();
                mostrarMensaje("Carta eliminada correctamente.");
            }
        }
    });

    document.querySelector("#btnCancelarEdicion").addEventListener("click", limpiarFormulario);

    document.querySelector("#btnReiniciarDemo").addEventListener("click", () => {
        if (confirm("¿Restablecer las cartas iniciales de demostración?")) {
            reiniciarInventario();
            limpiarFormulario();
            actualizarSugerenciasCategoria();
            listarCartas();
            mostrarMensaje("Inventario de demostración restablecido.");
        }
    });

    actualizarSugerenciasCategoria();
    listarCartas();
});
