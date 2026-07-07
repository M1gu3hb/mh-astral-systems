import { useEffect, useState } from 'react';

// True on small / touch devices. Used to gate the heavy WebGL pieces (Beams,
// ASCIIText) to desktop and swap in light static fallbacks on phones — the
// biggest lever for mobile smoothness.
const QUERY = '(max-width: 900px), (pointer: coarse)';

export function useIsMobile() {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = () => setMobile(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return mobile;
}

// Read once, synchronously — for module-level decisions (e.g. what to preload
// in the splash) where we don't need reactivity.
export function isMobileNow() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}
