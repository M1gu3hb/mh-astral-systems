import { ArrowUpRight } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '../reactbits/ScrollStack';
import ScreenMock from './ScreenMock';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import { SERVICIOS } from '../../data/servicios';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Services as a ScrollStack (client request): full cards that stack on top of
// each other as you scroll. Each card = service title + how it helps the
// business + a little animated app-mock beside it (ScreenMock, floating).
function CardContent({ s, i }) {
  const Icon = s.icon;
  return (
    <div className="grid h-full items-center gap-6 md:grid-cols-[1.05fr_0.95fr]">
      {/* info */}
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`grid h-12 w-12 flex-none place-items-center rounded-xl border ${
              s.highlight ? 'border-electric-400/60 bg-electric-600/20' : 'border-electric-600/35 bg-void/50'
            }`}
          >
            <Icon size={22} strokeWidth={1.5} className="text-electric-400" aria-hidden="true" />
          </span>
          <span className="font-mono text-[0.65rem] tracking-[0.24em] text-silver-faint">
            {String(i + 1).padStart(2, '0')} / {String(SERVICIOS.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-xl font-semibold leading-tight text-white sm:text-2xl">{s.label}</h3>
          {s.highlight && (
            <span className="rounded-full border border-electric-400/40 bg-electric-600/20 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-electric-400">
              Destacado
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-silver-dim">{s.desc}</p>

        <div className="mt-1 border-l-2 border-electric-600/60 pl-3">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-electric-400">
            Cómo ayuda a tu negocio
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white/85">{s.ayuda}</p>
        </div>

        <a
          href={whatsappLink(s.highlight ? WA_MESSAGES.panel : WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-1 inline-flex w-fit items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-electric-400 transition-colors duration-300 hover:text-white"
        >
          Lo quiero para mi negocio
          <ArrowUpRight
            size={13}
            strokeWidth={1.75}
            className="transition-transform duration-300 ease-out-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* little animation beside the card: floating app-mock screen */}
      <div className="relative hidden sm:block">
        <div className="absolute -inset-4 rounded-[2rem] bg-electric-600/10 blur-2xl" aria-hidden="true" />
        <div className="relative animate-float-slow overflow-hidden rounded-2xl border border-white/12 bg-void shadow-[0_30px_80px_-30px_rgba(30,91,255,0.45)]">
          <div className="aspect-[16/10] w-full">
            <ScreenMock i={i} />
          </div>
          {/* soft scanline sweep to make it feel alive */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scanline bg-gradient-to-b from-transparent via-electric-400/10 to-transparent [animation-duration:4.5s] [animation-iteration-count:infinite]"
          />
        </div>
      </div>
    </div>
  );
}

function StackShowcase() {
  return (
    <section id="servicios" className="scroll-mt-28 pt-section">
      <div className="container-mh">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Servicios que trabajan por tu negocio"
          lead={SITE.support}
        />
      </div>

      <div className="container-mh">
        <ScrollStack
          className="mh-stack"
          useWindowScroll
          itemDistance={90}
          itemScale={0.028}
          itemStackDistance={14}
          stackPosition="16%"
          scaleEndPosition="8%"
          baseScale={0.86}
          blurAmount={1}
        >
          {SERVICIOS.map((s, i) => (
            <ScrollStackItem key={s.label} itemClassName="glass-card">
              <CardContent s={s} i={i} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}

// Reduced-motion fallback: plain readable list, no pinning/stacking.
function StaticList() {
  return (
    <section id="servicios" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          index="01"
          eyebrow="Qué hago"
          title="Servicios que trabajan por tu negocio"
          lead={SITE.support}
        />
        <div className="mt-10 flex flex-col gap-5">
          {SERVICIOS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.03}>
              <div className="glass-card p-6 sm:p-8">
                <CardContent s={s} i={i} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiciosStack() {
  const reduced = usePrefersReducedMotion();
  return reduced ? <StaticList /> : <StackShowcase />;
}
