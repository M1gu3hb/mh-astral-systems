// Mock data for the Client Portal (phase 1 — no backend, no real auth).
// Each project renders as a "Folder" (docs/10): the folder metaphor = "ver tus
// proyectos". Papers inside are the deliverables/links of that project.

export const PORTAL_CLIENT = {
  nombre: 'Tu Negocio',
  contacto: 'Área de administración',
  plan: 'Autónomo + IA',
  desde: '2025',
};

export const PORTAL_PROJECTS = [
  {
    id: 'confetti-web',
    nombre: 'Sitio + Panel de dueño',
    estado: 'En operación',
    progreso: 100,
    tipo: 'Web · Panel',
    papers: [
      { label: 'Sitio en vivo', tipo: 'link' },
      { label: 'Panel de administración', tipo: 'link' },
      { label: 'Guía de uso (PDF)', tipo: 'doc' },
    ],
  },
  {
    id: 'confetti-pos',
    nombre: 'POS multi-sucursal',
    estado: 'En operación',
    progreso: 100,
    tipo: 'POS · Cortes',
    papers: [
      { label: 'POS Sucursal Centro', tipo: 'link' },
      { label: 'POS Sucursal Sur', tipo: 'link' },
      { label: 'Reporte de cortes', tipo: 'doc' },
    ],
  },
  {
    id: 'confetti-ia',
    nombre: 'Generador de imágenes IA',
    estado: 'En construcción',
    progreso: 65,
    tipo: 'IA · Panel',
    papers: [
      { label: 'Créditos del mes: 42/100', tipo: 'meta' },
      { label: 'Últimas generaciones', tipo: 'link' },
    ],
  },
  {
    id: 'confetti-crm',
    nombre: 'CRM de pedidos',
    estado: 'Propuesta',
    progreso: 20,
    tipo: 'CRM',
    papers: [
      { label: 'Propuesta v2 (PDF)', tipo: 'doc' },
      { label: 'Alcance y cotización', tipo: 'doc' },
    ],
  },
];

export const PORTAL_UPDATES = [
  { fecha: '2026-06-28', texto: 'Panel de dueño: nuevo reporte de mermas por sucursal.' },
  { fecha: '2026-06-15', texto: 'Generador de imágenes IA en pruebas internas.' },
  { fecha: '2026-05-30', texto: 'POS Sucursal Sur en operación.' },
];
