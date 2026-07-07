import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, FileText, Hammer, Rocket, ChevronsDown } from 'lucide-react';
import { PROCESO } from '../../data/proceso';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Proceso = sticky stacking cards (client-provided component, adapted per docs/10):
// each card pins to the viewport center and the previous ones scale down beneath
// it as you scroll — a deck building up. Adaptations: no ReactLenis (smooth-scroll
// hijack broke mobile scroll on this site before — native scroll only), no global
// scrollbar hiding, and the cards are redesigned as CLAY (claymorphism) panels in
// the brand blues instead of white photo frames.
const ICONS = [Search, FileText, Hammer, Rocket];

// Very subtle tilts — natural scatter without looking messy (from the source).
const CARD_ROTATIONS = [-1.4, 1.0, -0.8, 1.6];

// Dark-brand claymorphism: puffy rounded surface, light inset top-left, dark
// inset bottom-right, deep soft drop shadow.
const CLAY_CARD = {
  background: 'linear-gradient(145deg, #1d2f5e 0%, #13204a 52%, #0d1836 100%)',
  boxShadow:
    'inset 5px 5px 12px rgba(191,214,255,0.14), inset -7px -7px 16px rgba(3,7,18,0.65), 0 30px 60px -18px rgba(30,91,255,0.4), 0 14px 30px rgba(0,0,0,0.45)',
};
const CLAY_CHIP = {
  background: 'linear-gradient(145deg, #2e5cff 0%, #1a3fb8 100%)',
  boxShadow:
    'inset 3px 3px 7px rgba(191,214,255,0.4), inset -4px -4px 8px rgba(6,16,48,0.55), 0 10px 22px -6px rgba(30,91,255,0.6)',
};

function ClayBody({ step, index }) {
  const Icon = ICONS[index];
  return (
    <div className="relative flex flex-col gap-5 p-8 sm:p-9">
      {/* soft clay sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 -top-12 h-40 w-40 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(191,214,255,0.14), transparent 65%)' }}
      />

      <div className="flex items-center justify-between">
        <span className="grid h-16 w-16 place-items-center rounded-2xl" style={CLAY_CHIP}>
          <Icon size={26} strokeWidth={1.5} className="text-white drop-shadow-[0_2px_4px_rgba(6,16,48,0.6)]" aria-hidden="true" />
        </span>
        <span
          className="font-display text-6xl font-bold text-transparent"
          style={{ WebkitTextStroke: '1.5px rgba(91,140,255,0.4)' }}
        >
          {step.n}
        </span>
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold text-white">{step.titulo}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-silver-dim sm:text-base">{step.desc}</p>
      </div>

      {/* caption strip (kept from the source component, restyled) */}
      <div className="mt-1 flex items-center justify-between border-t border-white/8 pt-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-silver-faint">
          Paso {step.n} / {String(PROCESO.length).padStart(2, '0')}
        </span>
        <span className="flex gap-1.5">
          {PROCESO.map((_, k) => (
            <span key={k} className={`h-1.5 w-1.5 rounded-full ${k <= index ? 'bg-electric-400' : 'bg-white/12'}`} />
          ))}
        </span>
      </div>
    </div>
  );
}

function StickyClayCard({ i, step, progress, range, targetScale }) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotation = CARD_ROTATIONS[i % CARD_ROTATIONS.length];

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.div
        style={{ scale, rotate: rotation, top: `${i * 26 - 44}px`, ...CLAY_CARD }}
        className="relative w-[min(93vw,560px)] origin-top overflow-hidden rounded-[32px]"
      >
        <ClayBody step={step} index={i} />
      </motion.div>
    </div>
  );
}

function Showcase() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });

  return (
    <section id="proceso" ref={container} className="relative scroll-mt-28 pt-section">
      {/* header + glowing hint */}
      <div className="container-mh flex flex-col items-center gap-3 text-center">
        <span className="eyebrow">
          <span className="dot-line" />
          Cómo trabajamos <span className="text-silver-faint tracking-[0.2em]">/03</span>
        </span>
        <h2 className="text-section-title font-semibold text-white">Un proceso claro, sin sorpresas</h2>
        <p className="max-w-xl text-balance text-sm text-silver-dim sm:text-base">
          Del diagnóstico a la entrega, ves avances en el camino y sabes exactamente qué recibes.
        </p>
        <span className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-electric-400/50 bg-electric-600/20 px-5 py-2.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.28em] text-chrome-highlight shadow-[0_0_28px_-4px_rgba(30,91,255,0.75)]">
          <span className="h-1.5 w-1.5 rounded-full bg-electric-400 animate-pulse-dot" />
          Desliza para avanzar
          <ChevronsDown size={15} strokeWidth={2} className="animate-bounce text-electric-400" aria-hidden="true" />
        </span>
      </div>

      {/* the stacking deck — minimal trailing space so it flows straight into
          the sign-off (no dead gap that reads like the page ended) */}
      <div className="relative pb-[8vh]">
        {PROCESO.map((step, i) => (
          <StickyClayCard
            key={step.n}
            i={i}
            step={step}
            progress={scrollYProgress}
            range={[i * 0.22, 1]}
            targetScale={Math.max(0.5, 1 - (PROCESO.length - i - 1) * 0.07)}
          />
        ))}
      </div>
    </section>
  );
}

// Reduced-motion fallback: the same clay cards, plain grid, no pinning.
function StaticSteps() {
  return (
    <section id="proceso" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            <span className="dot-line" />
            Cómo trabajamos <span className="text-silver-faint tracking-[0.2em]">/03</span>
          </span>
          <h2 className="text-section-title font-semibold text-white">Un proceso claro, sin sorpresas</h2>
        </div>
        <ol className="grid gap-6 sm:grid-cols-2">
          {PROCESO.map((step, i) => (
            <li key={step.n} className="overflow-hidden rounded-[30px]" style={CLAY_CARD}>
              <ClayBody step={step} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function ProcesoShowcase() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticSteps /> : <Showcase />;
}
