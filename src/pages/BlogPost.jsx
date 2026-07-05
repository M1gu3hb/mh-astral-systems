import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from 'lucide-react';
import { getPostBySlug, BLOG_POSTS } from '../data/blog';
import { Markdown } from '../lib/markdown.jsx';
import Reveal from '../components/ui/Reveal';
import GlassCard from '../components/ui/GlassCard';
import { SITE } from '../data/site';
import { whatsappLink, WA_MESSAGES } from '../lib/whatsapp';

const fmtDate = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

// Individual blog post (/blog/:slug). Renders the markdown content and a
// contextual WhatsApp CTA at the end. Unknown slugs show a friendly fallback.
export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container-mh flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32 text-center">
        <h1 className="font-display text-3xl font-semibold text-white">Artículo no encontrado</h1>
        <p className="text-silver-dim">Puede que el enlace haya cambiado.</p>
        <Link to="/blog" className="btn btn-ghost">
          <ArrowLeft size={16} /> Volver al blog
        </Link>
      </div>
    );
  }

  const otros = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="pt-32">
      <div className="container-mh max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-silver-dim transition-colors hover:text-electric-400">
          <ArrowLeft size={16} /> Blog
        </Link>

        <Reveal className="mt-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-silver-faint">
            <span className="rounded-full border border-electric-600/30 bg-electric-900/20 px-2.5 py-0.5 text-electric-400">
              {post.tag}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={13} /> {fmtDate(post.fecha)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} /> {post.lectura}
            </span>
          </div>
          <h1 className="text-section-title font-bold text-white">{post.titulo}</h1>
          <p className="text-lg leading-relaxed text-silver-dim">{post.resumen}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-card border border-white/8">
          <img src={post.cover} alt="" className="aspect-[2/1] w-full object-cover" />
        </Reveal>

        <div className="mt-10">
          <Markdown content={post.contenido} />
        </div>

        {/* end-of-post CTA */}
        <GlassCard className="mt-12 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div>
            <p className="font-display text-lg font-semibold text-white">¿Te suena a tu negocio?</p>
            <p className="text-sm text-silver-dim">Platícame y te digo qué sistema te conviene.</p>
          </div>
          <a
            className="btn btn-primary flex-none"
            href={whatsappLink(WA_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} /> {SITE.whatsapp.display}
          </a>
        </GlassCard>
      </div>

      {/* related */}
      <div className="container-mh max-w-3xl py-section">
        <h2 className="mb-6 font-display text-xl font-semibold text-white">Sigue leyendo</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {otros.map((p) => (
            <GlassCard key={p.slug} as={Link} to={`/blog/${p.slug}`} interactive className="flex flex-col gap-2 p-5">
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-electric-400">{p.tag}</span>
              <h3 className="font-display text-base font-semibold text-white">{p.titulo}</h3>
              <p className="text-sm text-silver-dim">{p.resumen}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </article>
  );
}
