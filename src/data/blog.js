// Blog posts — mock/example content for phase 1 (docs/06 asks for example
// posts). Shape mirrors the future `blog_posts` entity (docs/05): slug, titulo,
// resumen, contenido (markdown), fecha, publicado. Covers are inline SVG data
// URIs so there are no external image dependencies.

const cover = (a, b, label) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
      </linearGradient></defs>
      <rect width="600" height="400" fill="#070B16"/>
      <rect width="600" height="400" fill="url(#g)" opacity="0.85"/>
      <g fill="none" stroke="#BFD6FF" stroke-opacity="0.25" stroke-width="2">
        <path d="M40 60 H180 L210 90 H320"/><circle cx="320" cy="90" r="5" fill="#BFD6FF" stroke="none"/>
        <path d="M560 340 H420 L390 310 H300"/><circle cx="300" cy="310" r="5" fill="#BFD6FF" stroke="none"/>
      </g>
      <text x="40" y="360" font-family="'IBM Plex Mono', monospace" font-size="20" fill="#F4F6FA" opacity="0.85">${label}</text>
    </svg>`,
  )}`;

export const BLOG_POSTS = [
  {
    slug: 'panel-de-autoedicion-vs-pagina-estatica',
    titulo: 'Panel de autoedición vs. página estática',
    resumen:
      'Por qué un negocio que cambia precios y promociones seguido necesita editar su propio sitio — y cómo eso cambia el juego.',
    fecha: '2026-06-18',
    tag: 'Producto',
    lectura: '4 min',
    cover: cover('#0A1F55', '#1E5BFF', 'SIS · PANEL'),
    publicado: true,
    contenido: `## El problema de depender de tu desarrollador

Cuando tu página es estática, cada cambio pequeño — subir la foto del pastel nuevo, cambiar un precio, poner la promo de la quincena — pasa por alguien más. Le escribes, esperas, y a veces el cambio llega tarde para cuando ya sirve.

Ese cuello de botella no es un problema técnico. Es un problema de **negocio**: mientras esperas, no vendes.

## Qué cambia con un panel propio

Con un panel de autoedición, tú entras, editas y en segundos ya está en línea. Las promociones salen a tiempo, los precios están siempre correctos y tu catálogo refleja lo que realmente vendes hoy.

- Editas fotos, precios, promociones y descripciones tú mismo
- No dependes de nadie para un cambio menor
- Lo que cambias se ve al instante

## De dónde salió esto

Este producto nació de la experiencia con **Pastelería Confetti**: un negocio multi-sucursal que necesitaba mover precios y fotos seguido. Hoy lo ofrezco a cualquier cliente nuevo, porque el patrón se repite en casi todos los negocios.

Un sistema profesional no es solo una página bonita: es una herramienta que trabajas todos los días.`,
  },
  {
    slug: 'que-es-un-pos-y-cuando-tu-negocio-lo-necesita',
    titulo: '¿Qué es un POS y cuándo tu negocio lo necesita?',
    resumen:
      'Cobros, abonos y cortes de caja sin hojas de cálculo ni cuadernos. Cuándo tiene sentido dar el paso.',
    fecha: '2026-05-30',
    tag: 'Operación',
    lectura: '5 min',
    cover: cover('#0E1830', '#5B8CFF', 'SIS · POS'),
    publicado: true,
    contenido: `## Más que cobrar

Un POS (punto de venta) no es solo una caja registradora digital. Es el lugar donde se ordena la operación de tu negocio: qué se vendió, cuánto entró, qué está pendiente de pago y cómo cerró el día.

## Señales de que ya lo necesitas

- Llevas las ventas en un cuaderno o en notas del teléfono
- Los cortes de caja te toman más de lo que deberían
- No sabes con certeza cuánto vendiste la semana pasada
- Tienes abonos o cuentas por cobrar difíciles de rastrear

## Lo que se gana

Con un POS bien armado, el corte de caja deja de ser una hora de estrés y se vuelve un botón. Y con los datos ordenados, por fin puedes **medir** en vez de adivinar.

En negocios como **Electrotécnica Berlín** o **Confetti**, el POS es la columna vertebral de la operación diaria.`,
  },
  {
    slug: 'automatizaciones-que-si-le-sirven-a-un-negocio',
    titulo: 'Automatizaciones que sí le sirven a un negocio',
    resumen:
      'No se trata de automatizar por moda. Se trata de quitarte de encima lo repetitivo para que vendas más.',
    fecha: '2026-05-12',
    tag: 'Sistemas',
    lectura: '3 min',
    cover: cover('#0A1F55', '#0E1830', 'SIS · AUTO'),
    publicado: true,
    contenido: `## Automatizar lo que te roba tiempo

La mejor automatización es invisible: cotizaciones que se generan solas, contratos que se arman con los datos que ya capturaste, avisos que salen sin que te acuerdes de mandarlos.

## Ejemplos reales

- **Jardines Club Hípico**: cotizador automatizado + generación de contratos
- **Fiesta Total DJ's**: selector de paquetes + conversión medida en WhatsApp

## La regla

Automatiza lo repetitivo y de bajo criterio. Reserva tu tiempo para lo que sí necesita tu cabeza: atender clientes, cerrar tratos y hacer crecer el negocio.`,
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);
