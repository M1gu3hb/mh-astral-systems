// Full service list from the flyer (docs/03), icon + label. The first item is
// the NEW / HIGHLIGHTED differentiator and gets distinct visual treatment.
import {
  LayoutPanelTop,
  Globe,
  Store,
  Users,
  Workflow,
  QrCode,
  Calculator,
  PenTool,
} from 'lucide-react';

export const SERVICIOS = [
  {
    icon: LayoutPanelTop,
    label: 'Páginas web con panel de autoedición',
    desc: 'El cliente edita fotos, precios, promociones y descripciones desde su propio panel, sin depender de mí para cada cambio.',
    highlight: true,
  },
  { icon: Globe, label: 'Páginas web profesionales', desc: 'Presencia que carga rápido, se ve bien y convierte visitas en clientes.' },
  { icon: Store, label: 'POS para restaurantes y negocios', desc: 'Cobros, abonos y cortes de caja en un flujo simple de operar.' },
  { icon: Users, label: 'CRM y seguimiento de clientes', desc: 'Prospectos ordenados, nada se queda sin respuesta.' },
  { icon: Workflow, label: 'Automatizaciones para negocios', desc: 'Tareas repetitivas que se disparan solas: avisos, contratos, seguimientos.' },
  { icon: QrCode, label: 'Menús QR interactivos', desc: 'Catálogo público que tu cliente escanea, explora y pide.' },
  { icon: Calculator, label: 'Cotizadores, formularios y dashboards', desc: 'Arma propuestas al instante y mide resultados de un vistazo.' },
  { icon: PenTool, label: 'UI / UX / Systems', desc: 'Diseño e ingeniería del sistema completo, no solo la fachada.' },
];
