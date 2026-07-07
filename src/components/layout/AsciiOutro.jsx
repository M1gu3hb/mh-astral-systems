import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import FuzzyText from '../reactbits/FuzzyText';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Brand sign-off.
//  · Desktop → react-bits ASCIIText (WebGL, recolored blue) — unchanged.
//  · Mobile  → FuzzyText "MH Astral Systems" (the same static/glitch effect as the
//    About title), gradient letters, split over two lines so it fits the phone.
//  · Reduced motion → clean static wordmark.
// The animated variants mount only when scrolled near (perf + they run rAF loops).
const ASCIIText = lazy(() => import('../reactbits/ASCIIText'));

const FUZZ_GRADIENT = ['#BFD6FF', '#5B8CFF', '#1E5BFF'];

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
    baseIntensity: 0.17,
    hoverIntensity: 0.4,
    enableHover: false, // don't hijack touch/scroll on the phone
    fontSize: 'clamp(1.9rem, 9.2vw, 3rem)',
  };
  return (
    <div className="grid h-full place-items-center px-4" aria-label="MH Astral Systems">
      <div className="flex flex-col items-center leading-none">
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
      className="relative mt-section h-[32vh] min-h-[200px] overflow-hidden border-t border-white/5 bg-void-2/30 sm:h-[46vh] sm:min-h-[300px]"
    >
      {reduced ? (
        <StaticWordmark />
      ) : !near ? (
        <div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />
      ) : isMobile ? (
        <FuzzyWordmark />
      ) : (
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
      )}
    </section>
  );
}
