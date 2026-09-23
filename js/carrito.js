document.addEventListener("DOMContentLoaded", () => {

    protegerPagina();

    const listaCarrito = document.querySelector("#listaCarrito");
    const totalCarrito = document.querySelector("#totalCarrito");
    const botonFinalizarCompra = document.querySelector("#btnFinalizarCompra");

    function mostrarCarrito() {

        const carrito = obtenerCarrito();

        listaCarrito.innerHTML = "";

        if (!carrito.length) {

            listaCarrito.innerHTML = `
                <div class="alert alert-info">
                    Tu carrito está vacío.
                </div>
            `;

            totalCarrito.textContent = "$0";
            return;
        }

        let total = 0;

        carrito.forEach(item => {

            const carta = buscarCartaPorId(item.idCarta);

            if (!carta) {
                return;
            }

            const subtotal = carta.precio * item.cantidad;

            total += subtotal;

            const elemento = document.createElement("article");

            elemento.className = "item-carrito";

            elemento.innerHTML = `
                <img src="${carta.imagen}" alt="${carta.nombre}">

                <div class="item-carrito-info">
                    <h2>${carta.nombre}</h2>

                    <p>
                        Precio:
                        $${carta.precio.toLocaleString("es-CL")}
                    </p>

                    <div class="control-cantidad">

                        <button
                            type="button"
                            class="btn-disminuir"
                            data-id="${carta.id}">
                            −
                        </button>

                        <span>${item.cantidad}</span>

                        <button
                            type="button"
                            class="btn-aumentar"
                            data-id="${carta.id}"
                            ${item.cantidad >= carta.stock ? "disabled" : ""}>
                            +
                        </button>

                    </div>

                    <p>
                        Stock disponible: ${carta.stock}
                    </p>

                    <p>
                        Subtotal:
                        <strong>
                            $${subtotal.toLocaleString("es-CL")}
                        </strong>
                    </p>
                    <button
                        type="button"
                        class="btn-eliminar"
                        data-id="${carta.id}">
                        Eliminar
                    </button>
                </div>
            `;

            listaCarrito.appendChild(elemento);
            const botonAumentar = elemento.querySelector(".btn-aumentar");
            const botonDisminuir = elemento.querySelector(".btn-disminuir");
            const botonEliminar = elemento.querySelector(".btn-eliminar");

            botonAumentar.addEventListener("click", () => {

                aumentarCantidad(carta.id);

                mostrarCarrito();

            });

            botonDisminuir.addEventListener("click", () => {

                disminuirCantidad(carta.id);

                mostrarCarrito();

            });
            botonEliminar.addEventListener("click", () => {

                eliminarDelCarrito(carta.id);

                mostrarCarrito();

            });
        });

        totalCarrito.textContent =
            `$${total.toLocaleString("es-CL")}`;
    }
    botonFinalizarCompra.addEventListener("click", () => {

        const compraRealizada = finalizarCompra();

        if (compraRealizada) {

            alert("Compra realizada correctamente.");

            mostrarCarrito();

        } else {

            alert("El carrito está vacío.");

        }

    });
    mostrarCarrito();

});