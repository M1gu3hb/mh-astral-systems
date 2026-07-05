// The "4 pixel squares" brand motif from the logo (docs/02) — something
// digital/binary assembling. Used as a small decorative accent near headings
// and loading states. Purely decorative.
export default function PixelSquares({ className = '' }) {
  return (
    <span className={`inline-flex items-start gap-1 ${className}`} aria-hidden="true">
      <span className="mt-0.5 h-2 w-2 rounded-[2px] bg-electric-600" />
      <span className="h-1.5 w-1.5 rounded-[2px] bg-electric-400" />
      <span className="mt-1 h-1 w-1 rounded-[1px] bg-chrome-highlight" />
    </span>
  );
}
