// Mock admin dashboard data (phase 1 — no backend). The admin panel is 100%
// internal (Miguel only) and reads from the same mock data as the site so the
// UI shows real content it would eventually manage (docs/05).
export const ADMIN_STATS = [
  { label: 'Casos publicados', value: '4', hint: 'SIS-01 … SIS-04' },
  { label: 'Tiers de precio', value: '3', hint: 'Presencia · Autónomo · +IA' },
  { label: 'Posts del blog', value: '3', hint: 'Todos publicados' },
  { label: 'Clientes con portal', value: '1', hint: 'Confetti (demo)' },
];

// The sections of the admin panel (docs/05 · CRUD sobre las 4 entidades).
export const ADMIN_SECTIONS = [
  { id: 'casos', label: 'Casos de éxito', desc: 'Alta, edición y orden de los folios SIS-XX.' },
  { id: 'precios', label: 'Servicios y precios', desc: 'Tiers, features y el destacado “más elegido”.' },
  { id: 'blog', label: 'Blog', desc: 'Editor de posts en markdown, publicar u ocultar.' },
  { id: 'config', label: 'Configuración del sitio', desc: 'WhatsApp, headline del hero y redes.' },
];
