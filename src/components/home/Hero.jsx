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

// ── Desktop logo centerpiece (right column) ──────────────────────────────────
function LogoHero({ reduced }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[13rem] place-items-center sm:max-w-[17rem] lg:max-w-[26rem]">
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

      {!reduced && (
        <>
          <span className="absolute right-[16%] top-[18%] h-3 w-3 rounded-[3px] bg-electric-600 shadow-glow-soft animate-float-slow" />
          <span className="absolute right-[10%] top-[26%] h-2 w-2 rounded-[2px] bg-electric-400 [animation:float-slow_7s_ease-in-out_infinite]" />
          <span className="absolute left-[15%] bottom-[22%] h-1.5 w-1.5 rounded-[2px] bg-chrome-highlight/80 [animation:float-slow_8s_ease-in-out_infinite]" />
        </>
      )}
    </div>
  );
}

// ── Mobile logo badge (top, orbit ring) ──────────────────────────────────────
function LogoBadge({ reduced }) {
  return (
    <div className="relative grid h-[13.5rem] w-[13.5rem] place-items-center">
      <div className="absolute h-40 w-40 rounded-full bg-electric-600/25 blur-2xl animate-glow-breathe" aria-hidden="true" />

      {/* dashed orbit ring with a travelling dot */}
      <div className={`absolute inset-0 ${reduced ? '' : 'animate-spin-slow'}`} aria-hidden="true">
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-electric-400 shadow-glow-soft" />
      </div>
      <div className="absolute inset-[14%] rounded-full border border-white/6" aria-hidden="true" />

      {/* filled glossy badge with the real monogram */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="relative grid h-[8.4rem] w-[8.4rem] place-items-center rounded-full border border-electric-400/40 bg-[radial-gradient(circle_at_36%_28%,#4d80ff,#12369f_72%,#0a2160)] shadow-[0_22px_60px_-14px_rgba(30,91,255,0.85)]"
      >
        <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_22%,rgba(255,255,255,0.4),transparent_45%)]" aria-hidden="true" />
        <img
          src="/logo.png"
          alt="MH Astral Systems"
          width={519}
          height={463}
          draggable={false}
          className={`relative w-[4.4rem] drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] ${reduced ? '' : 'animate-float-slow'}`}
        />
      </motion.div>
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
      <motion.div variants={item}>
        <LogoBadge reduced={reduced} />
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
