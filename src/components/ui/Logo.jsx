import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';

// The MH monogram + wordmark. Uses the original SVG asset (docs/02: "usar el
// archivo original, no recrearlo en CSS") with breathing room around it.
export default function Logo({ withWordmark = true, className = '' }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={`${SITE.name} — inicio`}
    >
      <img
        src="/logo-mh.svg"
        alt=""
        width={44}
        height={30}
        className="h-[30px] w-auto transition-transform duration-300 ease-out-brand group-hover:scale-105"
        draggable={false}
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-semibold tracking-tight text-white">
            MH Astral Systems
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-electric-400">
            {SITE.subTagline}
          </span>
        </span>
      )}
    </Link>
  );
}
