import { Suspense, lazy } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// DarkVeil is a heavy WebGL shader (ogl) — lazy loaded into its own chunk so it
// never blocks the marketing payload (docs/04 · rendimiento). The CPPN output
// is multicolored, so a `mix-blend-mode: color` electric-blue layer locks the
// whole animation into the brand blue/black gama (docs/10) while keeping the
// shader's luminance/motion. A static gradient stands in while it loads and
// whenever the user prefers reduced motion.
const DarkVeil = lazy(() => import('../reactbits/DarkVeil'));

function StaticVeil() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(70% 90% at 78% 8%, rgba(30,91,255,0.30), transparent 55%),' +
          'radial-gradient(60% 80% at 10% 100%, rgba(10,31,85,0.5), transparent 60%),' +
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
      <div className="absolute inset-0">
        {/* the animated plasma */}
        <div className="absolute inset-0 opacity-[0.6]">
          <DarkVeil hueShift={200} noiseIntensity={0.015} scanlineIntensity={0} speed={0.38} warpAmount={1.15} />
        </div>
        {/* force every hue to electric blue (keeps the shader's brightness/motion) */}
        <div
          className="absolute inset-0"
          style={{ mixBlendMode: 'color', background: 'linear-gradient(135deg, #3d74ff 0%, #1e5bff 45%, #0a1f55 100%)' }}
        />
        {/* deepen the shadows so the blue reads rich, not washed */}
        <div
          className="absolute inset-0"
          style={{ mixBlendMode: 'multiply', background: 'radial-gradient(80% 80% at 70% 20%, #17306b, #05070f)' }}
        />
      </div>
    </Suspense>
  );
}
