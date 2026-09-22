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
