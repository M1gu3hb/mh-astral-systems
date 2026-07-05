import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Plus } from 'lucide-react';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { CASOS } from '../../data/casos';
import { whatsappLink } from '../../lib/whatsapp';

// Case studies as an expandable list (client request: they should expand, not
// all show at once). Compact liquid-glass rows; click to open one — its detail
// (resumen, stack, per-case CTA) reveals with a spring height animation. The
// first case starts open so the section reads immediately.
export default function Casos() {
  const [open, setOpen] = useState(0);

  return (
    <section id="casos" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="03"
          eyebrow="Sistemas construidos"
          title="Negocios reales de CDMX, ya operando"
          lead="Estos no son mockups. Son sistemas en producción, con dueños con nombre y operación diaria. Ábrelos para ver el detalle."
        />

        <div className="mt-12 flex flex-col gap-4">
          {CASOS.map((c, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={c.folio} delay={i * 0.05}>
                <div
                  className={`glass-card overflow-hidden transition-shadow duration-500 ${
                    isOpen ? 'glass-card--interactive shadow-glow' : ''
                  }`}
                >
                  {/* header — always visible, toggles open */}
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  >
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-electric-400">
                      <span className="h-2 w-2 rounded-full bg-electric-600 animate-pulse-dot" />
                      {c.folio}
                    </span>
                    <h3 className="flex-1 font-display text-lg font-semibold text-white sm:text-xl">
                      {c.cliente}
                    </h3>
                    <span className="hidden font-mono text-[0.62rem] uppercase tracking-widest text-silver-faint sm:inline">
                      En operación
                    </span>
                    <span
                      className={`grid h-9 w-9 flex-none place-items-center rounded-full border border-electric-600/40 bg-electric-900/25 text-electric-400 transition-transform duration-500 ease-out-brand ${
                        isOpen ? 'rotate-[135deg]' : ''
                      }`}
                    >
                      <Plus size={16} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </button>

                  {/* body — expands */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.3 } }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 border-t border-white/8 px-5 pb-6 pt-5 sm:px-6">
                          <p className="max-w-2xl text-sm leading-relaxed text-silver-dim">{c.resumen}</p>
                          <ul className="flex flex-wrap gap-2">
                            {c.stack.map((tag) => (
                              <li
                                key={tag}
                                className="rounded-full border border-white/10 bg-void/50 px-3 py-1 font-mono text-[0.68rem] text-silver-dim"
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
                            className="group inline-flex w-fit items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-electric-400 transition-colors duration-300 hover:text-white"
                          >
                            Quiero un sistema así
                            <ArrowUpRight
                              size={13}
                              strokeWidth={1.75}
                              className="transition-transform duration-300 ease-out-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
