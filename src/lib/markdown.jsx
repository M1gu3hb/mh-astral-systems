// Minimal, dependency-free markdown renderer for blog posts. Supports h2/h3,
// paragraphs, unordered lists and **bold** inline. Input is trusted (our own
// content in src/data/blog.js), so there is no untrusted HTML injection here —
// we build React elements, never dangerouslySetInnerHTML.
import { Fragment } from 'react';

function renderInline(text, keyPrefix) {
  // Split on **bold** while keeping the delimiters' content.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t-${i}`}>{part}</Fragment>;
  });
}

export function Markdown({ content }) {
  const lines = content.split('\n');
  const blocks = [];
  let listBuffer = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length) {
      const items = [...listBuffer];
      blocks.push(
        <ul key={`ul-${key++}`} className="my-5 space-y-2.5 pl-1">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-silver-dim">
              <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-electric-600 shadow-glow-soft" />
              <span className="leading-relaxed">{renderInline(item, `li-${key}-${i}`)}</span>
            </li>
          ))}
        </ul>,
      );
      listBuffer = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith('## ')) {
      flushList();
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-10 mb-3 font-display text-2xl font-semibold text-white sm:text-3xl">
          {renderInline(line.slice(3), `h2-${key}`)}
        </h2>,
      );
      return;
    }
    if (line.startsWith('### ')) {
      flushList();
      blocks.push(
        <h3 key={`h3-${key++}`} className="mt-8 mb-2 font-display text-xl font-semibold text-white">
          {renderInline(line.slice(4), `h3-${key}`)}
        </h3>,
      );
      return;
    }
    if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2));
      return;
    }
    flushList();
    blocks.push(
      <p key={`p-${key++}`} className="my-4 leading-relaxed text-silver-dim">
        {renderInline(line, `p-${key}`)}
      </p>,
    );
  });
  flushList();

  return <div className="text-[1.05rem]">{blocks}</div>;
}
