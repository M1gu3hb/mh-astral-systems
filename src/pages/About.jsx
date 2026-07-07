import FuzzyText from '../components/reactbits/FuzzyText';
import Tiers from '../components/home/Tiers';
import CTAFinal from '../components/home/CTAFinal';
import ContactCard from '../components/home/ContactCard';
import Reveal from '../components/ui/Reveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// /about — the "who you're hiring and how" page: plans, the big CTA and the
// real business card with a real owner (client-defined structure).
export default function About() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pt-32">
      <header className="container-mh flex flex-col items-start gap-4">
        <Reveal as="span" className="eyebrow">
          <span className="dot-line" />
          Quién está detrás
        </Reveal>
        {reduced ? (
          <h1 className="font-display text-6xl font-bold text-gradient-chrome sm:text-7xl">About</h1>
        ) : (
          <h1 aria-label="About">
            <FuzzyText
              fontSize="clamp(3.2rem, 10vw, 6.5rem)"
              fontWeight={800}
              fontFamily="'Space Grotesk', sans-serif"
              gradient={['#BFD6FF', '#5B8CFF', '#1E5BFF']}
              baseIntensity={0.14}
              hoverIntensity={0.45}
            >
              About
            </FuzzyText>
          </h1>
        )}
        <Reveal as="p" delay={0.08} className="max-w-xl text-balance text-silver-dim sm:text-lg">
          Un negocio real, con dueño con nombre: elige cuánto control quieres y platiquemos directo.
        </Reveal>
      </header>

      <Tiers />
      <CTAFinal />
      <ContactCard />
    </div>
  );
}
