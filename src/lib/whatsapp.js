import { SITE } from '../data/site';

// Build a wa.me link with a prefilled message. Every WhatsApp CTA on the site
// funnels through here so the real number (55 2311 8153) is used everywhere
// (docs/06 checklist).
export function whatsappLink(message) {
  const base = `https://wa.me/${SITE.whatsapp.number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  general: 'Hola Miguel 👋 Vi tu sitio y quiero platicar sobre un proyecto para mi negocio.',
  panel: 'Hola Miguel 👋 Me interesa una página con panel de autoedición. ¿Cómo funciona?',
  cotizar: 'Hola Miguel 👋 Quiero una cotización personalizada para mi negocio.',
};
