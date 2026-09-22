# NexoCartas — Evaluación Parcial 1 DSY1104

Prototipo frontend de una tienda web de cartas coleccionables. Está desarrollado con HTML5, Bootstrap 5, CSS externo y JavaScript. No utiliza backend, API ni base de datos.

## Cómo ejecutar

1. Abrir esta carpeta en Visual Studio Code.
2. Ejecutar `login.html` con la extensión **Live Server**.
3. Usar una de las cuentas de demostración.

## Cuentas de demostración

- Cliente: `cliente@nexocartas.cl` / `1234`
- Administrador: `admin@nexocartas.cl` / `admin123`
- Cuenta inactiva de prueba: `inactivo@nexocartas.cl` / `1234`

## Funciones principales

- Inicio de sesión con dos perfiles y bloqueo temporal después de 5 intentos fallidos.
- Sesión de demostración en `sessionStorage` con duración de 30 minutos.
- Página de Inicio con contadores, carrusel JavaScript y video embebido.
- Catálogo con búsqueda en tiempo real y filtro por categoría.
- Detalle de cada carta.
- Formulario de consultas con validaciones JavaScript y mensajes personalizados.
- Administración con CRUD de cartas, validación de código único, precio y stock.
- Persistencia del inventario en `localStorage`.
- Diseño adaptable para computador y teléfono.

## Estructura

```text
proyecto_frontend/
├── login.html
├── index.html
├── catalogo.html
├── detalle.html
├── contacto.html
├── admin.html
├── css/
│   ├── global.css
│   ├── index.css
│   ├── login.css
│   ├── catalogo.css
│   ├── detalle.css
│   ├── contacto.css
│   └── admin.css
├── js/
│   ├── datos.js
│   ├── storage.js
│   ├── sesion.js
│   ├── login.js
│   ├── inicio.js
│   ├── catalogo.js
│   ├── detalle.js
│   ├── formularios.js
│   └── admin.js
└── img/
    └── imágenes SVG locales de demostración
```

## Nota académica

Las cuentas, sesiones y permisos son de demostración y se ejecutan en el navegador. No representan autenticación segura para producción.
