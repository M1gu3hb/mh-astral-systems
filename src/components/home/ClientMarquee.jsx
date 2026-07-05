import { CASOS } from '../../data/casos';

// Social-proof strip: the four REAL clients (docs/03) scrolling as folio +
// name pairs. Continuous CSS marquee (compositor-only transform), duplicated
// track for a seamless -50% loop, edge-masked, paused on hover.
function Track({ ariaHidden = false }) {
  return (
    <div
      className="flex flex-none items-center gap-14 pr-14"
      aria-hidden={ariaHidden || undefined}
    >
      {CASOS.map((c) => (
        <span key={c.folio} className="flex items-center gap-4 whitespace-nowrap">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-electric-400">
            {c.folio}
          </span>
          <span className="font-display text-lg font-medium text-white/85 sm:text-xl">
            {c.cliente}
          </span>
          <span className="ml-6 h-1.5 w-1.5 rounded-full bg-electric-600/60" />
        </span>
      ))}
    </div>
  );
}

export default function ClientMarquee() {
  return (
    <section aria-label="Clientes con sistemas en operación" className="relative border-y border-white/5 bg-void-2/40 py-6">
      <p className="mb-4 text-center font-mono text-[0.6rem] uppercase tracking-[0.35em] text-silver-faint">
        Negocios operando con sistemas MH
      </p>
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
        }}
      >
        <div className="mh-marquee">
          <Track />
          <Track ariaHidden />
        </div>
      </div>
    </section>
  );
}
