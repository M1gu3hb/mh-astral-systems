import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Ambient background layer for the scroll-animation sections. A looping video
// (the Google Flow clip — dropped into /public later) sits behind the coded
// scroll animation; a rich brand fallback covers it so the section looks
// finished even before the video exists (or on reduced motion). The video is
// only decorative and never blocks interaction.
export default function VideoBackdrop({ src, tint = 'rgba(7,11,22,0.62)', videoOpacity = 0.55, className = '' }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onOk = () => setReady(true);
    v.addEventListener('canplay', onOk);
    // if it errors (file not there yet), stay on the fallback silently
    return () => v.removeEventListener('canplay', onOk);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* brand fallback — always present, so the section is complete without video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 70% at 70% 12%, rgba(30,91,255,0.22), transparent 60%),' +
            'radial-gradient(70% 80% at 12% 100%, rgba(10,31,85,0.5), transparent 62%),' +
            'linear-gradient(180deg, #070B16, #0B1120 60%, #070B16)',
        }}
      />
      <div className="absolute inset-0 bg-circuit opacity-[0.35]" />

      {src && !reduced && (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? videoOpacity : 0 }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* contrast wash so glass cards + text always read on top */}
      <div className="absolute inset-0" style={{ background: tint }} />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </div>
  );
}
