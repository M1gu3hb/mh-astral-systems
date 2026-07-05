import { Suspense, lazy } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Antigravity: a cursor-reactive 3D particle field (three.js). Lazy loaded into
// the `three` chunk. Recolored from the pink default to brand electric/silver
// via the `color` prop (docs/10). Skipped entirely for reduced motion.
const Antigravity = lazy(() => import('../reactbits/Antigravity'));

export default function AmbientField({ color = '#5B8CFF', count = 260 }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <Suspense fallback={null}>
      <Antigravity
        count={count}
        magnetRadius={9}
        ringRadius={8}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={1.3}
        lerpSpeed={0.06}
        color={color}
        autoAnimate
        particleVariance={1}
        rotationSpeed={0.05}
        particleShape="capsule"
      />
    </Suspense>
  );
}
