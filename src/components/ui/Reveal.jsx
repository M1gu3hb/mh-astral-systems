import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Scroll reveal: fade-up + blur-to-sharp, once, on entering the viewport
// (docs/04 — whileInView, never a scroll listener). Reduced motion collapses
// this to a short fade with no translation.
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className = '',
  once = true,
  amount = 0.3,
  ...rest
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] || motion.div;

  const hidden = reduced
    ? { opacity: 0 }
    : { opacity: 0, y, filter: 'blur(10px)' };
  const shown = reduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, filter: 'blur(0px)' };

  return (
    <MotionTag
      initial={hidden}
      whileInView={shown}
      viewport={{ once, amount }}
      transition={{
        duration: reduced ? 0.25 : 0.7,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
