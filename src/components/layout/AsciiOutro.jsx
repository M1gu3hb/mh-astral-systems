import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import FuzzyText from '../reactbits/FuzzyText';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Brand sign-off.
//  · Desktop → react-bits ASCIIText (WebGL, recolored blue) — unchanged.
//  · Mobile  → FuzzyText "MH Astral Systems" (same static/glitch as the About
//    title), big gradient letters over two equal lines.
//  · Both    → TILTED orbits around the name (client request): near-horizontal
//    rings (rotateX) that wrap the wordmark like Saturn rings — inclined enough
//    that the lines pass above/below the name, never over it — with comets and
//    stars travelling along them. Rendered behind the text (z-0 vs z-10).
//  · Reduced motion → clean static wordmark, no orbits.
const ASCIIText = lazy(() => import('../reactbits/ASCIIText'));

const FUZZ_GRADIENT = ['#BFD6FF', '#5B8CFF', '#1E5BFF'];

// ── tilted orbit system ───────────────────────────────────────────────────────
function OrbitStar({ cls = 'h-1.5 w-1.5 bg-chrome-highlight' }) {
  return <span className={`block rounded-full shadow-[0_0_10px_2px_rgba(191,214,255,0.7)] ${cls}`} />;
}
function OrbitComet({ flip = false }) {
  return (
    <span className={`flex items-center ${flip ? 'flex-row-reverse' : ''}`}>
      <span
        className={`block h-[2.5px] w-10 rounded-full ${
          flip ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
        } from-electric-400/90 via-electric-400/40 to-transparent`}
      />
      <span className="-mx-0.5 block h-2 w-2 rounded-full bg-chrome-highlight shadow-[0_0_12px_3px_rgba(191,214,255,0.8)]" />
    </span>
  );
}

// Each ring: width (responsive), inclination (rotateX — high = flat ellipse so it
// clears the name), a slight screen-plane rotation for scatter, and one traveller.
const ORBIT_RINGS = [
  { size: 'min(150vw, 660px)', tilt: 72, rz: -6, dur: 26, rev: false, delay: '0s', obj: <OrbitComet /> },
  { size: 'min(175vw, 800px)', tilt: 74, rz: 5, dur: 36, rev: true, delay: '-9s', obj: <OrbitStar /> },
  { size: 'min(200vw, 940px)', tilt: 70, rz: -3, dur: 46, rev: false, delay: '-16s', obj: <OrbitStar cls="h-1 w-1 bg-white" /> },
  { size: 'min(162vw, 720px)', tilt: 76, rz: 9, dur: 30, rev: true, delay: '-22s', obj: <OrbitComet flip /> },
  { size: 'min(215vw, 1060px)', tilt: 71, rz: 0, dur: 54, rev: false, delay: '-32s', obj: <OrbitStar cls="h-1 w-1 bg-electric-400" /> },
];

function AstralOrbits() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {ORBIT_RINGS.map((r, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: r.size,
            aspectRatio: '1 / 1',
            transform: `translate(-50%, -50%) rotateZ(${r.rz}deg) rotateX(${r.tilt}deg)`,
          }}
        >
          {/* the ring line */}
          <div className="absolute inset-0 rounded-full border border-chrome-highlight/[0.09]" />
          {/* the traveller riding it */}
          <div
            className="absolute inset-0"
            style={{ animation: `spin-slow ${r.dur}s linear ${r.delay} infinite${r.rev ? ' reverse' : ''}` }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2">{r.obj}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── wordmark variants ─────────────────────────────────────────────────────────
function StaticWordmark() {
  return (
    <div className="grid h-full place-items-center px-5">
      <p className="text-center font-display text-[13vw] font-bold leading-none text-gradient-chrome sm:text-6xl md:text-7xl">
        MH Astral Systems
      </p>
    </div>
  );
}

function FuzzyWordmark() {
  const common = {
    fontWeight: 800,
    fontFamily: "'Space Grotesk', sans-serif",
    gradient: FUZZ_GRADIENT,
    baseIntensity: 0.16,
    hoverIntensity: 0.4,
    enableHover: false, // don't hijack touch/scroll on the phone
    fuzzRange: 16, // tighter margins so the big type still fits the phone width
    fontSize: 'clamp(2.6rem, 13.5vw, 4.5rem)', // big — fills the panel
  };
  return (
    <div className="relative z-10 grid h-full place-items-center px-2" aria-label="MH Astral Systems">
      <div className="flex flex-col items-center gap-1 leading-none">
        <FuzzyText {...common}>MH Astral</FuzzyText>
        <FuzzyText {...common}>Systems</FuzzyText>
      </div>
    </div>
  );
}

export default function AsciiOutro() {
  const holderRef = useRef(null);
  const [near, setNear] = useState(false);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduced) return;
    const el = holderRef.current;
    if (!el) return;
    // two-way: only run the animated wordmark while it's near the viewport
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={holderRef}
      aria-label="MH Astral Systems"
      className="relative mt-section h-[38vh] min-h-[260px] overflow-hidden border-t border-white/5 bg-void-2/30 sm:h-[46vh] sm:min-h-[300px]"
    >
      {!reduced && near && <AstralOrbits />}

      {reduced ? (
        <StaticWordmark />
      ) : !near ? (
        <div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />
      ) : isMobile ? (
        <FuzzyWordmark />
      ) : (
        <div className="absolute inset-0 z-10">
          <Suspense fallback={<div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />}>
            <ASCIIText
              text="MH Astral Systems"
              enableWaves
              asciiFontSize={12}
              textFontSize={170}
              textColor="#BFD6FF"
              planeBaseHeight={9}
            />
          </Suspense>
        </div>
      )}
    </section>
  );
}
