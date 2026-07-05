import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';

// Services as an icon + label list — the exact flyer pattern (docs/02 · docs/03),
// not generic cards. The highlighted item (panel de autoedición) carries a
// discreet permanent blue glow instead of a "NUEVO" badge (docs/04).
export default function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          eyebrow="Qué hago"
          title="Servicios que digitalizan tu operación"
          lead={SITE.support}
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.04}>
              <article
                className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-300 ease-out-brand sm:p-5 ${
                  s.highlight
                    ? 'border-electric-600/50 bg-electric-900/20 shadow-glow-soft'
                    : 'border-white/8 bg-void-2/40 hover:border-electric-600/40 hover:bg-void-2/70'
                }`}
              >
                <span
                  className={`grid h-12 w-12 flex-none place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${
                    s.highlight ? 'border-electric-400/60 bg-electric-600/15' : 'border-electric-600/30 bg-void/50'
                  }`}
                >
                  <s.icon size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-white">
                      {s.label}
                    </h3>
                    {s.highlight && (
                      <span className="rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-electric-400">
                        Destacado
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-silver-dim">{s.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
