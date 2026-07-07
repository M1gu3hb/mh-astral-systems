import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Big animated brand sign-off (react-bits ASCIIText, recolored to brand blues)
// shown above the footer on every public page. three.js-heavy, so it only
// mounts when the visitor actually scrolls near it; a skeleton block holds the
// space until then.
const ASCIIText = lazy(() => import('../reactbits/ASCIIText'));

export default function AsciiOutro() {
  const holderRef = useRef(null);
  const [near, setNear] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setNear(true)),
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={holderRef}
      aria-label="MH Astral Systems"
      className="relative mt-section h-[34vh] min-h-[220px] overflow-hidden border-t border-white/5 bg-void-2/30 sm:h-[46vh] sm:min-h-[300px]"
    >
      {reduced ? (
        <div className="grid h-full place-items-center px-4">
          <p className="text-center font-display text-4xl font-bold text-gradient-chrome sm:text-6xl">
            MH Astral Systems
          </p>
        </div>
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
