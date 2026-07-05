import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { CASOS } from '../../data/casos';
import { whatsappLink } from '../../lib/whatsapp';

// Case studies in "folio" format (docs/01 · docs/03). Liquid-glass cards with a
// giant ghost numeral (editorial scale contrast), a live status dot (the brand
// "punto azul" pulsing → "sistema en vivo") and a per-case WhatsApp CTA that
// turns proof into conversation.
export default function Casos() {
  return (
    <section id="casos" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="03"
          eyebrow="Sistemas construidos"
          title="Negocios reales de CDMX, ya operando"
          lead="Estos no son mockups. Son sistemas en producción, con dueños con nombre y operación diaria."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {CASOS.map((c, i) => (
            <Reveal key={c.folio} delay={(i % 2) * 0.08}>
              <GlassCard interactive className="group flex h-full flex-col gap-4 overflow-hidden p-6 sm:p-7">
                {/* ghost numeral — editorial scale contrast */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-7 right-2 select-none font-display text-[7.5rem] font-bold leading-none text-white/[0.035] transition-colors duration-700 ease-out-brand group-hover:text-electric-400/[0.07]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <header className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-electric-400">
                    <span className="h-2 w-2 rounded-full bg-electric-600 animate-pulse-dot" />
                    {c.folio}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-silver-faint">
                    En operación
                  </span>
                </header>

                <h3 className="relative font-display text-2xl font-semibold text-white">{c.cliente}</h3>
                <p className="relative flex-1 text-sm leading-relaxed text-silver-dim">{c.resumen}</p>

                <ul className="relative flex flex-wrap gap-2 pt-1">
                  {c.stack.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/10 bg-void/50 px-3 py-1 font-mono text-[0.68rem] text-silver-dim transition-colors duration-300 group-hover:border-electric-600/25"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(
                    `Hola Miguel 👋 Vi el caso ${c.folio} (${c.cliente}) y quiero un sistema similar para mi negocio.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta relative mt-1 inline-flex w-fit items-center gap-1.5 border-t border-white/8 pt-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-electric-400 transition-colors duration-300 hover:text-white"
                >
                  Quiero un sistema así
                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.75}
                    className="transition-transform duration-400 ease-out-brand group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                  />
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
