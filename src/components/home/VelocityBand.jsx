import ScrollVelocity from '../reactbits/ScrollVelocity';
import { CASOS } from '../../data/casos';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// ScrollVelocity band (react-bits) — replaces the old CSS client marquee.
// Row 1: the four REAL clients. Row 2: the brand line. Speed reacts to how
// fast you scroll; rows run in opposite directions.
const CLIENTS_LINE = CASOS.map((c) => c.cliente).join('  ·  ') + '  ·  ';
const BRAND_LINE = 'UX · WEB · SYSTEMS · MH ASTRAL SYSTEMS · ';

export default function VelocityBand() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <section className="border-y border-white/5 bg-void-2/40 py-6 text-center">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-silver-dim">{CLIENTS_LINE}</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Clientes con sistemas en operación"
      className="overflow-hidden border-y border-white/5 bg-void-2/40 py-6"
      style={{
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <ScrollVelocity
        texts={[CLIENTS_LINE, BRAND_LINE]}
        velocity={55}
        numCopies={8}
        className="mh-velocity-row"
      />
    </section>
  );
}
