import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Search, FileText, Hammer, Rocket } from 'lucide-react';
import { PROCESO } from '../../data/proceso';
import GlassSurface from '../reactbits/GlassSurface';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Scroll-scrubbed frame sequence (Apple-style): the Veo clip was exported to 60
// lightweight WebP frames; as you scroll, the matching frame is painted to a
// <canvas> behind the liquid-glass step cards, which refract it like water.
// No autoplaying <video> (that was heavy + janky on phones); frames are
// preloaded only when the section nears the viewport.
const FRAME_COUNT = 60;
const frameSrc = (i) => `/media/proceso-frames/f-${String(i + 1).padStart(3, '0')}.webp`;
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
  const canvasRef = useRef(null);
  const imgsRef = useRef([]);
  const rafRef = useRef(0);
  const lastP = useRef(0);
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

  // draw current frame (cover-fit) to the canvas
  const drawCover = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * s;
    const dh = img.naturalHeight * s;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  };

  const renderFrame = (p) => {
    const imgs = imgsRef.current;
    if (!imgs.length) return;
    let idx = Math.round(p * (FRAME_COUNT - 1));
    idx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    let img = imgs[idx];
    // if the exact frame isn't loaded yet, walk to the nearest loaded one
    if (!img || !img.complete || !img.naturalWidth) {
      for (let d = 1; d < FRAME_COUNT; d++) {
        const a = imgs[idx - d];
        const b = imgs[idx + d];
        if (a && a.complete && a.naturalWidth) { img = a; break; }
        if (b && b.complete && b.naturalWidth) { img = b; break; }
      }
    }
    drawCover(img);
  };

  // size the canvas to its box (dpr-aware) and redraw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      renderFrame(lastP.current);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    return () => ro.disconnect();
  }, []);

  // preload frames only when the section is near the viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let started = false;
    const startPreload = () => {
      if (started) return;
      started = true;
      const imgs = new Array(FRAME_COUNT);
      // load first frame immediately so the canvas isn't blank
      const order = [...Array(FRAME_COUNT).keys()];
      order.forEach((i) => {
        const im = new Image();
        im.decoding = 'async';
        im.onload = () => {
          const idxNow = Math.round(lastP.current * (FRAME_COUNT - 1));
          if (Math.abs(i - idxNow) <= 1 || i === 0) renderFrame(lastP.current);
        };
        im.src = frameSrc(i);
        imgs[i] = im;
      });
      imgsRef.current = imgs;
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && startPreload()),
      { rootMargin: '900px 0px' },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // scroll → frame + active band (rAF-throttled)
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    lastP.current = p;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        renderFrame(lastP.current);
      });
    }
    const i = Math.max(0, Math.min(PROCESO.length - 1, Math.floor((p - 0.08) / BAND)));
    setActive(i);
  });

  return (
    <section id="proceso" ref={sectionRef} className="relative h-[300vh] scroll-mt-28">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        {/* brand base (shows before frames load) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 70% at 70% 12%, rgba(30,91,255,0.16), transparent 60%),' +
              'linear-gradient(180deg, #070B16, #0B1120 60%, #070B16)',
          }}
        />
        {/* the scrubbed frame */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        {/* edge fades so the section blends; center stays visible */}
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

          <p className="mt-14 text-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-silver-faint sm:mt-10">
            Desliza para avanzar
          </p>
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
