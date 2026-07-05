import { Check, Star } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import GlassCard from '../ui/GlassCard';
import { TIERS } from '../../data/tiers';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Price tiers as liquid-glass cards. The "más elegido" tier is elevated with a
// stronger glow and a badge (docs/03). Prices show "Cotización personalizada"
// (docs/01 launch option) until Miguel sets real numbers.
export default function Tiers() {
  return (
    <section id="precios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Planes"
          title="Elige cuánto control quieres"
          lead="Desde una presencia bien hecha hasta un sistema que editas tú mismo, con o sin generación de imágenes por IA."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.nombre} delay={i * 0.08} className={t.destacado ? 'lg:relative lg:z-10' : ''}>
              <GlassCard
                interactive
                className={`flex h-full flex-col gap-5 p-6 sm:p-7 ${
                  t.destacado
                    ? 'ring-1 ring-electric-600/60 shadow-glow lg:scale-[1.045] lg:-translate-y-1.5'
                    : 'lg:mt-2'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold text-white">{t.nombre}</h3>
                  {t.destacado && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-electric-400/40 bg-electric-600/20 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-electric-400">
                      <Star size={11} strokeWidth={2} className="fill-electric-400 text-electric-400" />
                      Más elegido
                    </span>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-silver-dim">{t.resumen}</p>

                <div className="flex flex-col">
                  <span className="font-display text-2xl font-semibold text-gradient-chrome">{t.precio}</span>
                  <span className="font-mono text-xs uppercase tracking-wider text-silver-faint">{t.periodo}</span>
                </div>

                <ul className="flex flex-1 flex-col gap-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-silver-dim">
                      <Check size={16} className="mt-0.5 flex-none text-electric-400" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>

                <p className="border-t border-white/8 pt-3 text-xs leading-relaxed text-silver-faint">
                  {t.letraChica}
                </p>

                <a
                  className={`btn ${t.destacado ? 'btn-primary' : 'btn-ghost'} w-full`}
                  href={whatsappLink(WA_MESSAGES.cotizar)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cotizar este plan
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <p className="mt-9 text-center text-sm text-silver-dim">
          ¿No sabes cuál va con tu negocio?{' '}
          <a
            href={whatsappLink(WA_MESSAGES.cotizar)}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-electric-600/50 pb-0.5 font-medium text-electric-400 transition-colors duration-300 hover:border-electric-400 hover:text-white"
          >
            Escríbeme y lo definimos juntos
          </a>
        </p>
        <p className="mt-3 text-center text-xs text-silver-faint">
          Cambios menores incluidos según tu plan · cambios grandes se cotizan aparte.
        </p>
      </div>
    </section>
  );
}
