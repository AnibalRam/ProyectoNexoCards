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
    },
    {
        id: 7,
        codigo: "PKM-004",
        nombre: "Blastoise",
        categoria: "Pokémon",
        descripcion: "Carta de demostración tipo agua con cañones de alta presión.",
        precio: 21990,
        stock: 5,
        imagen: "img/blastoise.svg",
        activo: true,
        destacado: false
    },
    {
        id: 8,
        codigo: "PKM-005",
        nombre: "Gengar",
        categoria: "Pokémon",
        descripcion: "Carta de demostración tipo fantasma, ideal para mazos de sombras.",
        precio: 15990,
        stock: 7,
        imagen: "img/gengar.svg",
        activo: true,
        destacado: false
    },
    {
        id: 9,
        codigo: "ANI-003",
        nombre: "Espadachín Lunar",
        categoria: "Anime",
        descripcion: "Carta ficticia de un espadachín que canaliza el poder de la luna.",
        precio: 11990,
        stock: 4,
        imagen: "img/espadachin-lunar.svg",
        activo: true,
        destacado: false
    },
    {
        id: 10,
        codigo: "ANI-004",
        nombre: "Maga Estelar",
        categoria: "Anime",
        descripcion: "Carta ficticia de una maga que invoca la energía de las estrellas.",
        precio: 13990,
        stock: 2,
        imagen: "img/maga-estelar.svg",
        activo: true,
        destacado: true
    },
    {
        id: 11,
        codigo: "MNG-002",
        nombre: "Samurái Errante",
        categoria: "Manga",
        descripcion: "Carta ficticia de un samurái solitario que recorre el país.",
        precio: 9490,
        stock: 9,
        imagen: "img/samurai-errante.svg",
        activo: true,
        destacado: false
    },
    {
        id: 12,
        codigo: "MNG-003",
        nombre: "Cazador de Sombras",
        categoria: "Manga",
        descripcion: "Carta ficticia de un cazador que se mueve entre las sombras.",
        precio: 10490,
        stock: 0,
        imagen: "img/cazador-sombras.svg",
        activo: true,
        destacado: false
    },
    {
        id: 13,
        codigo: "FAN-001",
        nombre: "Dragón Esmeralda",
        categoria: "Fantasía",
        descripcion: "Carta ficticia de un dragón ancestral, la más poderosa de la colección.",
        precio: 29990,
        stock: 2,
        imagen: "img/dragon-esmeralda.svg",
        activo: true,
        destacado: true
    },
    {
        id: 14,
        codigo: "FAN-002",
        nombre: "Guardián de Cristal",
        categoria: "Fantasía",
        descripcion: "Carta ficticia de un guardián de cristal con defensa excepcional.",
        precio: 16990,
        stock: 5,
        imagen: "img/guardian-cristal.svg",
        activo: true,
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
