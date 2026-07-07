import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Big animated brand sign-off. On desktop it's the react-bits ASCIIText (WebGL,
// recolored blue). On mobile it was heavy AND rendered cut off — so phones get
// the full brand wordmark as a clean chrome-gradient headline (complete,
// centered, light). Desktop mounts the WebGL only when scrolled near it.
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
  const useAscii = !reduced && !isMobile;

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
      className="relative mt-section h-[30vh] min-h-[180px] overflow-hidden border-t border-white/5 bg-void-2/30 sm:h-[46vh] sm:min-h-[300px]"
    >
      {!useAscii ? (
        <StaticWordmark />
      ) : near ? (
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
      ) : (
        <div className="skeleton absolute inset-6 rounded-2xl" aria-hidden="true" />
      )}
    </section>
  );
}
