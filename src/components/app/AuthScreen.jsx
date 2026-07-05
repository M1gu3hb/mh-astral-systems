import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, User, ShieldAlert } from 'lucide-react';
import Logo from '../ui/Logo';
import GlassCard from '../ui/GlassCard';
import PixelSquares from '../ui/PixelSquares';
import { login } from '../../lib/stubAuth';

// SHA-256 of the entered password → hex, compared against the stored digest.
// Keeps the plaintext password out of the JS bundle. (Client-side gate for
// phase 1 — real auth is Supabase in phase 2. Good enough to keep the admin
// panel private since the /admin route is unlinked anywhere on the site.)
async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Reusable login screen for the stub-authenticated areas.
//  - passwordHash set  → validates the password (admin).
//  - passwordHash unset → any input enters (client portal demo).
export default function AuthScreen({ scope, title, subtitle, redirectTo, accent = 'Acceso', demoUser, passwordHash }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(demoUser || '');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError('');

    if (passwordHash) {
      setBusy(true);
      try {
        const hash = await sha256Hex(pwd);
        if (hash !== passwordHash) {
          setError('Contraseña incorrecta.');
          setBusy(false);
          return;
        }
      } catch {
        setError('No se pudo validar. Intenta de nuevo.');
        setBusy(false);
        return;
      }
    }

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
                  placeholder="usuario"
                  autoComplete="username"
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
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-silver-faint focus:outline-none"
                />
              </span>
            </label>

            {error && (
              <p className="inline-flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                <ShieldAlert size={14} /> {error}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn btn-primary mt-2 w-full disabled:opacity-60">
              {busy ? 'Verificando…' : 'Entrar'}
            </button>
          </form>

          {!passwordHash && (
            <p className="mt-5 text-center text-xs text-silver-faint">
              Demo · sin backend todavía. Cualquier dato entra.
            </p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
