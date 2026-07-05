import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { useScrolled } from '../../hooks/useScrolled';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Floating WhatsApp CTA — the site's single conversion goal (docs/00) kept one
// thumb-tap away once the visitor commits to scrolling. Spring entrance, ping
// halo, text collapses to the orb alone on small screens.
export default function FloatingWhatsApp() {
  const show = useScrolled(560);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, scale: 0.6, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 18 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          href={whatsappLink(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbeme por WhatsApp — respuesta directa de Miguel"
          className="group fixed bottom-5 right-5 z-[55] flex items-center gap-2.5 rounded-pill py-2 pl-5 pr-2 text-sm font-medium text-white transition-all duration-500 ease-out-brand hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(180deg, #3d74ff 0%, #1e5bff 55%, #1848d6 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(191,214,255,0.45), 0 14px 40px -12px rgba(30,91,255,0.85)',
          }}
        >
          <span className="hidden sm:inline">¿Platicamos?</span>
          <span className="relative grid h-9 w-9 flex-none place-items-center rounded-full bg-white/15 transition-transform duration-500 ease-out-brand group-hover:scale-105">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-electric-400/40 [animation-duration:2.4s]"
              aria-hidden="true"
            />
            <MessageCircle size={17} strokeWidth={1.75} className="relative" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
