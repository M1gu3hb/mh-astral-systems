import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User } from 'lucide-react';
import Logo from '../ui/Logo';
import GlassCard from '../ui/GlassCard';
import PixelSquares from '../ui/PixelSquares';
import { login } from '../../lib/stubAuth';

// Reusable login screen for the stub-authenticated areas. It does NOT validate
// credentials (phase 1, docs/06) — it just records a demo session and enters.
export default function AuthScreen({ scope, title, subtitle, redirectTo, accent = 'Acceso', demoUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(demoUser || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(scope, user || 'demo');
    navigate(redirectTo);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-5">
      <div className="absolute inset-0 -z-10 bg-circuit opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void via-void-2 to-void" />

      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-silver-dim transition-colors hover:text-white">
          <ArrowLeft size={16} /> Volver al sitio
        </Link>

        <GlassCard className="p-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <Logo withWordmark={false} />
            <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-electric-400">
              <PixelSquares /> {accent}
            </span>
            <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-silver-dim">{subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-silver-faint">Usuario</span>
              <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-void/60 px-3 focus-within:border-electric-600/60">
                <User size={16} className="text-silver-faint" />
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="tu-usuario"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-silver-faint focus:outline-none"
                />
              </span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-silver-faint">Contraseña</span>
              <span className="flex items-center gap-2 rounded-xl border border-white/10 bg-void/60 px-3 focus-within:border-electric-600/60">
                <Lock size={16} className="text-silver-faint" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-silver-faint focus:outline-none"
                />
              </span>
            </label>

            <button type="submit" className="btn btn-primary mt-2 w-full">
              Entrar
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-silver-faint">
            Demo · sin backend todavía. Cualquier dato entra.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
