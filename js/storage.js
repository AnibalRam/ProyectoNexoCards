function inicializarInventario() {
    if (!localStorage.getItem("nexoCartas")) {
        localStorage.setItem("nexoCartas", JSON.stringify(CARTAS_INICIALES));
    }
}

function obtenerCartas() {
    inicializarInventario();
    return JSON.parse(localStorage.getItem("nexoCartas")) || [];
}

function guardarCartas(cartas) {
    localStorage.setItem("nexoCartas", JSON.stringify(cartas));
}

function buscarCartaPorId(id) {
    return obtenerCartas().find(carta => Number(carta.id) === Number(id));
}

function obtenerCategorias() {
    return [...new Set(obtenerCartas().map(carta => carta.categoria))].sort();
}

function reiniciarInventario() {
    localStorage.setItem("nexoCartas", JSON.stringify(CARTAS_INICIALES));
}

function obtenerCarrito() {

    return JSON.parse(localStorage.getItem("nexoCarrito")) || [];

}

function guardarCarrito(carrito) {

    localStorage.setItem("nexoCarrito", JSON.stringify(carrito));

}

function agregarAlCarrito(idCarta) {

    const carta = buscarCartaPorId(idCarta);

    if (!carta) {
        return false;
    }

    const carrito = obtenerCarrito();

    const itemExistente = carrito.find(
        item => Number(item.idCarta) === Number(idCarta)
    );

    if (itemExistente) {

        if (itemExistente.cantidad >= carta.stock) {
            return false;
        }

        itemExistente.cantidad++;

    } else {

        if (carta.stock <= 0) {
            return false;
        }

        carrito.push({
            idCarta: Number(idCarta),
            cantidad: 1
        });
    }

    guardarCarrito(carrito);

    return true;
}

function aumentarCantidad(idCarta) {

    const carta = buscarCartaPorId(idCarta);
    const carrito = obtenerCarrito();

    const item = carrito.find(
        item => Number(item.idCarta) === Number(idCarta)
    );

    if (!carta || !item || item.cantidad >= carta.stock) {
        return false;
    }

    item.cantidad++;

    guardarCarrito(carrito);

    return true;
}


function disminuirCantidad(idCarta) {

    const carrito = obtenerCarrito();

    const item = carrito.find(
        item => Number(item.idCarta) === Number(idCarta)
    );

    if (!item) {
        return false;
    }

    if (item.cantidad === 1) {

        const carritoActualizado = carrito.filter(
            item => Number(item.idCarta) !== Number(idCarta)
        );

        guardarCarrito(carritoActualizado);

        return true;
    }

    item.cantidad--;

    guardarCarrito(carrito);

    return true;
}

function eliminarDelCarrito(idCarta) {

    const carrito = obtenerCarrito();

    const carritoActualizado = carrito.filter(
        item => Number(item.idCarta) !== Number(idCarta)
    );

    guardarCarrito(carritoActualizado);
}

function finalizarCompra() {

    const carrito = obtenerCarrito();
    const cartas = obtenerCartas();

    if (!carrito.length) {
        return false;
    }

    carrito.forEach(item => {

        const carta = cartas.find(
            carta => Number(carta.id) === Number(item.idCarta)
        );

        if (carta) {
            carta.stock -= item.cantidad;
        }

    });

    guardarCartas(cartas);
    guardarCarrito([]);

    return true;
}

function obtenerCantidadTotalCarrito() {

    const carrito = obtenerCarrito();

    return carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );
}