import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Search, FileText, Hammer, Rocket, ChevronsDown } from 'lucide-react';
import { PROCESO } from '../../data/proceso';
import GlassSurface from '../reactbits/GlassSurface';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Scroll-driven step reveal. The heavy frame-scrub background was dropped (client:
// too heavy, didn't love it) — we keep the liquid-glass cards refracting the brand
// base, and make the "swipe to advance" hint pop.
const ICONS = [Search, FileText, Hammer, Rocket];

// desktop: each card reveals as scroll crosses its threshold, then stays
const THRESHOLDS = [0.14, 0.34, 0.54, 0.74];
// mobile: one card at a time across these bands
const BAND = (0.94 - 0.08) / PROCESO.length;

function StepBody({ step, index }) {
  const Icon = ICONS[index];
  return (
    <div className="flex h-full w-full flex-col justify-between p-5 text-left sm:p-6">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-xl border border-electric-600/40 bg-electric-900/40">
          <Icon size={20} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
        </span>
        <span className="font-mono text-4xl font-semibold text-white/[0.1]">{step.n}</span>
      </div>
      <div>
        <div className="dot-line mb-3" />
        <h3 className="font-display text-lg font-semibold text-white">{step.titulo}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-silver-dim">{step.desc}</p>
      </div>
    </div>
  );
}

function DesktopCard({ progress, index, step }) {
  const t = THRESHOLDS[index];
  const opacity = useTransform(progress, [t, t + 0.12], [0, 1]);
  const y = useTransform(progress, [t, t + 0.12], [64, 0]);
  const scale = useTransform(progress, [t, t + 0.12], [0.92, 1]);
  return (
    <motion.div style={{ opacity, y, scale }} className="relative h-[236px]">
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={22}
        backgroundOpacity={0.06}
        brightness={60}
        blur={11}
        distortionScale={-150}
        greenOffset={12}
        blueOffset={22}
        className="w-full"
      >
        <StepBody step={step} index={index} />
      </GlassSurface>
    </motion.div>
  );
}

function Showcase() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const lineScale = useTransform(scrollYProgress, [0.14, 0.82], [0, 1]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // scroll → active band (mobile shows one card at a time)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.max(0, Math.min(PROCESO.length - 1, Math.floor((p - 0.08) / BAND)));
    setActive(i);
  });

  return (
    <section id="proceso" ref={sectionRef} className="relative h-[210vh] scroll-mt-28 md:h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* brand base — the liquid-glass cards refract this */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 70% at 70% 12%, rgba(30,91,255,0.16), transparent 60%),' +
              'linear-gradient(180deg, #070B16, #0B1120 60%, #070B16)',
          }}
        />
        <div className="absolute inset-0 bg-circuit opacity-[0.22]" aria-hidden="true" />
        {/* edge fades so the section blends */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-void to-transparent" />

        <div className="container-mh relative z-10">
          <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10">
            <span className="eyebrow">
              <span className="dot-line" />
              Cómo trabajamos <span className="text-silver-faint tracking-[0.2em]">/03</span>
            </span>
            <h2 className="text-section-title font-semibold text-white">Un proceso claro, sin sorpresas</h2>
            <p className="max-w-xl text-balance text-sm text-silver-dim sm:text-base">
              Del diagnóstico a la entrega, ves avances en el camino y sabes exactamente qué recibes.
            </p>
          </div>

          {isMobile ? (
            // MOBILE — one card at a time (appear → disappear → next), refracting the frame
            <div className="relative mx-auto flex h-[280px] max-w-sm items-center justify-center">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 h-[260px]"
                >
                  <GlassSurface
                    width="100%"
                    height="100%"
                    borderRadius={24}
                    backgroundOpacity={0.06}
                    brightness={60}
                    blur={11}
                    distortionScale={-150}
                    greenOffset={12}
                    blueOffset={22}
                    className="w-full"
                  >
                    <StepBody step={PROCESO[active]} index={active} />
                  </GlassSurface>
                </motion.div>
              </AnimatePresence>
              {/* dots */}
              <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-1.5">
                {PROCESO.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === active ? 'w-6 bg-electric-600' : 'w-2.5 bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // DESKTOP — the four cards build up in a row, refracting the frame
            <div className="relative">
              <motion.span
                aria-hidden="true"
                style={{ scaleX: lineScale }}
                className="pointer-events-none absolute left-10 right-10 top-[3.4rem] hidden h-px origin-left bg-gradient-to-r from-electric-600/50 via-electric-400/40 to-electric-600/0 lg:block"
              />
              <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {PROCESO.map((step, i) => (
                  <li key={step.n}>
                    <DesktopCard progress={scrollYProgress} index={i} step={step} />
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-14 flex justify-center sm:mt-10">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-electric-400/50 bg-electric-600/20 px-5 py-2.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.28em] text-chrome-highlight shadow-[0_0_28px_-4px_rgba(30,91,255,0.75)]">
              <span className="h-1.5 w-1.5 rounded-full bg-electric-400 animate-pulse-dot" />
              Desliza para avanzar
              <ChevronsDown size={15} strokeWidth={2} className="animate-bounce text-electric-400" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Reduced-motion fallback: static frame + the 4 glass cards, no scrubbing.
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
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.n} className="glass-card flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-electric-600/40 bg-electric-900/25">
                    <Icon size={20} strokeWidth={1.5} className="text-electric-400" />
                  </span>
                  <span className="font-mono text-4xl font-semibold text-white/[0.08]">{step.n}</span>
                </div>
                <div className="dot-line" />
                <h3 className="font-display text-lg font-semibold text-white">{step.titulo}</h3>
                <p className="text-sm leading-relaxed text-silver-dim">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function ProcesoShowcase() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticSteps /> : <Showcase />;
}
