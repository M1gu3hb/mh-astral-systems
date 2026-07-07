import { Link } from 'react-router-dom';
import FuzzyText from '../components/reactbits/FuzzyText';
import PixelSquares from '../components/ui/PixelSquares';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// 404 — FuzzyText glitching brand-blue numerals.
export default function NotFound() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-circuit opacity-30" />
      <PixelSquares />
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-electric-400">Error 404</p>
      {reduced ? (
        <h1 className="text-hero font-bold text-gradient-chrome">404</h1>
      ) : (
        <h1 aria-label="404">
          <FuzzyText
            fontSize="clamp(4rem, 16vw, 10rem)"
            fontWeight={900}
            fontFamily="'Space Grotesk', sans-serif"
            gradient={['#BFD6FF', '#5B8CFF', '#1E5BFF']}
            baseIntensity={0.16}
            hoverIntensity={0.55}
            glitchMode
            glitchInterval={2400}
            glitchDuration={180}
          >
            404
          </FuzzyText>
        </h1>
      )}
      <p className="max-w-sm text-silver-dim">Esta ruta no existe o el sistema aún no la construye.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
