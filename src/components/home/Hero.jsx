import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import HeroBackground from '../backgrounds/HeroBackground';
import { HERO } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// The real MH logo as a glowing centerpiece: a slow conic halo, a breathing
// radial glow and gentle float. Replaces the old orbit-of-fake-logo (client
// feedback). Pure transform/opacity motion; the halo is decorative only.
function LogoHero({ reduced }) {
  return (
    // Mobile: a compact emblem that lives INSIDE the hero (not a full-screen
    // block). Desktop: the large side visual, unchanged.
    <div className="relative mx-auto grid aspect-square w-full max-w-[13rem] place-items-center sm:max-w-[17rem] lg:max-w-[26rem]">
      {/* ambient radial bloom */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(30,91,255,0.35),transparent_62%)] blur-2xl animate-glow-breathe" />

      {/* conic halo rings */}
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
              background:
                'conic-gradient(from 120deg, transparent, rgba(191,214,255,0.4) 40deg, transparent 120deg)',
              mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
              WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
            }}
          />
        </>
      )}

      {/* dotted orbit hint */}
      <div className="absolute inset-[2%] rounded-full border border-dashed border-white/8" />

      {/* the real logo */}
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

      {/* floating pixel-square motif accents (from the logo) */}
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

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.04 : 0.08, delayChildren: 0.08 } },
  };
  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 22, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduced ? 0.3 : 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* animated brand background (blue) */}
      <div className="absolute inset-0 -z-10">
        <HeroBackground />
        <div className="absolute inset-0 bg-circuit opacity-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void/55 via-void/45 to-void" />
      </div>

      <div className="container-mh flex flex-col items-center gap-7 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-6">
        {/* copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="order-2 flex max-w-xl flex-col gap-6 lg:order-1">
          <motion.span
            variants={item}
            className="inline-flex w-fit items-center gap-2.5 rounded-full border border-electric-600/25 bg-electric-900/20 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.28em] text-electric-400 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-electric-600 animate-pulse-dot" />
            {HERO.eyebrow}
          </motion.span>

          {/* mixed-scale editorial headline — not a wall of huge text */}
          <h1 className="flex flex-col gap-1">
            <motion.span variants={item} className="text-hero font-medium text-silver-dim">
              {HERO.headlineLead}
            </motion.span>
            <motion.span variants={item} className="text-hero-accent font-bold text-gradient-chrome">
              páginas y sistemas
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
            <a className="btn btn-ghost pr-2" href="#casos">
              <span>{HERO.ctaSecondary}</span>
              <span className="btn-orb bg-electric-600/20 text-electric-400">
                <ArrowDown size={15} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </a>
          </motion.div>

          {/* one slim trust line — real facts, no clutter */}
          <motion.p variants={item} className="flex items-center gap-2.5 pt-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-silver-faint">
            <span className="text-electric-400">04 sistemas en producción</span>
            <span className="h-1 w-1 rounded-full bg-silver-faint/50" />
            <span>negocios reales · CDMX</span>
          </motion.p>
        </motion.div>

        {/* real-logo centerpiece */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative order-1 lg:order-2"
        >
          <LogoHero reduced={reduced} />
        </motion.div>
      </div>

      {/* scroll cue */}
      {!reduced && (
        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" aria-hidden="true">
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-silver-faint">Scroll</span>
          <span className="block h-9 w-px overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-gradient-to-b from-electric-400 to-transparent" />
          </span>
        </div>
      )}
    </section>
  );
}
