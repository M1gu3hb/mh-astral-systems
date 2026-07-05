import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import GlassSurface from '../reactbits/GlassSurface';
import StaggeredMenu from '../reactbits/StaggeredMenu';
import Logo from '../ui/Logo';
import { NAV_LINKS, SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { useScrolled } from '../../hooks/useScrolled';
import './navbar.css';

// Navbar = floating "isla flotante" (docs/01) built on GlassSurface — the
// location Miguel fixed for GlassSurface (docs/10). A custom hamburger lives
// INSIDE the island (feels part of the header) on desktop AND mobile; it drives
// the recolored StaggeredMenu (docs/09) overlay by triggering the component's
// own toggle, so its staggered-layer animation is reused untouched.
//
// /admin is intentionally absent — the internal panel is URL-only + password
// gated (client request).
const MENU_ITEMS = [
  { label: 'Inicio', ariaLabel: 'Ir al inicio', link: '/' },
  ...NAV_LINKS.map((l) => ({ label: l.label, ariaLabel: l.ariaLabel, link: l.link })),
  { label: 'Portal', ariaLabel: 'Portal de cliente', link: '/portal' },
];

const SOCIAL_ITEMS = [
  { label: 'WhatsApp', link: whatsappLink(WA_MESSAGES.general) },
  { label: 'Correo', link: `mailto:${SITE.email}` },
];

export default function Navbar() {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const openRef = useRef(false);

  const fireToggle = () => document.querySelector('.mh-nav-menu .sm-toggle')?.click();

  // Close the overlay when a menu link is clicked (route/hash navigation keeps
  // the layout mounted, so the panel wouldn't close on its own).
  useEffect(() => {
    const onDocClick = (e) => {
      const link = e.target.closest?.(
        '#staggered-menu-panel a.sm-panel-item, #staggered-menu-panel a.sm-socials-link',
      );
      if (link && openRef.current) setTimeout(fireToggle, 0);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

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

              <div className="flex items-center gap-2.5">
                <a
                  className="btn btn-primary mh-nav-cta !hidden min-[900px]:!inline-flex"
                  href={whatsappLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>

                <button
                  type="button"
                  className="mh-menu-btn"
                  data-open={menuOpen || undefined}
                  aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={menuOpen}
                  onClick={fireToggle}
                >
                  <span className="mh-menu-lines" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>
              </div>
            </div>
          </GlassSurface>
        </div>
      </header>

      {/* dim backdrop — clicking it closes the overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mh-menu-backdrop"
            onClick={fireToggle}
          />
        )}
      </AnimatePresence>

      {/* visible close — sits above the overlay panel (which covers the island
          hamburger, especially full-width on mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            key="close"
            type="button"
            initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={fireToggle}
            className="mh-menu-close"
            aria-label="Cerrar menú"
          >
            <X size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

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
        closeOnClickAway={false}
        onMenuOpen={() => {
          openRef.current = true;
          setMenuOpen(true);
        }}
        onMenuClose={() => {
          openRef.current = false;
          setMenuOpen(false);
        }}
      />
    </>
  );
}

function NavItem({ link, children, pathname }) {
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
