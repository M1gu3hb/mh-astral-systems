import { ArrowUpRight } from 'lucide-react';
import Reveal from '../ui/Reveal';
import PixelSquares from '../ui/PixelSquares';
import AmbientField from '../backgrounds/AmbientField';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Final CTA block before the footer (docs/01 §9). Antigravity particle field
// (docs/07, recolored to brand silver-blue) drifts behind the message and
// reacts to the cursor.
export default function CTAFinal() {
  return (
    <section className="py-section">
      <div className="container-mh">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-electric-600/25 bg-gradient-to-br from-electric-900/40 via-void-2 to-void px-6 py-16 text-center sm:px-12 sm:py-20">
            {/* cursor-reactive particle field */}
            <div className="pointer-events-auto absolute inset-0 -z-0 opacity-70">
              <AmbientField color="#5B8CFF" count={220} />
            </div>
            <div className="absolute inset-0 -z-0 bg-gradient-to-b from-transparent via-void/40 to-void/80" />

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
              <PixelSquares />
              <h2 className="text-section-title font-semibold text-white">
                ¿Listo para que tu negocio <span className="text-gradient-chrome">venda y se ordene</span>?
              </h2>
              <p className="text-base leading-relaxed text-silver-dim sm:text-lg">
                Cuéntame qué vendes y cómo operas. Te digo qué sistema te conviene — sin compromiso y sin letras
                chiquitas.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  className="btn btn-primary"
                  href={whatsappLink(WA_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Escríbeme al {SITE.whatsapp.display}
                  <ArrowUpRight className="btn-arrow" size={17} strokeWidth={2} />
                </a>
                <a className="btn btn-ghost" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
