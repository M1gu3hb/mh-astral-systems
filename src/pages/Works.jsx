import { Link } from 'react-router-dom';
import { ArrowUpRight, FolderKanban } from 'lucide-react';
import FuzzyText from '../components/reactbits/FuzzyText';
import Casos from '../components/home/Casos';
import GlassCard from '../components/ui/GlassCard';
import Reveal from '../components/ui/Reveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// /works — proof: the real systems in operation + the client portal entrance
// (client-defined structure).
export default function Works() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pt-32">
      <header className="container-mh flex flex-col items-start gap-4">
        <Reveal as="span" className="eyebrow">
          <span className="dot-line" />
          Sistemas reales
        </Reveal>
        {reduced ? (
          <h1 className="font-display text-6xl font-bold text-gradient-chrome sm:text-7xl">Works</h1>
        ) : (
          <h1 aria-label="Works">
            <FuzzyText
              fontSize="clamp(3.2rem, 10vw, 6.5rem)"
              fontWeight={800}
              fontFamily="'Space Grotesk', sans-serif"
              gradient={['#BFD6FF', '#5B8CFF', '#1E5BFF']}
              baseIntensity={0.14}
              hoverIntensity={0.45}
            >
              Works
            </FuzzyText>
          </h1>
        )}
        <Reveal as="p" delay={0.08} className="max-w-xl text-balance text-silver-dim sm:text-lg">
          Nada de mockups: sistemas en producción con operación diaria, y un portal donde mis clientes siguen sus
          proyectos.
        </Reveal>
      </header>

      <Casos />

      {/* portal access */}
      <section className="container-mh pb-section">
        <Reveal>
          <GlassCard interactive className="flex flex-col items-start gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 flex-none place-items-center rounded-xl border border-electric-600/40 bg-electric-900/25">
                <FolderKanban size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">Portal de clientes</h2>
                <p className="mt-1 max-w-md text-sm leading-relaxed text-silver-dim">
                  ¿Ya trabajamos juntos? Entra a ver tus proyectos, avances y archivos — cada proyecto es una carpeta
                  viva.
                </p>
              </div>
            </div>
            <Link to="/portal" className="btn btn-primary flex-none pr-2">
              <span>Entrar al portal</span>
              <span className="btn-orb bg-white/15">
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>
          </GlassCard>
        </Reveal>
      </section>
    </div>
  );
}
