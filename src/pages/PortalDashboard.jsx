import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  FolderKanban,
  Bell,
  LifeBuoy,
  UserRound,
  Link as LinkIcon,
  FileText,
  Gauge,
  MessageCircle,
} from 'lucide-react';
import DashboardShell from '../components/app/DashboardShell';
import GlassCard from '../components/ui/GlassCard';
import Reveal from '../components/ui/Reveal';
import Folder from '../components/reactbits/Folder';
import Dock from '../components/reactbits/Dock';
import { isAuthed } from '../lib/stubAuth';
import { PORTAL_CLIENT, PORTAL_PROJECTS, PORTAL_UPDATES } from '../data/portal';
import { SITE } from '../data/site';
import { whatsappLink, WA_MESSAGES } from '../lib/whatsapp';

const ESTADO_STYLES = {
  'En operación': 'text-electric-400 border-electric-600/40 bg-electric-900/20',
  'En construcción': 'text-chrome-highlight border-chrome-highlight/30 bg-white/5',
  Propuesta: 'text-silver-dim border-white/15 bg-void/40',
};

const paperIcon = { link: LinkIcon, doc: FileText, meta: Gauge };

// A single deliverable rendered as a Folder "paper".
const paper = (p) => {
  const Icon = paperIcon[p.tipo] || FileText;
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1 rounded-[10px] px-3 text-black-ink">
      <Icon size={15} strokeWidth={1.75} className="text-card-accent" />
      <span className="text-[0.66rem] font-semibold leading-tight">{p.label}</span>
    </div>
  );
};

// /portal/dashboard — client portal (docs/10). Each project is a Folder that
// opens to reveal its deliverables; the Dock's proximity-magnification
// animation (docs/09, recolored) is repurposed as the section switcher. Mock
// data only — no persistence.
export default function PortalDashboard() {
  if (!isAuthed('portal')) return <Navigate to="/portal" replace />;

  const [view, setView] = useState('proyectos');

  const dockItems = [
    { icon: <FolderKanban size={20} />, label: 'Proyectos', onClick: () => setView('proyectos') },
    { icon: <Bell size={20} />, label: 'Actualizaciones', onClick: () => setView('updates') },
    { icon: <LifeBuoy size={20} />, label: 'Soporte', onClick: () => setView('soporte') },
    { icon: <UserRound size={20} />, label: 'Cuenta', onClick: () => setView('cuenta') },
  ];

  return (
    <DashboardShell
      scope="portal"
      badge="Portal de cliente"
      title={`Hola, ${PORTAL_CLIENT.nombre}`}
      subtitle={`Plan ${PORTAL_CLIENT.plan} · cliente desde ${PORTAL_CLIENT.desde}`}
    >
      {/* Dock as quick-access section switcher (docs/10) */}
      <div className="relative mb-8 h-[92px] w-full">
        <Dock items={dockItems} panelHeight={64} baseItemSize={46} magnification={66} distance={160} />
      </div>

      {view === 'proyectos' && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PORTAL_PROJECTS.map((proj, i) => (
            <Reveal key={proj.id} delay={i * 0.06}>
              <GlassCard className="flex h-full flex-col gap-4 p-6">
                <div className="grid h-40 place-items-center">
                  <Folder color="#1E5BFF" size={1.25} items={proj.papers.map(paper)} />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-white">{proj.nombre}</h3>
                  <span
                    className={`flex-none rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider ${ESTADO_STYLES[proj.estado]}`}
                  >
                    {proj.estado}
                  </span>
                </div>
                <p className="font-mono text-xs text-silver-faint">{proj.tipo}</p>
                <div>
                  <div className="mb-1 flex justify-between text-[0.7rem] text-silver-dim">
                    <span>Avance</span>
                    <span className="font-mono text-electric-400">{proj.progreso}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-void">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-electric-900 to-electric-600"
                      style={{ width: `${proj.progreso}%` }}
                    />
                  </div>
                </div>
                <p className="mt-auto text-center font-mono text-[0.6rem] uppercase tracking-widest text-silver-faint">
                  Clic en la carpeta para ver archivos
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}

      {view === 'updates' && (
        <GlassCard className="p-7">
          <h2 className="mb-6 font-display text-xl font-semibold text-white">Actualizaciones recientes</h2>
          <ol className="flex flex-col gap-5">
            {PORTAL_UPDATES.map((u) => (
              <li key={u.fecha} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-electric-600 shadow-glow-soft" />
                  <span className="mt-1 w-px flex-1 bg-white/10" />
                </div>
                <div>
                  <p className="font-mono text-xs text-silver-faint">{u.fecha}</p>
                  <p className="text-sm text-silver-dim">{u.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}

      {view === 'soporte' && (
        <GlassCard className="flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-white">¿Necesitas algo?</h2>
            <p className="text-sm text-silver-dim">
              Escríbeme directo por WhatsApp. Cambios menores de tu plan van incluidos.
            </p>
          </div>
          <a
            className="btn btn-primary flex-none"
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> {SITE.whatsapp.display}
          </a>
        </GlassCard>
      )}

      {view === 'cuenta' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { k: 'Cliente', v: PORTAL_CLIENT.nombre },
            { k: 'Contacto', v: PORTAL_CLIENT.contacto },
            { k: 'Plan', v: PORTAL_CLIENT.plan },
            { k: 'Cliente desde', v: PORTAL_CLIENT.desde },
          ].map((f) => (
            <GlassCard key={f.k} className="p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-silver-faint">{f.k}</p>
              <p className="mt-1 font-display text-lg text-white">{f.v}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
