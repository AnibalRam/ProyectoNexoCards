document.addEventListener("DOMContentLoaded", () => {

    protegerPagina();

    const lista = document.querySelector("#listaCartas");
    const buscar = document.querySelector("#buscar");
    const categoria = document.querySelector("#categoria");

    obtenerCategorias().forEach(nombreCategoria => {

        const opcion = document.createElement("option");

        opcion.value = nombreCategoria;
        opcion.textContent = nombreCategoria;

        categoria.appendChild(opcion);

    });

    function mostrarCartas() {

        actualizarContadorCarrito();

        const texto = buscar.value.trim().toLowerCase();
        const categoriaSeleccionada = categoria.value;

        const cartas = obtenerCartas().filter(carta => {

            const coincideTexto =
                carta.nombre.toLowerCase().includes(texto) ||
                carta.codigo.toLowerCase().includes(texto);

            const coincideCategoria =
                categoriaSeleccionada === "Todas" ||
                carta.categoria === categoriaSeleccionada;

            return carta.activo && coincideTexto && coincideCategoria;

        });

        lista.innerHTML = "";

        document.querySelector("#cantidadResultados").textContent =
            `${cartas.length} resultado(s)`;

        if (!cartas.length) {

            lista.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning">
                        No se encontraron cartas con esos criterios.
                    </div>
                </div>
            `;

            return;
        }

        cartas.forEach(carta => {

            const columna = document.createElement("div");
            columna.className = "col-12 col-sm-6 col-lg-4";

            const stockTexto = carta.stock > 0
                ? `<span class="disponible">Disponible (${carta.stock})</span>`
                : `<span class="sin-stock">Sin stock</span>`;

            const carrito = obtenerCarrito();

            const itemCarrito = carrito.find(
                item => Number(item.idCarta) === Number(carta.id)
            );

            const cantidadEnCarrito =
                itemCarrito ? itemCarrito.cantidad : 0;

            columna.innerHTML = `
                <article class="tarjeta-carta">

                    <img src="${carta.imagen}" alt="${carta.nombre}">

                    <div class="contenido">

                        <span class="etiqueta">
                            ${carta.categoria}
                        </span>

                        <h3 class="h5 mt-3">
                            ${carta.nombre}
                        </h3>

                        <p class="text-secondary mb-1">
                            ${carta.codigo}
                        </p>

                        <p class="precio mb-1">
                            $${carta.precio.toLocaleString("es-CL")}
                        </p>

                        <p>
                            ${stockTexto}
                        </p>

                        ${
                            cantidadEnCarrito > 0
                                ? `
                                    <p class="mb-1">
                                        En carrito:
                                    </p>

                                    <div class="control-cantidad">

                                        <button
                                            type="button"
                                            class="btn-disminuir"
                                            data-id="${carta.id}"

                                        >
                                            −
                                        </button>

                                        <span>
                                            ${cantidadEnCarrito}
                                        </span>

                                        <button
                                            type="button"
                                            class="btn-aumentar"
                                            data-id="${carta.id}"
                                            ${cantidadEnCarrito >= carta.stock ? "disabled" : ""}
                                        >
                                            +
                                        </button>

                                    </div>
                                `
                                : ""
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
                            href="detalle.html?id=${carta.id}"
                        >
                            Ver detalle
                        </a>

                        ${
                            cantidadEnCarrito === 0
                                ? `
                                    <button
                                        class="btn btn-nexo btn-agregar-carrito"
                                        type="button"
                                        data-id="${carta.id}"
                                        ${carta.stock <= 0 ? "disabled" : ""}
                                    >
                                        ${
                                            carta.stock <= 0
                                                ? "Sin stock"
                                                : "Agregar al carrito"
                                        }
                                    </button>
                                `
                                : ""
                        }

                    </div>

                </article>
            `;

            lista.appendChild(columna);

            const botonAgregar =
                columna.querySelector(".btn-agregar-carrito");

            const botonAumentar =
                columna.querySelector(".btn-aumentar");

            const botonDisminuir =
                columna.querySelector(".btn-disminuir");


            if (botonAgregar) {

                botonAgregar.addEventListener("click", () => {

                    agregarAlCarrito(carta.id);

                    mostrarCartas();

                });

            }


            if (botonAumentar) {

                botonAumentar.addEventListener("click", () => {

                    aumentarCantidad(carta.id);

                    mostrarCartas();

                });

            }


            if (botonDisminuir) {

                botonDisminuir.addEventListener("click", () => {

                    disminuirCantidad(carta.id);

                    mostrarCartas();

                });

            }

        });

    }


    buscar.addEventListener("input", mostrarCartas);

    categoria.addEventListener("change", mostrarCartas);

    mostrarCartas();

});