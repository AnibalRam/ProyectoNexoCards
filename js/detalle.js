document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");
    const carta = buscarCartaPorId(id);
    const contenedor = document.querySelector("#detalleCarta");

    if (!carta || !carta.activo) {
        contenedor.innerHTML = `
            <div class="alert alert-warning">
                No fue posible encontrar la carta seleccionada.
                <a href="catalogo.html" class="alert-link">Volver al catálogo</a>.
            </div>`;
        return;
    }

    const stockTexto = carta.stock > 0
        ? `<span class="disponible">Disponible (${carta.stock})</span>`
        : `<span class="sin-stock">Sin stock</span>`;

    contenedor.innerHTML = `
        <div class="row g-4 align-items-start">
            <div class="col-12 col-md-5">
                <img class="imagen-detalle" src="${carta.imagen}" alt="${carta.nombre}">
            </div>
            <article class="col-12 col-md-7">
                <span class="etiqueta">${carta.categoria}</span>
                <h1 class="mt-3">${carta.nombre}</h1>
                <p><strong>Código:</strong> ${carta.codigo}</p>
                <p>${carta.descripcion}</p>
                <p class="precio">$${carta.precio.toLocaleString("es-CL")}</p>
                <p><strong>Disponibilidad:</strong> ${stockTexto}</p>
                <a class="btn btn-nexo" href="catalogo.html">Volver al catálogo</a>
            </article>
        </div>
    `;
});
