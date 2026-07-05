import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Returns true when the user asked for reduced motion. Used to skip the heavy
// WebGL/3D backgrounds (DarkVeil, Antigravity) and swap in a static gradient,
// per docs/04 (reduce to short fades, no big movement/parallax).
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
