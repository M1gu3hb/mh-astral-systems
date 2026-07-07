import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import CardSwap, { Card } from '../reactbits/CardSwap';
import ScreenMock from './ScreenMock';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

// Services showcase (client request): the scroll-stack was swapped for React Bits
// CardSwap — an auto-cycling 3D deck. Left column explains + CTA, right column is
// the deck cycling one service at a time (title + app preview + benefit line).
const TOTAL = SERVICIOS.length;

function SvcCard({ s, i }) {
  const Icon = s.icon;
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`grid h-11 w-11 flex-none place-items-center rounded-xl border ${
            s.highlight ? 'border-electric-400/60 bg-electric-600/20' : 'border-electric-600/35 bg-void/60'
          }`}
        >
          <Icon size={20} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
        </span>
        <span className="font-mono text-[0.62rem] tracking-[0.24em] text-silver-faint">
          {String(i + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
        </span>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <h3 className="font-display text-base font-semibold leading-tight text-white sm:text-lg">{s.label}</h3>
        {s.highlight && (
          <span className="mt-0.5 flex-none rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.5rem] uppercase tracking-wider text-electric-400">
            Nuevo
          </span>
        )}
      </div>

      {/* app preview */}
      <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-xl border border-white/10 bg-void">
        <ScreenMock i={i} />
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-silver-dim">{s.ayuda}</p>
    </div>
  );
}

// The deck (WebGL-adjacent GSAP 3D + 8 app previews) only runs while the section
// is on screen — otherwise it burns the GPU offscreen and janks the whole page.
function useOnScreen(margin = '250px') {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, visible];
}

function DeckFront() {
  // static first card while the deck is parked (before it scrolls into view)
  return (
    <div className="absolute left-1/2 top-1/2 w-[258px] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 sm:w-[340px]">
      <div className="overflow-hidden rounded-[20px] border border-electric-400/40 bg-gradient-to-b from-panel to-void shadow-[0_30px_80px_-30px_rgba(30,91,255,0.5)]">
        <div className="h-[320px] sm:h-[392px]">
          <SvcCard s={SERVICIOS[0]} i={0} />
        </div>
      </div>
    </div>
  );
}

function ServiciosShowcase() {
  const [deckRef, deckOn] = useOnScreen();
  const isMobile = useIsMobile();
  const deck = isMobile
    ? { width: 258, height: 320, cardDistance: 22, verticalDistance: 28 }
    : { width: 340, height: 392, cardDistance: 46, verticalDistance: 54 };

  return (
    <section id="servicios" className="scroll-mt-28 overflow-hidden py-section">
      <div className="container-mh grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-12">
        {/* left — explain + icon legend + CTA */}
        <div>
          <SectionHeading
            index="01"
            eyebrow="Qué hago"
            title="Servicios que trabajan por tu negocio"
            lead={SITE.support}
          />

          <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Servicios disponibles">
            {SERVICIOS.map((s) => {
              const Icon = s.icon;
              return (
                <li
                  key={s.label}
                  title={s.label}
                  className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors duration-300 ${
                    s.highlight
                      ? 'border-electric-400/60 bg-electric-600/20'
                      : 'border-white/10 bg-void-2/50 hover:border-electric-600/45'
                  }`}
                >
                  <Icon size={19} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
                </li>
              );
            })}
          </ul>

          <a
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-9 pr-2"
          >
            <span>Cuéntame tu proyecto</span>
            <span className="btn-orb bg-white/15">
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* right — auto-cycling deck (mounts only while on screen) */}
        <div ref={deckRef} className="mh-cardswap relative min-h-[380px] sm:min-h-[520px]">
          {deckOn ? (
            <CardSwap
              width={deck.width}
              height={deck.height}
              cardDistance={deck.cardDistance}
              verticalDistance={deck.verticalDistance}
              delay={3600}
              pauseOnHover
              skewAmount={5}
              easing="elastic"
            >
              {SERVICIOS.map((s, i) => (
                <Card key={s.label} customClass="mh-svc-card">
                  <SvcCard s={s} i={i} />
                </Card>
              ))}
            </CardSwap>
          ) : (
            <DeckFront />
          )}
        </div>
      </div>
    </section>
  );
}

// Reduced-motion fallback: plain readable list, no auto-motion.
function StaticList() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Servicios que trabajan por tu negocio"
          lead={SITE.support}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.03}>
              <div className="glass-card h-full overflow-hidden rounded-2xl">
                <SvcCard s={s} i={i} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiciosStack() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticList /> : <ServiciosShowcase />;
}
