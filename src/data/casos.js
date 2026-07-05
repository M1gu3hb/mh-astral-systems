// Real case studies in the "folio" format (docs/03). Mock/static for phase 1 —
// shape mirrors the future `casos_exito` entity (docs/05) so a backend can
// drop in later without redesign.
export const CASOS = [
  {
    folio: 'SIS-01',
    cliente: 'Pastelería Confetti',
    resumen:
      'Sistema multi-sucursal: catálogo QR público, pedidos tentativos desde la web, POS, abonos, cortes de caja, panel de dueño con folios por sucursal.',
    stack: ['Web', 'POS', 'Panel dueño', 'Multi-sucursal'],
    orden: 1,
    publicado: true,
  },
  {
    folio: 'SIS-02',
    cliente: 'Jardines Club Hípico',
    resumen:
      'Venue de eventos familiares con cotizador automatizado, CRM de prospección y generación de contratos.',
    stack: ['CRM', 'Cotizador', 'Contratos', 'Web'],
    orden: 2,
    publicado: true,
  },
  {
    folio: 'SIS-03',
    cliente: "Fiesta Total DJ's",
    resumen:
      'Página con selector de paquetes interactivo y campañas de Google Ads con conversión medida en clics de WhatsApp.',
    stack: ['Web', 'Ads', 'Conversión'],
    orden: 3,
    publicado: true,
  },
  {
    folio: 'SIS-04',
    cliente: 'Electrotécnica Berlín',
    resumen:
      'Punto de venta y presencia web para negocio familiar de electrónica, identidad visual neón.',
    stack: ['POS', 'Web', 'Identidad visual'],
    orden: 4,
    publicado: true,
  },
];
