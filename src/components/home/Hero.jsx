import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import HeroBackground from '../backgrounds/HeroBackground';
import OrbitImages from '../reactbits/OrbitImages';
import PixelSquares from '../ui/PixelSquares';
import { HERO } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Small square "glass chip" as an inline SVG data URI — orbited by OrbitImages
// (docs/07) around the MH monogram. No external images needed.
const chip = (label) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs><linearGradient id="c" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0E1830"/><stop offset="1" stop-color="#0B1120"/>
      </linearGradient></defs>
      <rect x="6" y="26" width="84" height="44" rx="14" fill="url(#c)" stroke="#1E5BFF" stroke-opacity="0.5"/>
      <rect x="6" y="26" width="84" height="44" rx="14" fill="none" stroke="#BFD6FF" stroke-opacity="0.12"/>
      <circle cx="20" cy="48" r="3" fill="#1E5BFF"/>
      <text x="30" y="52" font-family="'IBM Plex Mono', monospace" font-size="13" fill="#F4F6FA">${label}</text>
    </svg>`,
  )}`;

const ORBIT_CHIPS = ['Web', 'Panel', 'POS', 'CRM', 'QR', 'IA'].map(chip);

const HEADLINE_WORDS = [
  { t: HERO.headlineLead, accent: false },
  { t: HERO.headlineHighlight, accent: true },
  { t: HERO.headlineTail, accent: false },
];

// Proof strip — only facts that exist in the docs. No invented metrics.
const PROOF = [
  { v: '04', l: 'sistemas en producción' },
  { v: '100%', l: 'negocios reales, cero mockups' },
  { v: '1:1', l: 'trato directo con Miguel' },
];

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0.04 : 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26, filter: 'blur(12px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduced ? 0.3 : 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      {/* animated brand background */}
      <div className="absolute inset-0 -z-10">
        <HeroBackground />
        <div className="absolute inset-0 bg-circuit opacity-[0.5]" />
        {/* keep text readable over the shader */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/70 to-void" />
      </div>

      <div className="container-mh grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-7">
          <motion.span variants={item} className="eyebrow">
            <span className="dot-line" />
            {HERO.eyebrow}
          </motion.span>

          <h1 className="text-hero font-bold leading-[0.95]">
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span key={i} variants={item} className="inline-block">
                <span className={w.accent ? 'text-gradient-chrome' : 'text-white'}>{w.t}</span>{' '}
              </motion.span>
            ))}
          </h1>

          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-silver-dim sm:text-lg">
            {HERO.sub}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
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

          {/* proof row — real facts, editorial treatment */}
          <motion.div variants={item} className="mt-2 flex flex-wrap items-stretch gap-x-0 gap-y-4">
            {PROOF.map((p, i) => (
              <div
                key={p.v}
                className={`flex flex-col gap-1 pr-7 ${i > 0 ? 'border-l border-white/10 pl-7' : ''}`}
              >
                <span className="font-mono text-xl font-semibold text-white sm:text-2xl">{p.v}</span>
                <span className="max-w-[10rem] text-[0.7rem] leading-snug text-silver-faint">{p.l}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-3 pt-1 text-xs text-silver-faint">
            <PixelSquares />
            <span className="font-mono uppercase tracking-[0.2em]">Xochimilco · CDMX</span>
          </motion.div>
        </motion.div>

        {/* orbiting brand chips around the monogram (desktop) */}
        <div className="relative hidden lg:block">
          <OrbitImages
            images={ORBIT_CHIPS}
            shape="ellipse"
            radiusX={520}
            radiusY={260}
            rotation={-10}
            duration={34}
            itemSize={72}
            responsive
            centerContent={
              <div className="glass-card grid h-40 w-40 place-items-center rounded-[2rem] animate-float-slow">
                <img src="/logo-mh.svg" alt="MH Astral Systems" width={96} className="w-24" draggable={false} />
              </div>
            }
          />
        </div>
      </div>

      {/* scroll cue */}
      {!reduced && (
        <div
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
          aria-hidden="true"
        >
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.4em] text-silver-faint">Scroll</span>
          <span className="block h-9 w-px overflow-hidden">
            <span className="scroll-cue-line block h-full w-full bg-gradient-to-b from-electric-400 to-transparent" />
          </span>
        </div>
      )}
    </section>
  );
}
