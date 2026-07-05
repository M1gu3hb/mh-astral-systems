// The site-wide "liquid glass" card pattern (docs/10). Rather than isolating
// the glass look to one component, GlassCard extracts the visual language of
// GlassSurface — blur + soft gradient border + inner glow — into a reusable
// surface so the whole site feels consistently "vidrio líquido".
export default function GlassCard({ as: Tag = 'div', interactive = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`glass-card ${interactive ? 'glass-card--interactive' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
