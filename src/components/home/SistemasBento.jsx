import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import MagicBento from '../reactbits/MagicBento';

// MagicBento (docs/08) as the "Sistemas que construimos" showcase — its
// placeholder cards were swapped for real MH systems inside the component, and
// glowColor is the brand electric blue in "R, G, B" form (docs/10). This adds
// the liquid-glow variety the design system asks for, distinct from the plain
// flyer-style Servicios list above.
export default function SistemasBento() {
  return (
    <section className="py-section">
      <div className="container-mh flex flex-col items-center">
        <SectionHeading
          align="center"
          eyebrow="El sistema completo"
          title="No es una página. Es tu operación, ordenada."
          lead="Cada pieza se conecta: presencia, ventas, seguimiento y medición trabajando como un solo sistema."
        />
        <Reveal delay={0.1} className="mt-12 flex w-full justify-center">
          <MagicBento
            glowColor="30, 91, 255"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism
            clickEffect
            spotlightRadius={320}
            particleCount={10}
          />
        </Reveal>
      </div>
    </section>
  );
}
