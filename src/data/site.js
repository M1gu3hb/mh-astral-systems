// Real, confirmed brand + contact data (docs/00 + docs/03). Do not invent.
export const SITE = {
  name: 'MH Astral Systems',
  owner: 'Miguel Huerta Bautista',
  location: 'Xochimilco · CDMX',
  domain: 'mh-astral-systems.com',
  tagline: 'Digitaliza tu negocio con páginas web y sistemas que sí venden y organizan.',
  subTagline: 'UX · WEB · SYSTEMS',
  support:
    'Ayudamos a negocios a digitalizar su presencia y operación con páginas web y sistemas personalizados, POS, CRM’s y automatizaciones diseñadas para vender, ordenar procesos y medir resultados.',
  whatsapp: {
    display: '55 2311 8153',
    // Mexico country code 52 + national number (no spaces) for wa.me links
    number: '525523118153',
  },
  email: 'mhastralsystems@gmail.com',
};

// Hero copy — the tagline adjusted to "tú" (the visitor is the business owner),
// and a sub-headline that names páginas + sistemas + panel de autoedición
// from the hero, because that panel is the new differentiator (docs/01).
export const HERO = {
  eyebrow: 'UX · WEB · SYSTEMS',
  headlineLead: 'Digitaliza tu negocio con',
  headlineHighlight: 'páginas y sistemas',
  headlineTail: 'que sí venden y organizan.',
  sub: 'Páginas web con panel de autoedición, POS, CRM y automatizaciones. Tú controlas fotos, precios y promociones — sin depender de nadie para cada cambio.',
  ctaPrimary: 'Cuéntame tu proyecto',
  ctaSecondary: 'Ver sistemas construidos',
};

export const NAV_LINKS = [
  { label: 'Casos', link: '/#casos', ariaLabel: 'Ver casos de éxito' },
  { label: 'Servicios', link: '/#servicios', ariaLabel: 'Ver servicios' },
  { label: 'Panel', link: '/#diferenciador', ariaLabel: 'Ver el panel de autoedición' },
  { label: 'Precios', link: '/#precios', ariaLabel: 'Ver tiers de precio' },
  { label: 'Proceso', link: '/#proceso', ariaLabel: 'Ver el proceso' },
  { label: 'Blog', link: '/blog', ariaLabel: 'Ir al blog' },
];
