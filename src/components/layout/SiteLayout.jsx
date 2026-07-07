import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AsciiOutro from './AsciiOutro';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';

// Shared chrome for the public marketing site (Home + Blog). Handles scrolling
// to the top on route change and to a #hash target when present.
export default function SiteLayout({ children }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <AsciiOutro />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
