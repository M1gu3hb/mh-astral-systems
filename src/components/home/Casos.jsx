import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { CASOS } from '../../data/casos';

// Case studies in "folio" format (docs/01 · docs/03). Liquid-glass cards with
// a live status dot (the brand "punto azul" motif, gently pulsing → "sistema en
// vivo") and hover elevation + border glow (docs/04).
export default function Casos() {
  return (
    <section id="casos" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          eyebrow="Sistemas construidos"
          title="Negocios reales de CDMX, ya operando"
          lead="Estos no son mockups. Son sistemas en producción, con dueños con nombre y operación diaria."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {CASOS.map((c, i) => (
            <Reveal key={c.folio} delay={(i % 2) * 0.08}>
              <GlassCard interactive className="flex h-full flex-col gap-4 p-6 sm:p-7">
                <header className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-electric-400">
                    <span className="h-2 w-2 rounded-full bg-electric-600 animate-pulse-dot" />
                    {c.folio}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-silver-faint">
                    En operación
                  </span>
                </header>

                <h3 className="font-display text-2xl font-semibold text-white">{c.cliente}</h3>
                <p className="flex-1 text-sm leading-relaxed text-silver-dim">{c.resumen}</p>

                <ul className="flex flex-wrap gap-2 pt-1">
                  {c.stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-void/50 px-3 py-1 font-mono text-[0.68rem] text-silver-dim"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
