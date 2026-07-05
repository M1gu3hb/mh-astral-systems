import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import VideoBackdrop from '../backgrounds/VideoBackdrop';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Video slot — drop the Google Flow clip here as /public/media/servicios-loop.mp4
const SERVICIOS_VIDEO = '/media/servicios-loop.mp4';

// Scroll pacing: the 8 service "screens" pass through the laptop between these
// progress bounds; the laptop reveals before, and everything settles after.
const START = 0.12;
const END = 0.96;
const STEP = (END - START) / SERVICIOS.length;

function ScreenCard({ progress, index, service, mockTint }) {
  const s = START + index * STEP;
  const e = s + STEP;
  const inA = s + STEP * 0.22;
  const inB = e - STEP * 0.22;

  const opacity = useTransform(progress, [s, inA, inB, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, inA, inB, e], [70, 0, 0, -70]);
  const scale = useTransform(progress, [s, inA, inB, e], [0.94, 1, 1, 0.94]);
  const blur = useTransform(progress, [s, inA, inB, e], [10, 0, 0, 10]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const Icon = service.icon;

  return (
    <motion.div
      style={{ opacity, y, scale, filter }}
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
    >
      <div className="glass-card glass-card--interactive w-full max-w-md p-5 sm:p-7">
        <div className="flex items-start justify-between">
          <span
            className="grid h-12 w-12 place-items-center rounded-xl border border-electric-400/50"
            style={{ background: mockTint }}
          >
            <Icon size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.24em] text-silver-faint">
            {String(index + 1).padStart(2, '0')} / {String(SERVICIOS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <h3 className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl">
            {service.label}
          </h3>
          {service.highlight && (
            <span className="flex-none rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-electric-400">
              Destacado
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-silver-dim">{service.desc}</p>

        {/* little "app on screen" mock — 3 skeleton rows + a live chip */}
        <div className="mt-5 space-y-2 rounded-xl border border-white/8 bg-void/50 p-3">
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-600/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="ml-2 h-2 flex-1 rounded-full bg-white/8" />
          </div>
          <span className="block h-2 w-4/5 rounded-full bg-white/10" />
          <span className="block h-2 w-3/5 rounded-full bg-electric-600/25" />
        </div>
      </div>
    </motion.div>
  );
}

function Showcase() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(SERVICIOS.length - 1, Math.max(0, Math.floor((p - START) / STEP)));
    setActive(i);
  });

  // laptop reveal (rises + scales in), then holds
  const lidY = useTransform(scrollYProgress, [0, 0.1], [90, 0]);
  const lidScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const lidOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const tints = ['#0A1F55', '#123', '#0E1830', '#101d3d', '#0b2a5e', '#0E1830', '#0a2350', '#0d1a38'];

  return (
    <section id="servicios" ref={sectionRef} className="relative h-[320vh] scroll-mt-28">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <VideoBackdrop src={SERVICIOS_VIDEO} />

        <div className="container-mh relative z-10">
          {/* compact heading pinned with the stage */}
          <div className="mb-6 flex flex-col items-center gap-3 text-center sm:mb-8">
            <span className="eyebrow">
              <span className="dot-line" />
              Qué hago <span className="text-silver-faint tracking-[0.2em]">/01</span>
            </span>
            <h2 className="text-section-title font-semibold text-white">
              Todo lo que puede hacer tu sistema
            </h2>
          </div>

          {/* the laptop stage */}
          <motion.div
            style={{ y: lidY, scale: lidScale, opacity: lidOpacity }}
            className="mx-auto w-full max-w-2xl"
          >
            {/* screen */}
            <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-t-2xl border border-white/12 bg-gradient-to-b from-void-2 to-void shadow-[0_40px_120px_-40px_rgba(30,91,255,0.5)]">
              {/* camera dot */}
              <span className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/20" />
              {/* soft screen glow */}
              <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_20%,rgba(30,91,255,0.12),transparent_70%)]" />
              {SERVICIOS.map((service, i) => (
                <ScreenCard
                  key={service.label}
                  progress={scrollYProgress}
                  index={i}
                  service={service}
                  mockTint={`linear-gradient(135deg, ${tints[i % tints.length]}, #0B1120)`}
                />
              ))}
            </div>
            {/* base */}
            <div className="relative mx-auto h-3 w-[112%] -translate-x-[5.4%] rounded-b-xl border-x border-b border-white/10 bg-gradient-to-b from-[#141b2e] to-[#0b1120]">
              <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-md bg-black/40" />
            </div>
          </motion.div>

          {/* progress rail */}
          <div className="mx-auto mt-7 flex max-w-2xl items-center justify-center gap-1.5">
            {SERVICIOS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? 'w-7 bg-electric-600' : 'w-3 bg-white/12'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reduced-motion / touch-fallback: a clean readable grid — no pinning.
function StaticList() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Todo lo que puede hacer tu sistema"
          lead={SITE.support}
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 0.05}>
              <a
                href={whatsappLink(s.highlight ? WA_MESSAGES.panel : WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-card group flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-white/8 bg-void-2/40 p-4 transition-all duration-500 ease-out-brand hover:border-electric-600/40 sm:p-5"
              >
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-electric-600/30 bg-void/50">
                  <s.icon size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center gap-2">
                    <h3 className="font-display text-[1.02rem] font-semibold leading-snug text-white">{s.label}</h3>
                    {s.highlight && (
                      <span className="rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-electric-400">
                        Destacado
                      </span>
                    )}
                  </span>
                  <span className="text-sm leading-relaxed text-silver-dim">{s.desc}</span>
                </span>
                <ArrowUpRight size={15} strokeWidth={1.5} className="mt-0.5 flex-none text-electric-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiciosShowcase() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticList /> : <Showcase />;
}
