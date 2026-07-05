import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, GripVertical, Eye, Pencil } from 'lucide-react';
import DashboardShell from '../components/app/DashboardShell';
import GlassCard from '../components/ui/GlassCard';
import { isAuthed } from '../lib/stubAuth';
import { ADMIN_STATS, ADMIN_SECTIONS } from '../data/admin';
import { CASOS } from '../data/casos';
import { TIERS } from '../data/tiers';
import { BLOG_POSTS } from '../data/blog';
import { SITE, HERO } from '../data/site';

const DemoNote = () => (
  <p className="mt-4 rounded-lg border border-electric-600/20 bg-electric-900/20 px-3 py-2 font-mono text-[0.7rem] text-electric-400">
    Demo · los cambios no se guardan todavía (sin backend — fase 2).
  </p>
);

// /admin/dashboard — internal panel skeleton (docs/06 §9). Reads the same mock
// data the site uses, presented as the CRUD surface it will eventually manage
// (docs/05). Nothing persists in phase 1.
export default function AdminDashboard() {
  if (!isAuthed('admin')) return <Navigate to="/admin" replace />;

  const [tab, setTab] = useState('casos');

  return (
    <DashboardShell
      scope="admin"
      badge="Panel interno"
      title="Panel de administración"
      subtitle={`Bienvenido, ${SITE.owner.split(' ')[0]}.`}
    >
      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((s) => (
          <GlassCard key={s.label} className="p-5">
            <p className="font-mono text-xs uppercase tracking-wider text-silver-faint">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-silver-dim">{s.hint}</p>
          </GlassCard>
        ))}
      </div>

      {/* section tabs */}
      <div className="mt-10 flex flex-wrap gap-2">
        {ADMIN_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setTab(s.id)}
            className={`rounded-pill px-4 py-2 text-sm transition-colors ${
              tab === s.id
                ? 'bg-electric-600 text-white'
                : 'border border-white/10 text-silver-dim hover:border-electric-600/40 hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <GlassCard className="mt-5 p-6 sm:p-7">
        {tab === 'casos' && <CasosPanel />}
        {tab === 'precios' && <PreciosPanel />}
        {tab === 'blog' && <BlogPanel />}
        {tab === 'config' && <ConfigPanel />}
      </GlassCard>
    </DashboardShell>
  );
}

function PanelHead({ title, desc, cta }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h2 className="font-display text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-silver-dim">{desc}</p>
      </div>
      {cta && (
        <button className="btn btn-ghost flex-none" type="button">
          <Plus size={16} /> {cta}
        </button>
      )}
    </div>
  );
}

function CasosPanel() {
  return (
    <div>
      <PanelHead title="Casos de éxito" desc="Ordena, publica o edita los folios SIS-XX." cta="Nuevo caso" />
      <div className="flex flex-col gap-2">
        {CASOS.map((c) => (
          <div
            key={c.folio}
            className="flex items-center gap-3 rounded-xl border border-white/8 bg-void/40 p-3 sm:p-4"
          >
            <GripVertical size={16} className="flex-none cursor-grab text-silver-faint" />
            <span className="font-mono text-xs text-electric-400">{c.folio}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{c.cliente}</p>
              <p className="truncate text-xs text-silver-dim">{c.stack.join(' · ')}</p>
            </div>
            <span className="hidden rounded-full border border-electric-600/30 px-2 py-0.5 font-mono text-[0.6rem] uppercase text-electric-400 sm:inline">
              Publicado
            </span>
            <button className="rounded-lg border border-white/10 p-2 text-silver-dim hover:text-white" title="Editar">
              <Pencil size={14} />
            </button>
          </div>
        ))}
      </div>
      <DemoNote />
    </div>
  );
}

function PreciosPanel() {
  return (
    <div>
      <PanelHead title="Servicios y precios" desc="Tiers, features y el destacado “más elegido”." cta="Nuevo tier" />
      <div className="grid gap-3 md:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.nombre} className="rounded-xl border border-white/8 bg-void/40 p-4">
            <div className="flex items-center justify-between">
              <p className="font-display font-semibold text-white">{t.nombre}</p>
              {t.destacado && (
                <span className="rounded-full bg-electric-600/20 px-2 py-0.5 font-mono text-[0.55rem] uppercase text-electric-400">
                  Destacado
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-sm text-electric-400">{t.precio}</p>
            <ul className="mt-3 space-y-1 text-xs text-silver-dim">
              {t.features.map((f) => (
                <li key={f}>· {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <DemoNote />
    </div>
  );
}

function BlogPanel() {
  return (
    <div>
      <PanelHead title="Blog" desc="Editor de posts en markdown, publicar u ocultar." cta="Nuevo post" />
      <div className="flex flex-col gap-2">
        {BLOG_POSTS.map((p) => (
          <div key={p.slug} className="flex items-center gap-3 rounded-xl border border-white/8 bg-void/40 p-3 sm:p-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-white">{p.titulo}</p>
              <p className="truncate text-xs text-silver-dim">/{p.slug}</p>
            </div>
            <span className="hidden font-mono text-xs text-silver-faint sm:inline">{p.fecha}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-electric-600/30 px-2.5 py-1 font-mono text-[0.6rem] uppercase text-electric-400">
              <Eye size={12} /> Publicado
            </span>
          </div>
        ))}
      </div>
      <DemoNote />
    </div>
  );
}

function Field({ label, value }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-xs uppercase tracking-wider text-silver-faint">{label}</span>
      <input
        defaultValue={value}
        className="rounded-xl border border-white/10 bg-void/60 px-3 py-2.5 text-sm text-white focus:border-electric-600/60 focus:outline-none"
      />
    </label>
  );
}

function ConfigPanel() {
  return (
    <div>
      <PanelHead title="Configuración del sitio" desc="WhatsApp, headline del hero y redes." />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="WhatsApp" value={SITE.whatsapp.display} />
        <Field label="Correo" value={SITE.email} />
        <div className="sm:col-span-2">
          <Field label="Headline del hero" value={`${HERO.headlineLead} ${HERO.headlineHighlight} ${HERO.headlineTail}`} />
        </div>
        <div className="sm:col-span-2">
          <Field label="Sub-headline" value={HERO.sub} />
        </div>
      </div>
      <button className="btn btn-primary mt-5" type="button">
        Guardar cambios
      </button>
      <DemoNote />
    </div>
  );
}
