import { Link } from 'react-router-dom';
import PixelSquares from '../components/ui/PixelSquares';

// 404 — kept on-brand and short.
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="absolute inset-0 -z-10 bg-circuit opacity-30" />
      <PixelSquares />
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-electric-400">Error 404</p>
      <h1 className="text-hero font-bold text-gradient-chrome">404</h1>
      <p className="max-w-sm text-silver-dim">Esta ruta no existe o el sistema aún no la construye.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
