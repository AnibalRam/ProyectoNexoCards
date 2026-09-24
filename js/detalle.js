document.addEventListener("DOMContentLoaded", () => {

    protegerPagina();

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    const contenedor = document.querySelector("#detalleCarta");

    function mostrarDetalle() {

        const carta = buscarCartaPorId(id);

        if (!carta || !carta.activo) {

            contenedor.innerHTML = `
                <div class="alert alert-warning">
                    No fue posible encontrar la carta seleccionada.
                    <a href="catalogo.html" class="alert-link">
                        Volver al catálogo
                    </a>.
                </div>
            `;

            return;
        }

        const stockTexto = carta.stock > 0
            ? `<span class="disponible">Disponible (${carta.stock})</span>`
            : `<span class="sin-stock">Sin stock</span>`;

        const carrito = obtenerCarrito();

        const itemCarrito = carrito.find(
            item => Number(item.idCarta) === Number(carta.id)
        );

        const cantidadEnCarrito =
            itemCarrito ? itemCarrito.cantidad : 0;

        contenedor.innerHTML = `
            <div class="row g-4 align-items-start">

                <div class="col-12 col-md-5">
                    <img
                        class="imagen-detalle"
                        src="${carta.imagen}"
                        alt="${carta.nombre}"
                    >
                </div>

                <article class="col-12 col-md-7">

                    <span class="etiqueta">
                        ${carta.categoria}
                    </span>

                    <h1 class="mt-3">
                        ${carta.nombre}
                    </h1>

                    <p>
                        <strong>Código:</strong>
                        ${carta.codigo}
                    </p>

                    <p>
                        ${carta.descripcion}
                    </p>

                    <p class="precio">
                        $${carta.precio.toLocaleString("es-CL")}
                    </p>

                    <p>
                        <strong>Disponibilidad:</strong>
                        ${stockTexto}
                    </p>

                    ${
                        cantidadEnCarrito > 0
                            ? `
                                <p>En carrito:</p>

                                <div class="control-cantidad">

                                    <button
                                        type="button"
                                        class="btn-disminuir"
                                    >
                                        −
                                    </button>

                                    <span>
                                        ${cantidadEnCarrito}
                                    </span>

                                    <button
                                        type="button"
                                        class="btn-aumentar"
                                        ${cantidadEnCarrito >= carta.stock ? "disabled" : ""}
                                    >
                                        +
                                    </button>

                                </div>
                            `
                            : `
                                <button
                                    type="button"
                                    class="btn btn-nexo btn-agregar-carrito"
                                    ${carta.stock <= 0 ? "disabled" : ""}
                                >
                                    ${carta.stock <= 0 ? "Sin stock" : "Agregar al carrito"}
                                </button>
                            `
                    }

                    ${
                        carta.stock > 0 &&
                        cantidadEnCarrito >= carta.stock
                            ? `
                                <p class="sin-stock">
                                    Stock insuficiente: alcanzaste el máximo disponible.
                                </p>
                            `
                            : ""
                    }

                    <a
                        class="btn btn-nexo"
                        href="catalogo.html"
                    >
                        Volver al catálogo
                    </a>

                </article>

            </div>
        `;

        const botonAgregar =
            contenedor.querySelector(".btn-agregar-carrito");

        const botonAumentar =
            contenedor.querySelector(".btn-aumentar");

        const botonDisminuir =
            contenedor.querySelector(".btn-disminuir");


        if (botonAgregar) {

            botonAgregar.addEventListener("click", () => {

                agregarAlCarrito(carta.id);

                mostrarDetalle();

                actualizarContadorCarrito();

            });

        }


        if (botonAumentar) {

            botonAumentar.addEventListener("click", () => {

                aumentarCantidad(carta.id);

                mostrarDetalle();

                actualizarContadorCarrito();

            });

        }


        if (botonDisminuir) {

            botonDisminuir.addEventListener("click", () => {

                disminuirCantidad(carta.id);

                mostrarDetalle();

                actualizarContadorCarrito();

            });

        }

    }

    mostrarDetalle();

});