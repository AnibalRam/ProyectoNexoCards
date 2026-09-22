document.addEventListener("DOMContentLoaded", () => {
    protegerPagina();

    const cartas = obtenerCartas();
    const activas = cartas.filter(carta => carta.activo);
    const sinStock = activas.filter(carta => carta.stock === 0);
    const destacadas = activas.filter(carta => carta.destacado).slice(0, 3);

    document.querySelector("#contadorActivas").textContent = activas.length;
    document.querySelector("#contadorSinStock").textContent = sinStock.length;

    const carrusel = document.querySelector("#carruselDestacadas");
    carrusel.innerHTML = "";

    destacadas.forEach((carta, indice) => {
        const slide = document.createElement("article");
        slide.className = `slide-nexo ${indice === 0 ? "activo" : ""}`;
        slide.innerHTML = `
            <img src="${carta.imagen}" alt="Carta destacada ${carta.nombre}">
            <div>
                <span class="etiqueta">${carta.categoria}</span>
                <h3 class="mt-3">${carta.nombre}</h3>
                <p>${carta.descripcion}</p>
                <p class="precio">$${carta.precio.toLocaleString("es-CL")}</p>
                <a class="btn btn-nexo" href="detalle.html?id=${carta.id}">Ver detalle</a>
            </div>
        `;
        carrusel.appendChild(slide);
    });

    let actual = 0;
    const slides = [...document.querySelectorAll(".slide-nexo")];

    function mostrarSlide(indice) {
        slides.forEach(slide => slide.classList.remove("activo"));
        actual = (indice + slides.length) % slides.length;
        slides[actual].classList.add("activo");
        document.querySelector("#estadoCarrusel").textContent = `${actual + 1} de ${slides.length}`;
    }

    if (slides.length) {
        mostrarSlide(0);

        document.querySelector("#anterior").addEventListener("click", () => {
            mostrarSlide(actual - 1);
        });

        document.querySelector("#siguiente").addEventListener("click", () => {
            mostrarSlide(actual + 1);
        });
    }
});
