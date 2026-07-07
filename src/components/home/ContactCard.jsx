import { MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Folder from '../reactbits/Folder';
import { SITE } from '../../data/site';
import { whatsappLink, WA_MESSAGES } from '../../lib/whatsapp';

// Contact card entries reused as Folder "papers".
const paper = (Icon, label, value) => (
  <div className="flex h-full w-full flex-col justify-center gap-1 rounded-[10px] px-3 text-card-text">
    <Icon size={16} strokeWidth={1.5} className="text-card-accent" />
    <span className="text-[0.6rem] uppercase tracking-wider text-black-ink/60">{label}</span>
    <span className="text-[0.72rem] font-semibold leading-tight">{value}</span>
  </div>
);

export default function ContactCard() {
  return (
    <section id="contacto" className="scroll-mt-28 py-section">
      <div className="container-mh">
        <SectionHeading
          align="center"
          index="02"
          eyebrow="Tarjeta digital"
          title="Un negocio real, con dueño con nombre"
          lead="No una agencia anónima. Guarda el contacto y platiquemos por WhatsApp."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Light-mode business card — isolated from the dark site (docs/02) */}
          <Reveal>
            <article className="relative overflow-hidden rounded-card bg-card-bg p-7 text-card-text shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-9">
              <div className="flex flex-col gap-1">
                <img src="/logo.png" alt="MH Astral Systems" width={92} className="w-20" />
                <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-card-accent">
                  {SITE.subTagline}
                </span>
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
