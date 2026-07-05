import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';
import PixelSquares from '../ui/PixelSquares';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Footer (docs/01 §10): logo, year, links to Blog/Admin/Portal, contact data.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section border-t border-white/5 bg-void-2/60">
      <div className="container-mh grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-silver-dim">{SITE.tagline}</p>
          <div className="flex items-center gap-2 text-xs text-silver-faint">
            <MapPin size={14} strokeWidth={1.5} /> {SITE.location}
            <PixelSquares className="ml-1" />
          </div>
        </div>

        <nav className="flex flex-col gap-3 text-sm" aria-label="Enlaces del sitio">
          <span className="mb-1 font-mono text-xs uppercase tracking-[0.28em] text-silver-faint">Sitio</span>
          <a href="/#casos" className="text-silver-dim transition-colors hover:text-white">Casos de éxito</a>
          <a href="/#servicios" className="text-silver-dim transition-colors hover:text-white">Servicios</a>
          <a href="/#precios" className="text-silver-dim transition-colors hover:text-white">Precios</a>
          <Link to="/blog" className="text-silver-dim transition-colors hover:text-white">Blog</Link>
          <Link to="/portal" className="text-silver-dim transition-colors hover:text-white">Portal de cliente</Link>
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <span className="mb-1 font-mono text-xs uppercase tracking-[0.28em] text-silver-faint">Contacto</span>
          <a
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-silver-dim transition-colors hover:text-electric-400"
          >
            <MessageCircle size={15} strokeWidth={1.5} /> {SITE.whatsapp.display}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 text-silver-dim transition-colors hover:text-electric-400"
          >
            <Mail size={15} strokeWidth={1.5} /> {SITE.email}
          </a>
          <p className="mt-2 font-signature text-xl text-white/90">Miguel Huerta Bautista</p>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-mh flex flex-col items-center justify-between gap-2 py-5 text-xs text-silver-faint sm:flex-row">
          <span>© {year} {SITE.name}. {SITE.domain}</span>
          <span className="font-mono uppercase tracking-[0.2em]">{SITE.subTagline}</span>
        </div>
      </div>
    </footer>
  );
}
