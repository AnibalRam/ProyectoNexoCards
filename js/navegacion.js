function actualizarContadorCarrito() {

    const cantidadCarrito = document.querySelector("#cantidadCarrito");

    if (!cantidadCarrito) {
        return;
    }

    cantidadCarrito.textContent = obtenerCantidadTotalCarrito();
}
document.addEventListener("DOMContentLoaded", () => {

    actualizarContadorCarrito();

});