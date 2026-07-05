import { Suspense, lazy } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// DarkVeil is a heavy WebGL shader (ogl) — lazy loaded into its own chunk so it
// never blocks the marketing payload (docs/04 · rendimiento). hueShift pushes
// the CPPN output into the brand blue/black gama (docs/10). A static gradient
// stands in while it loads and whenever the user prefers reduced motion.
const DarkVeil = lazy(() => import('../reactbits/DarkVeil'));

function StaticVeil() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(70% 90% at 78% 8%, rgba(30,91,255,0.28), transparent 55%),' +
          'radial-gradient(60% 80% at 10% 100%, rgba(10,31,85,0.45), transparent 60%),' +
          'linear-gradient(180deg, #070B16, #0B1120)',
      }}
    />
  );
}

export default function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return <StaticVeil />;

  return (
    <Suspense fallback={<StaticVeil />}>
      <div className="absolute inset-0 opacity-[0.55]">
        <DarkVeil hueShift={210} noiseIntensity={0.02} scanlineIntensity={0} speed={0.4} warpAmount={1.2} />
      </div>
    </Suspense>
  );
}
