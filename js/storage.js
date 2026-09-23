const VERSION_CATALOGO = "2";

function inicializarInventario() {
    const guardado = localStorage.getItem("nexoCartas");
    if (!guardado) {
        localStorage.setItem("nexoCartas", JSON.stringify(CARTAS_INICIALES));
        localStorage.setItem("nexoCatalogoVersion", VERSION_CATALOGO);
        return;
    }

    // Si el catálogo base se amplió, agrega las cartas nuevas sin borrar lo que ya hay
    if (localStorage.getItem("nexoCatalogoVersion") !== VERSION_CATALOGO) {
        const actuales = JSON.parse(guardado) || [];
        const codigos = actuales.map(carta => carta.codigo);
        CARTAS_INICIALES.forEach(carta => {
            if (!codigos.includes(carta.codigo)) {
                actuales.push({ ...carta, id: Math.max(0, ...actuales.map(c => Number(c.id))) + 1 });
            }
        });
        localStorage.setItem("nexoCartas", JSON.stringify(actuales));
        localStorage.setItem("nexoCatalogoVersion", VERSION_CATALOGO);
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
