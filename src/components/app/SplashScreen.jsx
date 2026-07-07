import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PixelSquares from '../ui/PixelSquares';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Entry splash: the real MH logo with a spinning tech ring while the page
// finishes loading. It stays up until the window `load` event (so fonts,
// chunks and the hero are ready) with a minimum of ~1.6s for the animation to
// read and a hard cap so a slow third-party can never trap the user.
const MIN_MS = 1600;
const MAX_MS = 4500;

function useAppReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const min = new Promise((r) => setTimeout(r, MIN_MS));
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }));
    const cap = new Promise((r) => setTimeout(r, MAX_MS));
    Promise.race([Promise.all([min, loaded]), cap]).then(() => setReady(true));

    // Warm the heavy lazy chunks while the splash is on screen so the hero
    // background is ready the moment we reveal the page.
    import('../reactbits/Beams').catch(() => {});
    import('../reactbits/ASCIIText').catch(() => {});
  }, []);
  return ready;
}

export default function SplashScreen({ children }) {
  const ready = useAppReady();
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 1.04, filter: reduced ? 'none' : 'blur(6px)' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-void"
            aria-label="Cargando MH Astral Systems"
            role="status"
          >
            {/* faint circuit texture */}
            <div className="absolute inset-0 bg-circuit opacity-30" aria-hidden="true" />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(45% 45% at 50% 42%, rgba(30,91,255,0.16), transparent 70%)',
              }}
            />

            <div className="relative grid place-items-center">
              {/* spinning loader ring */}
              {!reduced && (
                <>
                  <span
                    className="absolute h-44 w-44 rounded-full animate-spin-slow sm:h-52 sm:w-52"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(30,91,255,0.9) 320deg, rgba(191,214,255,0.9) 355deg, transparent 360deg)',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
                      WebkitMask:
                        'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
                      animationDuration: '1.6s',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="absolute h-56 w-56 rounded-full opacity-50 animate-spin-slower sm:h-64 sm:w-64"
                    style={{
                      background:
                        'conic-gradient(from 180deg, transparent 0deg, rgba(91,140,255,0.5) 40deg, transparent 90deg)',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
                      WebkitMask:
                        'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
                      animationDuration: '5s',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}
              {/* breathing glow + the real logo */}
              <span className="absolute h-40 w-40 rounded-full bg-electric-600/25 blur-2xl animate-glow-breathe" aria-hidden="true" />
              <motion.img
                src="/logo.png"
                alt="MH Astral Systems"
                width={112}
                height={100}
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-24 drop-shadow-[0_8px_36px_rgba(30,91,255,0.65)] sm:w-28"
                draggable={false}
              />
            </div>

            <div className="relative mt-12 flex flex-col items-center gap-3">
              <span className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.4em] text-silver-dim">
                <PixelSquares />
                MH Astral Systems
              </span>
              {/* loading shimmer bar */}
              <span className="skeleton block h-1 w-36 rounded-full" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
