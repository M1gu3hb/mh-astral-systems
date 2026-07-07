import { motion } from 'motion/react';
import { MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Folder from '../reactbits/Folder';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// Pseudo-QR graphic (visual placeholder — the real QR target is still pending
// Miguel's decision, docs/03). Deterministic module pattern so it looks like a
// real code without external libraries.
function QR({ size = 132 }) {
  const modules = 21;
  const cell = size / modules;
  const rects = [];
  const isFinder = (r, c) =>
    (r < 7 && c < 7) || (r < 7 && c >= modules - 7) || (r >= modules - 7 && c < 7);
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      if (isFinder(r, c)) continue;
      // deterministic pseudo-random fill
      if ((r * 7 + c * 13 + r * c) % 3 === 0) {
        rects.push(<rect key={`${r}-${c}`} x={c * cell} y={r * cell} width={cell} height={cell} rx={cell * 0.2} />);
      }
    }
  }
  const finder = (x, y) => (
    <g key={`f-${x}-${y}`} transform={`translate(${x} ${y})`}>
      <rect width={cell * 7} height={cell * 7} rx={cell} fill="#0A0A0C" />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} rx={cell * 0.6} fill="#F4F6FA" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} rx={cell * 0.4} fill="#1E5BFF" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Código QR de contacto">
      <rect width={size} height={size} rx={cell} fill="#F4F6FA" />
      <g fill="#0A0A0C">{rects}</g>
      {finder(0, 0)}
      {finder(size - cell * 7, 0)}
      {finder(0, size - cell * 7)}
    </svg>
  );
}

// Contact card entries reused as Folder "papers".
const paper = (Icon, label, value) => (
  <div className="flex h-full w-full flex-col justify-center gap-1 rounded-[10px] px-3 text-card-text">
    <Icon size={16} strokeWidth={1.5} className="text-card-accent" />
    <span className="text-[0.6rem] uppercase tracking-wider text-black-ink/60">{label}</span>
    <span className="text-[0.72rem] font-semibold leading-tight">{value}</span>
  </div>
);

export default function ContactCard() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="contacto" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          align="center"
          index="02"
          eyebrow="Tarjeta digital"
          title="Un negocio real, con dueño con nombre"
          lead="No una agencia anónima. Escanea, guarda el contacto y platiquemos por WhatsApp."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Light-mode business card — isolated from the dark site (docs/02) */}
          <Reveal>
            <article className="relative overflow-hidden rounded-card bg-card-bg p-7 text-card-text shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-9">
              {/* QR scan line — one horizontal pass on entering view (docs/04) */}
              {!reduced && (
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 1, 0], y: ['-10%', '120%'] }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  className="pointer-events-none absolute right-7 top-7 z-10 h-32 w-32 origin-top sm:right-9"
                  style={{ background: 'linear-gradient(180deg, transparent, rgba(30,91,255,0.55), transparent)' }}
                />
              )}

              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <img src="/logo.png" alt="MH Astral Systems" width={92} className="w-20" />
                  <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-card-accent">
                    {SITE.subTagline}
                  </span>
                </div>
                <div className="relative">
                  <QR />
                </div>
              </div>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-black-ink/70">{SITE.tagline}</p>

              <div className="mt-6 flex flex-col gap-3">
                {[
                  { Icon: MessageCircle, label: 'WhatsApp', value: SITE.whatsapp.display },
                  { Icon: Mail, label: 'Correo', value: SITE.email },
                  { Icon: MapPin, label: 'Ubicación', value: SITE.location },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    {/* dot + line motif from the physical card */}
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-card-accent" />
                      <span
                        className="h-6 w-px bg-card-accent/60"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)' }}
                      />
                    </span>
                    <Icon size={17} strokeWidth={1.5} className="text-card-accent" />
                    <span className="text-sm">
                      <span className="text-black-ink/50">{label}: </span>
                      <span className="font-semibold">{value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-signature text-3xl text-black-ink">Miguel Huerta Bautista</p>
            </article>
          </Reveal>

          {/* Folder as a "contact file" (docs/10) — opens to reveal contact papers */}
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center gap-8 rounded-card border border-white/8 bg-void-2/40 p-8">
              <p className="text-center text-sm text-silver-dim">
                Abre el expediente de contacto <span className="text-silver-faint">(clic)</span>
              </p>
              <div className="grid h-52 place-items-center">
                <Folder
                  color="#1E5BFF"
                  size={1.5}
                  items={[
                    paper(MessageCircle, 'WhatsApp', SITE.whatsapp.display),
                    paper(Mail, 'Correo', 'mhastralsystems@…'),
                    paper(MapPin, 'CDMX', 'Xochimilco'),
                  ]}
                />
              </div>
              <a
                className="btn btn-primary"
                href={whatsappLink(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbeme por WhatsApp
                <ExternalLink size={16} strokeWidth={2} className="btn-arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
