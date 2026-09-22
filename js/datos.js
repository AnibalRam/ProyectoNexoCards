const CARTAS_INICIALES = [
    {
        id: 1,
        codigo: "PKM-001",
        nombre: "Charizard",
        categoria: "Pokémon",
        descripcion: "Carta de demostración tipo fuego para el catálogo de NexoCartas.",
        precio: 25990,
        stock: 4,
        imagen: "img/charizard.svg",
        activo: true,
        destacado: true
    },
    {
        id: 2,
        codigo: "PKM-002",
        nombre: "Pikachu",
        categoria: "Pokémon",
        descripcion: "Carta de demostración de tipo eléctrico, destacada en la página de inicio.",
        precio: 12990,
        stock: 8,
        imagen: "img/pikachu.svg",
        activo: true,
        destacado: true
    },
    {
        id: 3,
        codigo: "ANI-001",
        nombre: "Guerrero Saiyajin",
        categoria: "Anime",
        descripcion: "Carta inspirada en anime de combate, incluida solo con fines académicos de demostración.",
        precio: 10990,
        stock: 0,
        imagen: "img/saiyajin.svg",
        activo: true,
        destacado: true
    },
    {
        id: 4,
        codigo: "ANI-002",
        nombre: "Ninja Carmesí",
        categoria: "Anime",
        descripcion: "Carta ficticia de temática ninja para demostrar categorías y filtros.",
        precio: 8990,
        stock: 6,
        imagen: "img/ninja.svg",
        activo: true,
        destacado: false
    },
    {
        id: 5,
        codigo: "MNG-001",
        nombre: "Pirata del Sombrero",
        categoria: "Manga",
        descripcion: "Carta ficticia de temática manga para ampliar el catálogo de demostración.",
        precio: 9990,
        stock: 3,
        imagen: "img/pirata.svg",
        activo: true,
        destacado: false
    },
    {
        id: 6,
        codigo: "PKM-003",
        nombre: "Mewtwo",
        categoria: "Pokémon",
        descripcion: "Carta inactiva de demostración. No debe aparecer en el catálogo del cliente.",
        precio: 18990,
        stock: 2,
        imagen: "img/mewtwo.svg",
        activo: false,
        destacado: false
    }
];

const CUENTAS_DEMO = [
    {
        correo: "cliente@nexocartas.cl",
        clave: "1234",
        rol: "cliente",
        nombre: "Cliente Demo",
        activo: true
    },
    {
        correo: "admin@nexocartas.cl",
        clave: "admin123",
        rol: "admin",
        nombre: "Administrador",
        activo: true
    },
    {
        correo: "inactivo@nexocartas.cl",
        clave: "1234",
        rol: "cliente",
        nombre: "Cuenta Inactiva",
        activo: false
    }
];
