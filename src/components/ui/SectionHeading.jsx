import Reveal from './Reveal';

// Consistent section header: mono eyebrow with the dot+line brand motif, an
// editorial section index ("/03"), a display title and an optional lead.
export default function SectionHeading({ eyebrow, title, lead, align = 'left', id, index }) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignCls}`} id={id}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow">
          <span className="dot-line" />
          {eyebrow}
          {index && <span className="text-silver-faint tracking-[0.2em]">/{index}</span>}
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
