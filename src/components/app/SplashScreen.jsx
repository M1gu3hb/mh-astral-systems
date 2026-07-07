import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PixelSquares from '../ui/PixelSquares';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { isMobileNow } from '../../hooks/useIsMobile';

// Entry splash. It genuinely PRELOADS the site before revealing it (client
// request: "cargar todo en el inicio"): every Proceso scroll-scrub frame, the
// fonts, and — on desktop — the heavy three.js chunks. So once you're in,
// navigating and scrolling don't re-download or jank. Minimum time so the
// animation reads; a hard cap so a stuck asset can never trap the user.
const MIN_MS = 1600;
const MAX_MS = 9000;
const FRAME_COUNT = 60;

function preloadFrames() {
  const tasks = [];
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const src = `/media/proceso-frames/f-${String(i).padStart(3, '0')}.webp`;
    const im = new Image();
    tasks.push(
      new Promise((res) => {
        im.onload = res;
        im.onerror = res;
      }),
    );
    im.src = src; // warms the HTTP cache; ProcesoShowcase re-reads from cache instantly
  }
  return Promise.allSettled(tasks);
}

function preloadEverything() {
  const tasks = [preloadFrames()];

  // fonts
  if (document.fonts && document.fonts.ready) tasks.push(document.fonts.ready.catch(() => {}));

  // logo
  const logo = new Image();
  tasks.push(new Promise((r) => { logo.onload = r; logo.onerror = r; }));
  logo.src = '/logo.png';

  // heavy WebGL chunks: Beams is the hero bg on every device; ASCIIText is the
  // desktop-only sign-off (mobile uses FuzzyText). Preload accordingly.
  tasks.push(import('../reactbits/Beams').catch(() => {}));
  if (!isMobileNow()) tasks.push(import('../reactbits/ASCIIText').catch(() => {}));

  return Promise.allSettled(tasks);
}

function useAppReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    const min = new Promise((r) => setTimeout(r, MIN_MS));
    const loaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener('load', r, { once: true }));

    Promise.all([min, loaded, preloadEverything()]).then(finish);
    const cap = setTimeout(finish, MAX_MS);
    return () => clearTimeout(cap);
  }, []);
  return ready;
}

export default function SplashScreen({ children }) {
  const ready = useAppReady();
  const reduced = usePrefersReducedMotion();

  // lock scroll while the splash is up
  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [ready]);

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
            <div className="absolute inset-0 bg-circuit opacity-30" aria-hidden="true" />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{ background: 'radial-gradient(45% 45% at 50% 42%, rgba(30,91,255,0.16), transparent 70%)' }}
            />

            <div className="relative grid place-items-center">
              {!reduced && (
                <>
                  <span
                    className="absolute h-44 w-44 rounded-full animate-spin-slow sm:h-52 sm:w-52"
                    style={{
                      background:
                        'conic-gradient(from 0deg, transparent 0deg, transparent 250deg, rgba(30,91,255,0.9) 320deg, rgba(191,214,255,0.9) 355deg, transparent 360deg)',
                      mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
                      WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))',
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
                      WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 0.5px))',
                      animationDuration: '5s',
                    }}
                    aria-hidden="true"
                  />
                </>
              )}
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
              <span className="skeleton block h-1 w-36 rounded-full" aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
