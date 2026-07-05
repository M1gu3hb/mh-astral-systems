import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Page-wide mouse reactivity (client request: take the bento's spotlight
// feeling to the whole site). One document-level pointer listener, rAF-throttled,
// drives two things:
//   1. a fixed radial "spotlight" that follows the cursor (screen blend),
//   2. a cursor-tracked inner glow on whatever .glass-card / .cursor-card sits
//      under the pointer (sets --gx / --gy / --gi consumed by the CSS).
// Disabled for coarse pointers (touch) and reduced-motion.
export default function CursorGlow() {
  const spotRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;

    const spot = spotRef.current;
    if (!spot) return;

    let rafId = 0;
    let px = 0;
    let py = 0;
    let activeCard = null;

    const clearCard = () => {
      if (activeCard) {
        activeCard.style.setProperty('--gi', '0');
        activeCard = null;
      }
    };

    const render = () => {
      rafId = 0;
      spot.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      spot.style.opacity = '1';
      if (!rafId) rafId = requestAnimationFrame(render);

      const card = e.target.closest?.('.glass-card, .cursor-card');
      if (card !== activeCard) clearCard();
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
        card.style.setProperty('--gi', '1');
        activeCard = card;
      }
    };

    const onLeave = () => {
      spot.style.opacity = '0';
      clearCard();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
      clearCard();
    };
  }, [reduced]);

  if (reduced) return null;

  return <div ref={spotRef} className="cursor-spotlight" aria-hidden="true" />;
}
