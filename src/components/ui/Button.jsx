import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Pill buttons (docs/02): solid electric-600 primary, thin outline secondary.
// The inner arrow drifts diagonally on hover; active:scale handled in CSS.
export default function Button({
  as = 'button',
  variant = 'primary',
  href,
  to,
  children,
  arrow = true,
  className = '',
  ...rest
}) {
  const cls = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowUpRight className="btn-arrow" size={17} strokeWidth={2} aria-hidden="true" />}
    </>
  );

  if (as === 'a' || href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  if (as === 'link' || to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
