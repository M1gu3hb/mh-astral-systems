import { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import RotatingText from '../reactbits/RotatingText';
import { HERO } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Beams (react-bits) — hero background on desktop AND mobile (client wants the
// new bg everywhere). Heavy three.js → lazy chunk (preloaded in the splash);
// transparent canvas over a blue base so there's never a dead-black gap.
const Beams = lazy(() => import('../reactbits/Beams'));

const ROTATING_SERVICES = ['páginas web', 'panel propio', 'POS y CRM', 'menús QR', 'dashboards'];

const BRAND_BASE =
  'radial-gradient(55% 60% at 76% 18%, rgba(30,91,255,0.34), transparent 62%),' +
  'radial-gradient(50% 65% at 8% 92%, rgba(10,31,85,0.6), transparent 60%),' +
  'linear-gradient(135deg, #0a1533 0%, #070B16 52%, #0b1c40 100%)';

function rotatingPill(sizeClass, reduced) {
  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#3d74ff] via-electric-600 to-[#1848d6] leading-none shadow-glow ${sizeClass}`}
    >
      <RotatingText
        texts={ROTATING_SERVICES}
        auto={!reduced}
        mainClassName="flex justify-center whitespace-nowrap font-display font-bold leading-none text-white"
        splitLevelClassName="overflow-hidden py-[0.12em]"
        staggerFrom="last"
        staggerDuration={0.018}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        exit={{ y: '-120%' }}
        transition={{ type: 'spring', damping: 32, stiffness: 380 }}
        rotationInterval={2600}
      />
    </span>
  );
}

// Little stars / meteors orbiting the logo — the "astral" nod. Each orbit is a
// rotating ring (different radius/speed/direction) carrying one glowing speck.
function Star({ cls }) {
  return <span className={`block rounded-full shadow-[0_0_8px_2px_rgba(91,140,255,0.55)] ${cls}`} />;
}
function Meteor({ from = 'from-chrome-highlight' }) {
  return (
    <span className="flex items-center">
      <span className={`block h-[2px] w-7 rounded-full bg-gradient-to-l ${from} via-electric-400/70 to-transparent`} />
      <span className="-ml-0.5 block h-1.5 w-1.5 rounded-full bg-chrome-highlight shadow-[0_0_8px_2px_rgba(191,214,255,0.7)]" />
    </span>
  );
}

const ORBITS = [
  { inset: '-7%', anim: 'spin-slow 30s linear infinite', pos: 'left-1/2 top-0 -translate-x-1/2', el: <Star cls="h-1.5 w-1.5 bg-chrome-highlight" /> },
  { inset: '4%', anim: 'spin-slow 42s linear infinite reverse', pos: 'right-0 top-1/2 -translate-y-1/2', el: <Meteor /> },
  { inset: '-3%', anim: 'spin-slow 24s linear infinite', pos: 'left-1/2 bottom-0 -translate-x-1/2', el: <Star cls="h-1 w-1 bg-white" /> },
  { inset: '11%', anim: 'spin-slow 34s linear infinite reverse', pos: 'left-0 top-1/3', el: <Star cls="h-1.5 w-1.5 bg-electric-400" /> },
  { inset: '-9%', anim: 'spin-slow 48s linear infinite', pos: 'right-[10%] top-[6%]', el: <Meteor from="from-electric-400" /> },
  { inset: '9%', anim: 'spin-slow 28s linear infinite', pos: 'right-[8%] bottom-[14%]', el: <Star cls="h-1 w-1 bg-electric-600" /> },
];

function OrbitStars({ reduced }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {ORBITS.map((o, i) => (
        <div key={i} className="absolute rounded-full" style={{ inset: o.inset, animation: reduced ? 'none' : o.anim }}>
          <span className={`absolute ${o.pos}`}>{o.el}</span>
        </div>
      ))}
    </div>
  );
}

// Clean logo centerpiece — same treatment on desktop and mobile (client: keep it
// like the desktop version, no solid circle), now with orbiting stars/meteors.
function LogoHero({ reduced, sizeClass = 'max-w-[13rem] sm:max-w-[17rem] lg:max-w-[26rem]' }) {
  return (
    <div className={`relative mx-auto grid aspect-square w-full place-items-center ${sizeClass}`}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(30,91,255,0.35),transparent_62%)] blur-2xl animate-glow-breathe" />

      {!reduced && (
        <>
          <div
            className="absolute inset-[8%] rounded-full opacity-70 animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(91,140,255,0.35) 70deg, transparent 150deg, transparent 210deg, rgba(30,91,255,0.5) 280deg, transparent 340deg)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))',
            }}
          />
          <div
            className="absolute inset-[20%] rounded-full opacity-50 animate-spin-slower"
            style={{
              background: 'conic-gradient(from 120deg, transparent, rgba(191,214,255,0.4) 40deg, transparent 120deg)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
            }}
          />
        </>
      )}

      <div className="absolute inset-[2%] rounded-full border border-dashed border-white/8" />

      <OrbitStars reduced={reduced} />

      <motion.img
        src="/logo.png"
        alt="MH Astral Systems"
        width={519}
        height={463}
        draggable={false}
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.82, filter: 'blur(14px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className={`relative z-10 w-[62%] drop-shadow-[0_10px_50px_rgba(30,91,255,0.6)] ${reduced ? '' : 'animate-float-slow'}`}
      />
    </div>
  );
}

