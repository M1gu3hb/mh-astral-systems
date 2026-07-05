import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import { PROCESO } from '../../data/proceso';

// The 4-step process (docs/03) — a real numbered sequence, connected by the
// brand "dot + line" motif running through the steps.
export default function Proceso() {
  return (
    <section id="proceso" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro, sin sorpresas"
          lead="Del diagnóstico a la entrega, ves avances en el camino y sabes exactamente qué recibes."
        />

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} as="li">
              <div className="group relative h-full rounded-2xl border border-white/8 bg-void-2/40 p-6 transition-all duration-300 ease-out-brand hover:-translate-y-1 hover:border-electric-600/40">
                <span className="font-mono text-4xl font-semibold text-electric-900 transition-colors duration-300 group-hover:text-electric-600">
                  {p.n}
                </span>
                <div className="mt-3 dot-line" />
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-dim">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
