import { Link } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import FlowingMenu from '../components/reactbits/FlowingMenu';
import SectionHeading from '../components/ui/SectionHeading';
import Reveal from '../components/ui/Reveal';
import GlassCard from '../components/ui/GlassCard';
import PixelSquares from '../components/ui/PixelSquares';
import { BLOG_POSTS } from '../data/blog';

const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

// Blog index. FlowingMenu (docs/09, recolored to brand via props) is the
// editorial featured band; below it a scannable glass-card grid gives the
// usual list with metadata and client-side links.
export default function Blog() {
  const items = BLOG_POSTS.map((p) => ({ link: `/blog/${p.slug}`, text: p.titulo, image: p.cover }));

  return (
    <div className="pt-32">
      <div className="container-mh">
        <SectionHeading
          eyebrow="Blog"
          title="Ideas para digitalizar tu negocio"
          lead="Notas sobre paneles de autoedición, POS, automatizaciones y cómo un buen sistema te hace vender más y trabajar mejor."
        />
      </div>

      {/* editorial featured band */}
      <Reveal className="mt-12">
        <div className="h-[58vh] min-h-[380px] w-full border-y border-white/8">
          <FlowingMenu
            items={items}
            speed={16}
            textColor="#F4F6FA"
            bgColor="#070B16"
            marqueeBgColor="#1E5BFF"
            marqueeTextColor="#070B16"
            borderColor="#16213F"
          />
        </div>
      </Reveal>

      {/* scannable list */}
      <div className="container-mh py-section">
        <div className="mb-8 flex items-center gap-3">
          <PixelSquares />
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-silver-faint">Todos los artículos</span>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <GlassCard as={Link} to={`/blog/${p.slug}`} interactive className="group flex h-full flex-col overflow-hidden">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={p.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 ease-out-brand group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-wider text-silver-faint">
                    <span className="rounded-full border border-electric-600/30 bg-electric-900/20 px-2 py-0.5 text-electric-400">
                      {p.tag}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {p.lectura}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-white">{p.titulo}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-silver-dim">{p.resumen}</p>
                  <div className="flex items-center justify-between pt-1 text-xs text-silver-faint">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={13} /> {fmtDate(p.fecha)}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-electric-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
