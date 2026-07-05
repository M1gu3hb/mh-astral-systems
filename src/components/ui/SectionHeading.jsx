import Reveal from './Reveal';

// Consistent section header: mono eyebrow with the dot+line brand motif,
// a display title, and an optional lead paragraph.
export default function SectionHeading({ eyebrow, title, lead, align = 'left', id }) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`} id={id}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow">
          <span className="dot-line" />
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" delay={0.05} className="text-section-title font-semibold text-white">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={0.1} className="text-balance text-base leading-relaxed text-silver-dim sm:text-lg">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
