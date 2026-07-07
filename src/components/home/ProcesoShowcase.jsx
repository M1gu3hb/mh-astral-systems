import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, FileText, Hammer, Rocket } from 'lucide-react';
import { PROCESO } from '../../data/proceso';
import VideoBackdrop from '../backgrounds/VideoBackdrop';
import GlassSurface from '../reactbits/GlassSurface';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Video slot — drop the Google Flow clip here as /public/media/proceso-loop.mp4
const PROCESO_VIDEO = '/media/proceso-loop.mp4';
const ICONS = [Search, FileText, Hammer, Rocket];

// each card reveals as scroll crosses its threshold, then stays put
const THRESHOLDS = [0.14, 0.34, 0.54, 0.74];

function StepCard({ progress, index, step }) {
  const t = THRESHOLDS[index];
  const opacity = useTransform(progress, [t, t + 0.12], [0, 1]);
  const y = useTransform(progress, [t, t + 0.12], [64, 0]);
  const scale = useTransform(progress, [t, t + 0.12], [0.92, 1]);
  const blurN = useTransform(progress, [t, t + 0.12], [14, 0]);
  const filter = useTransform(blurN, (b) => `blur(${b}px)`);
  const Icon = ICONS[index];

  return (
    <motion.div style={{ opacity, y, scale, filter }} className="relative h-[236px]">
      {/* SAME liquid-glass component as the header — refracts the ambient
          background behind it, like water */}
      <GlassSurface
        width="100%"
        height="100%"
        borderRadius={22}
        backgroundOpacity={0.08}
        brightness={60}
        blur={11}
        distortionScale={-150}
        greenOffset={12}
        blueOffset={22}
        className="w-full"
      >
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
      </GlassSurface>
    </motion.div>
  );
}

function Showcase() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const lineScale = useTransform(scrollYProgress, [0.14, 0.82], [0, 1]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.08], [0.4, 1]);

  return (
    <section id="proceso" ref={sectionRef} className="relative h-[260vh] scroll-mt-28">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <VideoBackdrop src={PROCESO_VIDEO} videoOpacity={0.82} tint="rgba(7,11,22,0.5)" />

        <div className="container-mh relative z-10">
          <motion.div style={{ opacity: headOpacity }} className="mb-10 flex flex-col items-center gap-3 text-center">
            <span className="eyebrow">
              <span className="dot-line" />
              Cómo trabajamos <span className="text-silver-faint tracking-[0.2em]">/05</span>
            </span>
            <h2 className="text-section-title font-semibold text-white">Un proceso claro, sin sorpresas</h2>
            <p className="max-w-xl text-balance text-silver-dim">
              Del diagnóstico a la entrega, ves avances en el camino y sabes exactamente qué recibes.
            </p>
          </motion.div>

          <div className="relative">
            {/* connecting line draws as the cards appear (desktop) */}
            <motion.span
              aria-hidden="true"
              style={{ scaleX: lineScale }}
              className="pointer-events-none absolute left-10 right-10 top-[3.4rem] hidden h-px origin-left bg-gradient-to-r from-electric-600/50 via-electric-400/40 to-electric-600/0 lg:block"
            />
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESO.map((step, i) => (
                <li key={step.n}>
                  <StepCard progress={scrollYProgress} index={i} step={step} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StaticSteps() {
  return (
    <section id="proceso" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <div className="mb-10 flex flex-col gap-3">
          <span className="eyebrow">
            <span className="dot-line" />
            Cómo trabajamos <span className="text-silver-faint tracking-[0.2em]">/06</span>
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
