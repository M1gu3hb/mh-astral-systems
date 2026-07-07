// Full service list from the flyer (docs/03), icon + label. The first item is
// the NEW / HIGHLIGHTED differentiator. `ayuda` is the benefit line ("cómo
// ayuda a tu negocio") shown on each stacked service card.
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
    ayuda:
      'Dejas de esperar a un desarrollador: cambias precios, fotos y promos al momento y tu página siempre está al día.',
    highlight: true,
  },
  {
    icon: Globe,
    label: 'Páginas web profesionales',
    desc: 'Presencia que carga rápido, se ve bien y convierte visitas en clientes.',
    ayuda: 'Tu negocio se presenta bien 24/7: más confianza para quien te busca y más mensajes directos a tu WhatsApp.',
  },
  {
    icon: Store,
    label: 'POS para restaurantes y negocios',
    desc: 'Cobros, abonos y cortes de caja en un flujo simple de operar.',
    ayuda: 'Cobras más rápido, controlas abonos y cierras caja en minutos — sin cuadernos ni hojas sueltas.',
  },
  {
    icon: Users,
    label: 'CRM y seguimiento de clientes',
    desc: 'Prospectos ordenados, nada se queda sin respuesta.',
    ayuda: 'Cada prospecto queda registrado y con seguimiento: no se te vuelve a escapar una venta por olvido.',
  },
  {
    icon: Workflow,
    label: 'Automatizaciones para negocios',
    desc: 'Tareas repetitivas que se disparan solas: avisos, contratos, seguimientos.',
    ayuda: 'Cotizaciones, contratos y avisos se generan solos: recuperas horas a la semana para atender clientes.',
  },
  {
    icon: QrCode,
    label: 'Menús QR interactivos',
    desc: 'Catálogo público que tu cliente escanea, explora y pide.',
    ayuda: 'Tu cliente escanea y pide sin apps ni fricción; tú actualizas el menú sin reimprimir nada.',
  },
  {
    icon: Calculator,
    label: 'Cotizadores, formularios y dashboards',
    desc: 'Arma propuestas al instante y mide resultados de un vistazo.',
    ayuda: 'Respondes con propuestas en minutos y ves las cifras clave de tu negocio en una sola pantalla.',
  },
  {
    icon: PenTool,
    label: 'UI / UX / Systems',
    desc: 'Diseño e ingeniería del sistema completo, no solo la fachada.',
    ayuda: 'Interfaces claras que guían a tu cliente hasta el contacto o la compra — diseño pensado para vender.',
  },
];
