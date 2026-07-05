import { Link, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import GlassSurface from '../reactbits/GlassSurface';
import StaggeredMenu from '../reactbits/StaggeredMenu';
import Logo from '../ui/Logo';
import { NAV_LINKS, SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { useScrolled } from '../../hooks/useScrolled';
import './navbar.css';

// Navbar = floating "isla flotante" (docs/01) built on GlassSurface — the
// header is the location Miguel fixed for GlassSurface (docs/10). Desktop shows
// inline links + WhatsApp CTA. On mobile the StaggeredMenu (docs/09, recolored)
// provides the full-screen staggered overlay; its toggle floats top-right.
const MENU_ITEMS = [
  { label: 'Inicio', ariaLabel: 'Ir al inicio', link: '/' },
  ...NAV_LINKS.map((l) => ({ label: l.label, ariaLabel: l.ariaLabel, link: l.link })),
  { label: 'Portal', ariaLabel: 'Portal de cliente', link: '/portal' },
  { label: 'Admin', ariaLabel: 'Panel de administración', link: '/admin' },
];

const SOCIAL_ITEMS = [
  { label: 'WhatsApp', link: whatsappLink(WA_MESSAGES.general) },
  { label: 'Correo', link: `mailto:${SITE.email}` },
];

export default function Navbar() {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();

  return (
    <>
      <header className="mh-navbar" data-scrolled={scrolled || undefined}>
        <div className="container-mh">
          <GlassSurface
            width="100%"
            height={64}
            borderRadius={20}
            className="mh-nav-island"
            backgroundOpacity={scrolled ? 0.5 : 0.22}
            brightness={62}
            blur={12}
            distortionScale={-140}
            greenOffset={12}
            blueOffset={22}
          >
            <div className="mh-nav-inner">
              <Logo />

              <nav className="mh-nav-links" aria-label="Navegación principal">
                {NAV_LINKS.map((l) => (
                  <NavItem key={l.label} link={l.link} pathname={pathname}>
                    {l.label}
                  </NavItem>
                ))}
              </nav>

              <a
                className="btn btn-primary mh-nav-cta !hidden min-[900px]:!inline-flex"
                href={whatsappLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </GlassSurface>
        </div>
      </header>

      <StaggeredMenu
        className="mh-nav-menu"
        position="right"
        isFixed
        items={MENU_ITEMS}
        socialItems={SOCIAL_ITEMS}
        displaySocials
        displayItemNumbering
        logoUrl="/logo.png"
        menuButtonColor="#F4F6FA"
        openMenuButtonColor="#F4F6FA"
        accentColor="#1E5BFF"
        colors={['#0A1F55', '#0E1830', '#1E5BFF']}
        changeMenuColorOnOpen
      />
    </>
  );
}

function NavItem({ link, children, pathname }) {
  // Same-page hash links use a plain anchor (smooth scroll); cross-route uses
  // react-router so navigation stays client-side.
  const isHash = link.startsWith('/#');
  if (isHash) {
    return (
      <a href={link} className="mh-nav-link">
        {children}
      </a>
    );
  }
  const active = pathname === link;
  return (
    <Link to={link} className={`mh-nav-link ${active ? 'is-active' : ''}`}>
      {children}
    </Link>
  );
}
