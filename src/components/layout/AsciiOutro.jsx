import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Big animated brand sign-off (react-bits ASCIIText, WebGL, recolored blue).
// Runs on desktop AND mobile now (client wants the full animation on phones,
// not a flat wordmark) — on mobile the plane is scaled down + the ascii grid is
// coarser so the whole "MH Astral Systems" fits and stays light. Reduced-motion
// still gets the clean static wordmark. WebGL mounts only when scrolled near.
const ASCIIText = lazy(() => import('../reactbits/ASCIIText'));

function StaticWordmark() {
  return (
    <div className="grid h-full place-items-center px-5">
      <p className="text-center font-display text-[13vw] font-bold leading-none text-gradient-chrome sm:text-6xl md:text-7xl">
        MH Astral Systems
      </p>
    </div>
  );
}

export default function AsciiOutro() {
  const holderRef = useRef(null);
  const [near, setNear] = useState(false);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const useAscii = !reduced;

  useEffect(() => {
    if (!useAscii) return;
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setNear(true)),
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [useAscii]);

  return (
    <section
      ref={holderRef}
      aria-label="MH Astral Systems"
      className="relative mt-section h-[34vh] min-h-[210px] overflow-hidden border-t border-white/5 bg-void-2/30 sm:h-[46vh] sm:min-h-[300px]"
    >
      {!useAscii ? (
        <StaticWordmark />
      ) : near ? (
        <Suspense fallback={<div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />}>
          <ASCIIText
            text="MH Astral Systems"
            enableWaves
            asciiFontSize={isMobile ? 6 : 12}
            textFontSize={isMobile ? 100 : 170}
            textColor="#BFD6FF"
            planeBaseHeight={isMobile ? 4.6 : 9}
          />
        </Suspense>
      ) : (
        <div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />
      )}
    </section>
  );
}
