import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Clock, ImageIcon, Pencil, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// The differentiator gets its own section (docs/01 §5), not a list item. A mock
// of a Confetti-style owner panel auto cross-fades between two states on a slow
// loop to communicate "esto cambia en vivo" without needing interaction
// (docs/04). Data is fictional — no sensitive client info.
const STATES = [
  { promo: 'Sin promoción', precio: '$180', destacado: false, foto: '#0A1F55' },
  { promo: '2x1 los martes', precio: '$150', destacado: true, foto: '#1E5BFF' },
];

function PanelMockup() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % STATES.length), 3400);
    return () => clearInterval(id);
  }, [reduced]);

  const s = STATES[i];

  return (
    <GlassCard className="w-full p-4 sm:p-5">
      {/* fake panel toolbar */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-electric-400">
          <span className="h-2 w-2 rounded-full bg-electric-600 animate-pulse-dot" />
          Panel · Confetti
        </span>
        <span className="rounded-md border border-electric-600/40 bg-electric-600/15 px-2 py-1 font-mono text-[0.6rem] text-electric-400">
          Editando
        </span>
      </div>

      {/* editable product row */}
      <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-void/50 p-3">
        <div className="relative h-16 w-16 flex-none overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.foto}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="grid h-full w-full place-items-center"
              style={{ background: `linear-gradient(135deg, ${s.foto}, #0B1120)` }}
            >
              <ImageIcon size={20} className="text-white/70" strokeWidth={1.5} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display font-semibold text-white">Pastel Tres Leches</p>
          <div className="mt-1 flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={s.precio}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-lg font-semibold text-electric-400"
              >
                {s.precio}
              </motion.span>
            </AnimatePresence>
            <AnimatePresence>
              {s.destacado && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="rounded-full bg-electric-600/20 px-2 py-0.5 font-mono text-[0.6rem] text-electric-400"
                >
                  {s.promo}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-electric-600/40 bg-electric-600/15">
          <Pencil size={16} className="text-electric-400" strokeWidth={1.5} />
        </span>
      </div>

      <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-widest text-silver-faint">
        Lo cambias tú · se ve al instante
      </p>
    </GlassCard>
  );
}

export default function Diferenciador() {
  return (
    <section id="diferenciador" className="scroll-mt-28 overflow-hidden py-section">
      <div className="container-mh grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="El diferenciador"
            title="Tu página, editable por ti"
            lead="El problema no es técnico, es de negocio: si dependes de tu desarrollador para cada cambio menor, esperas — y mientras esperas, no vendes. El panel de autoedición quita ese cuello de botella."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-white/8 bg-void-2/40 p-4">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-silver-faint">
                  <Clock size={15} strokeWidth={1.5} /> Sin panel
                </span>
                <p className="text-sm leading-relaxed text-silver-dim">
                  Le escribes a Miguel, esperas, y el cambio llega cuando puede. Las promos salen tarde.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col gap-2 rounded-2xl border border-electric-600/40 bg-electric-900/20 p-4 shadow-glow-soft">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-electric-400">
                  <Zap size={15} strokeWidth={1.5} /> Con panel
                </span>
                <p className="text-sm leading-relaxed text-white/85">
                  Lo cambias tú en segundos y se ve al instante. Precios correctos, promos a tiempo.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="flex flex-col gap-2 pt-1">
            {['Editas fotos, precios y promociones tú mismo', 'Nació de la experiencia real con Confetti', 'Se incluye en el tier Autónomo'].map(
              (t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-silver-dim">
                  <Check size={16} className="flex-none text-electric-400" strokeWidth={2} />
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <Reveal delay={0.1} y={30}>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-electric-600/10 blur-3xl" />
            <PanelMockup />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
