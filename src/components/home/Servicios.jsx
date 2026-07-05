import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Services as an icon + label list — the exact flyer pattern (docs/02 · docs/03),
// not generic cards. Editorial index numbers, a reveal arrow on hover, and the
// highlighted item (panel de autoedición) with a discreet permanent blue glow
// instead of a "NUEVO" badge (docs/04).
export default function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Servicios que digitalizan tu operación"
          lead={SITE.support}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.04}>
              <a
                href={whatsappLink(s.highlight ? WA_MESSAGES.panel : WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={`cursor-card group flex h-full items-start gap-4 overflow-hidden rounded-2xl border p-4 transition-all duration-500 ease-out-brand sm:p-5 ${
                  s.highlight
                    ? 'border-electric-600/50 bg-electric-900/20 shadow-glow-soft hover:border-electric-400/70'
                    : 'border-white/8 bg-void-2/40 hover:-translate-y-0.5 hover:border-electric-600/40 hover:bg-void-2/70'
                }`}
              >
                <span
                  className={`grid h-12 w-12 flex-none place-items-center rounded-xl border transition-transform duration-500 ease-out-brand group-hover:scale-105 ${
                    s.highlight ? 'border-electric-400/60 bg-electric-600/15' : 'border-electric-600/30 bg-void/50'
                  }`}
                >
                  <s.icon size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
                </span>

                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-white">
                      {s.label}
                    </h3>
                    {s.highlight && (
                      <span className="rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-electric-400">
                        Destacado
                      </span>
                    )}
                  </span>
                  <span className="text-sm leading-relaxed text-silver-dim">{s.desc}</span>
                </span>

                <span className="ml-1 flex flex-none flex-col items-end gap-2">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-silver-faint">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="translate-y-1 text-electric-400 opacity-0 transition-all duration-500 ease-out-brand group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
