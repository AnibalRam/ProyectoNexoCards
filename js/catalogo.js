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
        const texto = buscar.value.trim().toLowerCase();
        const categoriaSeleccionada = categoria.value;

        const cartas = obtenerCartas().filter(carta => {
            const coincideTexto =
                carta.nombre.toLowerCase().includes(texto) ||
                carta.codigo.toLowerCase().includes(texto);

            const coincideCategoria =
                categoriaSeleccionada === "Todas" || carta.categoria === categoriaSeleccionada;

            return carta.activo && coincideTexto && coincideCategoria;
        });

        lista.innerHTML = "";
        document.querySelector("#cantidadResultados").textContent = `${cartas.length} resultado(s)`;

        if (!cartas.length) {
            lista.innerHTML = `<div class="col-12"><div class="alert alert-warning">No se encontraron cartas con esos criterios.</div></div>`;
            return;
        }

        cartas.forEach(carta => {
            const columna = document.createElement("div");
            columna.className = "col-12 col-sm-6 col-lg-4";
            const stockTexto = carta.stock > 0
                ? `<span class="disponible">Disponible (${carta.stock})</span>`
                : `<span class="sin-stock">Sin stock</span>`;

            columna.innerHTML = `
                <article class="tarjeta-carta">
                    <img src="${carta.imagen}" alt="${carta.nombre}">
                    <div class="contenido">
                        <span class="etiqueta">${carta.categoria}</span>
                        <h3 class="h5 mt-3">${carta.nombre}</h3>
                        <p class="text-secondary mb-1">${carta.codigo}</p>
                        <p class="precio mb-1">$${carta.precio.toLocaleString("es-CL")}</p>
                        <p>${stockTexto}</p>
                        <a class="btn btn-nexo" href="detalle.html?id=${carta.id}">Ver detalle</a>
                    </div>
                </article>
            `;

            lista.appendChild(columna);
        });
    }

    buscar.addEventListener("input", mostrarCartas);
    categoria.addEventListener("change", mostrarCartas);
    mostrarCartas();
});
