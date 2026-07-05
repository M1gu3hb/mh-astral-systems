import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import VideoBackdrop from '../backgrounds/VideoBackdrop';
import GlassSurface from '../reactbits/GlassSurface';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import ScreenMock from './ScreenMock';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Video slot — drop the Google Flow clip here as /public/media/servicios-loop.mp4
const SERVICIOS_VIDEO = '/media/servicios-loop.mp4';

// Slow, readable pacing: each service holds its full "screen" for its whole
// scroll band (index-stepped, not a narrow fade window), so you can actually
// read it. Only the ~0.5s cross-dissolve moves between services.
const START = 0.07;
const END = 0.98;
const STEP = (END - START) / SERVICIOS.length;

function Showcase() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(SERVICIOS.length - 1, Math.max(0, Math.floor((p - START) / STEP)));
    setActive(i);
  });

  // laptop rises + scales in, then holds
  const lidY = useTransform(scrollYProgress, [0, 0.06], [90, 0]);
  const lidScale = useTransform(scrollYProgress, [0, 0.06], [0.9, 1]);
  const lidOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  const svc = SERVICIOS[active];
  const Icon = svc.icon;

  return (
    <section id="servicios" ref={sectionRef} className="relative h-[520vh] scroll-mt-28">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <VideoBackdrop src={SERVICIOS_VIDEO} />

        <div className="container-mh relative z-10">
          <div className="mb-6 flex flex-col items-center gap-3 text-center sm:mb-8">
            <span className="eyebrow">
              <span className="dot-line" />
              Qué hago <span className="text-silver-faint tracking-[0.2em]">/01</span>
            </span>
            <h2 className="text-section-title font-semibold text-white">Todo lo que puede hacer tu sistema</h2>
          </div>

          {/* realistic laptop */}
          <motion.div style={{ y: lidY, scale: lidScale, opacity: lidOpacity }} className="mx-auto w-full max-w-2xl">
            {/* lid */}
            <div className="relative rounded-[18px] border border-white/12 bg-gradient-to-b from-[#0a0f1c] to-[#05070d] p-[10px] shadow-[0_50px_140px_-40px_rgba(30,91,255,0.55)]">
              <span className="absolute left-1/2 top-[5px] h-1 w-1 -translate-x-1/2 rounded-full bg-white/25" />

              {/* screen */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-[9px] bg-[#070b16]">
                {/* power-on glow */}
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(30,91,255,0.16),transparent_72%)]" />

                {/* the app mockup for the active service (distorted behind the glass) */}
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 z-[1]"
                  >
                    <ScreenMock i={active} />
                  </motion.div>
                </AnimatePresence>

                {/* liquid-glass caption — the SAME GlassSurface as the header;
                    it refracts the mockup painted behind it, like water */}
                <div className="absolute inset-x-3 bottom-3 z-[3]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <GlassSurface
                        width="100%"
                        height={84}
                        borderRadius={16}
                        backgroundOpacity={0.1}
                        brightness={62}
                        blur={10}
                        distortionScale={-140}
                        greenOffset={12}
                        blueOffset={22}
                        className="w-full"
                      >
                        <div className="flex w-full items-center gap-3 px-3.5">
                          <span
                            className={`grid h-10 w-10 flex-none place-items-center rounded-xl border ${
                              svc.highlight ? 'border-electric-400/60 bg-electric-600/25' : 'border-electric-600/40 bg-electric-900/40'
                            }`}
                          >
                            <Icon size={19} strokeWidth={1.6} className="text-electric-400" aria-hidden="true" />
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="flex items-center gap-2">
                              <span className="truncate font-display text-[0.95rem] font-semibold text-white">
                                {svc.label}
                              </span>
                              {svc.highlight && (
                                <span className="hidden flex-none rounded-full border border-electric-400/40 bg-electric-600/25 px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-wider text-electric-400 sm:inline">
                                  Destacado
                                </span>
                              )}
                            </span>
                            <span className="truncate text-[0.72rem] leading-snug text-silver-dim">{svc.desc}</span>
                          </span>
                          <span className="flex-none font-mono text-[0.6rem] tracking-[0.2em] text-silver-faint">
                            {String(active + 1).padStart(2, '0')}/{String(SERVICIOS.length).padStart(2, '0')}
                          </span>
                        </div>
                      </GlassSurface>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* glass screen sheen */}
                <div className="pointer-events-none absolute inset-0 z-[4] bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
              </div>
            </div>

            {/* base + hinge */}
            <div className="relative mx-auto h-[16px] w-[118%] -translate-x-[7.6%] rounded-b-[14px] border-x border-b border-white/10 bg-gradient-to-b from-[#131b2e] to-[#090e1a]">
              <span className="absolute left-1/2 top-0 h-[5px] w-24 -translate-x-1/2 rounded-b-lg bg-black/50" />
            </div>
            <div className="absolute -bottom-5 left-1/2 h-9 w-2/3 -translate-x-1/2 rounded-[50%] bg-electric-600/20 blur-2xl" />
          </motion.div>

          {/* progress rail */}
          <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-1.5">
            {SERVICIOS.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? 'w-7 bg-electric-600' : 'w-3 bg-white/12'
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-silver-faint">
            Desliza para recorrer
          </p>
        </div>
      </div>
    </section>
  );
}

// Reduced-motion / touch fallback: a clean readable grid — no pinning.
function StaticList() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading index="01" eyebrow="Qué hago" title="Todo lo que puede hacer tu sistema" lead={SITE.support} />
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
