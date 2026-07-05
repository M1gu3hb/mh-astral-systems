// Price tiers (docs/03). Real prices are still pending Miguel's decision, so —
// per the launch option the docs themselves allow (docs/01 · pendientes) — the
// price shows as "Cotización personalizada" rather than an invented number.
// The scope rule (letra chica) is already defined and IS shown.
export const TIERS = [
  {
    nombre: 'Presencia',
    precio: 'Cotización personalizada',
    periodo: 'por proyecto',
    resumen: 'Tu negocio en línea, hecho bien y listo para recibir clientes.',
    features: [
      'Página profesional a medida',
      'Hosting y dominio configurados',
      'Cambios menores incluidos el primer mes',
      'Los cambios los hago yo',
    ],
    letraChica: 'Cambios menores incluidos. Rediseños, sistemas nuevos o cargas masivas de contenido se cotizan aparte.',
    destacado: false,
    orden: 1,
  },
  {
    nombre: 'Autónomo',
    precio: 'Cotización personalizada',
    periodo: 'por proyecto',
    resumen: 'Lo más elegido: tú tomas el control de tu contenido.',
    features: [
      'Todo lo de Presencia',
      'Panel privado de administración',
      'Editas fotos, precios y promociones tú mismo',
      'Sin esperar a nadie para cada cambio',
    ],
    letraChica: 'Cambios menores ilimitados desde tu panel. Sistemas nuevos o integraciones se cotizan aparte.',
    destacado: true,
    orden: 2,
  },
  {
    nombre: 'Autónomo + IA',
    precio: 'Cotización personalizada',
    periodo: 'por proyecto',
    resumen: 'Genera imágenes para tu negocio sin salir de tu panel.',
    features: [
      'Todo lo de Autónomo',
      'Generación de imágenes con IA integrada',
      'Buena calidad/precio (Google)',
      'Límite mensual incluido y ampliable',
    ],
    letraChica: 'Límite mensual de generaciones incluido. Ampliaciones y proyectos grandes se cotizan aparte.',
    destacado: false,
    orden: 3,
  },
];
