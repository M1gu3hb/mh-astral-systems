import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import { CASOS } from '../../data/casos';
import { whatsappLink } from '../../lib/whatsapp';

// The four cases in their original grid design (client liked how they looked) —
// but the whole block expands: click "Ver los 4 sistemas" and the grid reveals.
export default function Casos() {
  const [open, setOpen] = useState(false);

  return (
    <section id="casos" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="03"
          eyebrow="Sistemas construidos"
          title="Negocios reales de CDMX, ya operando"
          lead="Estos no son mockups. Son sistemas en producción, con dueños con nombre y operación diaria."
        />

        {/* expand toggle */}
        <Reveal delay={0.05}>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group mt-8 flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-void-2/40 p-4 text-left transition-colors duration-300 hover:border-electric-600/40 sm:p-5"
          >
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-electric-400">04 sistemas</span>
              <span className="hidden text-silver-faint sm:inline">·</span>
              <span className="text-sm text-silver-dim">
                {CASOS.map((c) => c.cliente.split(' ').slice(-1)[0]).join(' · ')}
              </span>
            </span>
            <span className="inline-flex flex-none items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white">
              {open ? 'Ocultar' : 'Ver los 4 sistemas'}
              <span
                className={`grid h-9 w-9 place-items-center rounded-full border border-electric-600/40 bg-electric-900/25 text-electric-400 transition-transform duration-500 ease-out-brand ${
                  open ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
              </span>
            </span>
          </button>
        </Reveal>

        {/* the 4 cards — reveal on expand */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.35 } }}
              className="overflow-hidden"
            >
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {CASOS.map((c, i) => (
                  <motion.div
                    key={c.folio}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <GlassCard interactive className="group relative flex h-full flex-col gap-4 overflow-hidden p-6 sm:p-7">
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
