import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from '../ui/Logo';
import { logout } from '../../lib/stubAuth';

// Minimal chrome shared by the Admin and Client Portal areas: a glass top bar
// with the logo, a scope badge and a logout that clears the stub session.
export default function DashboardShell({ scope, badge, title, subtitle, actions, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(scope);
    navigate(scope === 'admin' ? '/admin' : '/portal');
  };

  return (
    <div className="min-h-screen bg-void">
      <header className="sticky top-0 z-40 border-b border-white/8 bg-void/80 backdrop-blur-xl">
        <div className="container-mh flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo withWordmark={false} />
            <span className="hidden font-mono text-xs uppercase tracking-[0.28em] text-electric-400 sm:inline">
              {badge}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden text-sm text-silver-dim transition-colors hover:text-white sm:inline">
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-pill border border-white/10 px-3.5 py-2 text-sm text-silver-dim transition-colors hover:border-electric-600/50 hover:text-white"
            >
              <LogOut size={15} strokeWidth={1.75} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="container-mh py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-display text-3xl font-semibold text-white">{title}</h1>
            {subtitle && <p className="mt-1 text-silver-dim">{subtitle}</p>}
          </div>
          {actions}
        </div>
        {children}
      </div>
    </div>
  );
}
