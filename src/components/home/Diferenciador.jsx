import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Clock, ImageIcon, Pencil, Zap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// The differentiator gets its own section (docs/01 §5), not a list item. The
// mockup shows the WHOLE product in one glance: the owner's panel on the left,
// the public page on the right, and every change syncing live between them on
// a slow loop — "esto cambia en vivo" without needing interaction (docs/04).
// Data is fictional — no sensitive client info.
const PRODUCTO = 'Pastel Tres Leches';
const STATES = [
  { promo: null, precio: '$180', foto: '#0A1F55' },
  { promo: '2x1 los martes', precio: '$150', foto: '#1E5BFF' },
];

function useSyncLoop() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % STATES.length), 4200);
    return () => clearInterval(id);
  }, [reduced]);

  // flash the "Publicado" toast right after each state change
  useEffect(() => {
    if (reduced || i === 0) return;
    setPublished(true);
    const t = setTimeout(() => setPublished(false), 1700);
    return () => clearTimeout(t);
  }, [i, reduced]);

  return { s: STATES[i], published };
}

function MiniLabel({ children, tone = 'dim' }) {
  return (
    <p
      className={`mb-2 font-mono text-[0.58rem] uppercase tracking-[0.24em] ${
        tone === 'accent' ? 'text-electric-400' : 'text-silver-faint'
      }`}
    >
      {children}
    </p>
  );
}

function PanelSync() {
  const { s, published } = useSyncLoop();

  return (
    <GlassCard className="w-full p-4 sm:p-5">
      {/* toolbar */}
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-electric-400">
          <span className="h-2 w-2 rounded-full bg-electric-600 animate-pulse-dot" />
          Panel · Confetti
        </span>
        <span className="rounded-md border border-electric-600/40 bg-electric-600/15 px-2 py-1 font-mono text-[0.6rem] text-electric-400">
          Editando
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        {/* left: the owner's editor */}
        <div className="flex flex-col rounded-xl border border-white/10 bg-void/50 p-3">
          <MiniLabel>Tu panel</MiniLabel>
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 flex-none overflow-hidden rounded-lg">
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
                  <ImageIcon size={18} className="text-white/70" strokeWidth={1.5} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold text-white">{PRODUCTO}</p>
              {/* price rendered as an editable field */}
              <div className="mt-1.5 flex items-center gap-2">
                <span className="rounded-md border border-electric-600/40 bg-void px-2 py-1 font-mono text-sm font-semibold text-electric-400">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={s.precio}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.35 }}
                      className="inline-block"
                    >
                      {s.precio}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="grid h-7 w-7 flex-none place-items-center rounded-md border border-electric-600/40 bg-electric-600/15">
                  <Pencil size={12} className="text-electric-400" strokeWidth={1.5} />
                </span>
              </div>
            </div>
          </div>
          <label className="mt-3 flex items-center gap-2 font-mono text-[0.62rem] text-silver-dim">
            <span
              className={`grid h-3.5 w-3.5 place-items-center rounded border transition-colors duration-300 ${
                s.promo ? 'border-electric-400 bg-electric-600' : 'border-white/20 bg-void'
              }`}
            >
              {s.promo && <Check size={9} strokeWidth={3} className="text-white" />}
            </span>
            Promoción activa
          </label>
        </div>

        {/* sync arrow */}
        <div className="hidden flex-col items-center justify-center gap-1.5 px-1 text-electric-400 sm:flex" aria-hidden="true">
          <ArrowRight size={17} strokeWidth={1.5} className="animate-pulse-dot" />
          <span className="font-mono text-[0.5rem] uppercase tracking-[0.3em] text-silver-faint">en vivo</span>
        </div>

        {/* right: the public page, updating by itself */}
        <div className="relative flex flex-col rounded-xl border border-white/10 bg-void p-3">
          <AnimatePresence>
            {published && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="absolute -top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-electric-600 px-2.5 py-1 font-mono text-[0.58rem] font-semibold text-white shadow-glow-soft"
              >
                <Check size={10} strokeWidth={3} /> Publicado
              </motion.span>
            )}
          </AnimatePresence>

          <MiniLabel tone="accent">Tu página pública</MiniLabel>
          {/* fake browser chrome */}
          <div className="mb-2 flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="ml-1 h-3 flex-1 rounded-full bg-white/5 px-2 font-mono text-[0.5rem] leading-3 text-silver-faint">
              confetti.mx
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-void-2/60 p-2.5">
            <div className="relative h-12 w-12 flex-none overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.foto}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="h-full w-full"
                  style={{ background: `linear-gradient(135deg, ${s.foto}, #0B1120)` }}
                />
              </AnimatePresence>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{PRODUCTO}</p>
              <div className="mt-0.5 flex items-center gap-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={s.precio}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                    className="font-mono text-base font-semibold text-electric-400"
                  >
                    {s.precio}
                  </motion.span>
                </AnimatePresence>
                <AnimatePresence>
                  {s.promo && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-full bg-electric-600/20 px-2 py-0.5 font-mono text-[0.55rem] text-electric-400"
                    >
                      {s.promo}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
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
      <div className="container-mh grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading
            index="02"
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
            <PanelSync />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