// ── Mobile hero (client design: badge on top, centered copy, full-width CTA) ──
function MobileHero({ reduced }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.04 : 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: reduced ? 0.3 : 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="container-mh relative z-10 flex flex-col items-center gap-6 text-center"
    >
      <motion.div variants={item} className="py-1">
        <LogoHero reduced={reduced} sizeClass="w-[15rem] max-w-[80vw]" />
      </motion.div>

      <motion.span
        variants={item}
        className="inline-flex items-center gap-2.5 rounded-full border border-electric-600/25 bg-electric-900/20 px-3.5 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.28em] text-electric-400 backdrop-blur-sm"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-electric-600 animate-pulse-dot" />
        {HERO.eyebrow}
      </motion.span>

      <motion.h1
        variants={item}
        className="text-balance font-display text-[clamp(1.7rem,0.7rem+4.6vw,2.5rem)] font-bold leading-[1.22]"
      >
        <span className="text-silver-dim">Digitaliza tu negocio con </span>
        {rotatingPill('mx-0.5 h-[1.28em] w-[6.9em] px-2 align-middle text-[0.92em]', reduced)}
        <span className="text-silver-dim"> que </span>
        <span className="text-white">sí venden y organizan.</span>
      </motion.h1>

      <motion.p variants={item} className="max-w-md text-[0.95rem] leading-relaxed text-silver-dim">
        {HERO.sub}
      </motion.p>

      <motion.div variants={item} className="mt-1 flex w-full max-w-sm flex-col items-center gap-3">
        <a
          className="btn btn-primary w-full justify-center pr-2"
          href={whatsappLink(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{HERO.ctaPrimary}</span>
          <span className="btn-orb bg-white/15">
            <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
          </span>
        </a>
        <a
          className="inline-flex items-center gap-2 py-1 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-silver-dim transition-colors duration-300 hover:text-white"
          href="#servicios"
        >
          {HERO.ctaSecondary}
          <ArrowDown size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </motion.div>

      <motion.p
        variants={item}
        className="flex flex-wrap items-center justify-center gap-2.5 pt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-silver-faint"
      >
        <span className="text-electric-400">04 sistemas en producción</span>
        <span className="h-1 w-1 rounded-full bg-silver-faint/50" />
        <span>negocios reales · CDMX</span>
      </motion.p>
    </motion.div>
  );
}

// ── Desktop hero (unchanged two-column layout) ───────────────────────────────
function DesktopHero({ reduced }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.04 : 0.08, delayChildren: 0.08 } },
  };
  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(10px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: reduced ? 0.3 : 0.75, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="container-mh relative z-10 grid grid-cols-[1.05fr_0.95fr] items-center gap-6">
      <motion.div variants={container} initial="hidden" animate="show" className="flex max-w-xl flex-col gap-6">
        <motion.span
          variants={item}
          className="inline-flex w-fit items-center gap-2.5 rounded-full border border-electric-600/25 bg-electric-900/20 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-electric-400 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-electric-600 animate-pulse-dot" />
          {HERO.eyebrow}
        </motion.span>

        <h1 className="flex flex-col gap-2">
          <motion.span variants={item} className="text-hero font-medium text-silver-dim">
            Digitaliza tu negocio con
          </motion.span>
          <motion.span variants={item} className="text-[clamp(2rem,1rem+4.4vw,3.8rem)]">
            {rotatingPill('h-[1.32em] w-[min(88vw,26rem)] px-3', reduced)}
          </motion.span>
          <motion.span variants={item} className="text-hero font-semibold text-white">
            que sí venden y organizan.
          </motion.span>
        </h1>

        <motion.p variants={item} className="max-w-lg text-base leading-relaxed text-silver-dim sm:text-[1.05rem]">
          {HERO.sub}
        </motion.p>

        <motion.div variants={item} className="mt-1 flex flex-wrap items-center gap-3">
          <a
            className="btn btn-primary pr-2"
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{HERO.ctaPrimary}</span>
            <span className="btn-orb bg-white/15">
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </a>
          <a className="btn btn-ghost pr-2" href="#servicios">
            <span>{HERO.ctaSecondary}</span>
            <span className="btn-orb bg-electric-600/20 text-electric-400">
              <ArrowDown size={15} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </a>
        </motion.div>

        <motion.p
          variants={item}
          className="flex flex-wrap items-center gap-2.5 pt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-silver-faint"
        >
          <span className="text-electric-400">04 sistemas en producción</span>
          <span className="h-1 w-1 rounded-full bg-silver-faint/50" />
          <span>negocios reales · CDMX</span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative"
      >
        <LogoHero reduced={reduced} />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* background — Beams (new bg) on desktop + mobile; static only for reduced motion */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: BRAND_BASE }} />
        {!reduced && (
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <Beams
                beamWidth={2.4}
                beamHeight={20}
                beamNumber={isMobile ? 9 : 12}
                lightColor="#3B72FF"
                speed={isMobile ? 1.3 : 1.6}
                noiseIntensity={1.5}
                scale={0.2}
                rotation={26}
              />
            </div>
          </Suspense>
        )}
        <div className="absolute inset-0 bg-circuit opacity-[0.28]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/35 via-void/28 to-void" />
      </div>

      {isMobile ? <MobileHero reduced={reduced} /> : <DesktopHero reduced={reduced} />}

      {/* scroll cue */}
      {!reduced && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2" aria-hidden="true">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-silver-faint">Scroll</span>
          <span className="block h-9 w-px overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-gradient-to-b from-electric-400 to-transparent" />
          </span>
        </div>
      )}
    </section>
  );
}
