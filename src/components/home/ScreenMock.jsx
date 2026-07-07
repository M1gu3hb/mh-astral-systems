// Per-service "app on the laptop screen" mockups. Each fills the laptop screen
// and sits BEHIND the liquid-glass caption (GlassSurface), so the glass refracts
// it like water. Recognizable but lightweight — pure divs, brand blue.

const Dots = () => (
  <span className="flex items-center gap-1">
    <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
    <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
  </span>
);

const Bar = ({ w = 'w-full', c = 'bg-white/12', h = 'h-2' }) => (
  <span className={`block rounded-full ${h} ${w} ${c}`} />
);

function Chrome({ label, children }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#070b16] p-3 text-white sm:p-4">
      <div className="mb-3 flex items-center gap-2 border-b border-white/8 pb-2">
        <Dots />
        <span className="ml-1 flex-1 truncate rounded-md bg-white/5 px-2 py-0.5 font-mono text-[8px] text-silver-faint">
          {label}
        </span>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}

function MiniQR() {
  const n = 11;
  const cells = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if ((r * 5 + c * 11 + r * c) % 3 === 0)
        cells.push(<span key={`${r}-${c}`} style={{ gridColumn: c + 1, gridRow: r + 1 }} className="rounded-[1px] bg-[#0a0a0c]" />);
  return (
    <div className="grid aspect-square w-full rounded-md bg-white p-1.5" style={{ gridTemplateColumns: `repeat(${n},1fr)`, gridTemplateRows: `repeat(${n},1fr)` }}>
      {cells}
    </div>
  );
}

export default function ScreenMock({ i }) {
  switch (i) {
    // 0 · Panel de autoedición
    case 0:
      return (
        <Chrome label="confetti.mx/admin">
          <div className="flex h-full flex-col gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-electric-600/40 bg-electric-900/25 p-2">
              <div className="h-9 w-9 rounded-md bg-gradient-to-br from-electric-600 to-electric-900" />
              <div className="flex-1 space-y-1.5">
                <Bar w="w-2/3" c="bg-white/25" />
                <span className="inline-block rounded bg-electric-600/30 px-1.5 py-0.5 font-mono text-[9px] text-electric-400">$150</span>
              </div>
              <span className="rounded-md bg-electric-600 px-2 py-1 font-mono text-[8px] text-white">Editar</span>
            </div>
            {[0, 1].map((k) => (
              <div key={k} className="flex items-center gap-2 rounded-lg border border-white/8 bg-void-2/60 p-2">
                <div className="h-8 w-8 rounded-md bg-white/8" />
                <div className="flex-1 space-y-1"><Bar w="w-1/2" /><Bar w="w-1/3" c="bg-electric-600/25" /></div>
              </div>
            ))}
          </div>
        </Chrome>
      );

    // 1 · Páginas web profesionales
    case 1:
      return (
        <Chrome label="tunegocio.com">
          <div className="flex h-full flex-col">
            <div className="mb-2 flex items-center justify-between">
              <Bar w="w-16" c="bg-white/25" />
              <div className="flex gap-1.5"><Bar w="w-6" /><Bar w="w-6" /><span className="rounded bg-electric-600 px-2 py-0.5 font-mono text-[8px]">CTA</span></div>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg bg-gradient-to-br from-electric-900/40 to-void-2 p-3">
              <div className="flex-1 space-y-1.5">
                <Bar w="w-11/12" h="h-3" c="bg-white/30" />
                <Bar w="w-3/4" h="h-3" c="bg-electric-400/50" />
                <Bar w="w-full" />
                <span className="mt-1 inline-block rounded-full bg-electric-600 px-2.5 py-1 font-mono text-[8px]">Cotiza ahora</span>
              </div>
              <div className="h-16 w-16 flex-none rounded-lg bg-electric-600/20" />
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((k) => <div key={k} className="h-8 rounded-md bg-white/6" />)}
            </div>
          </div>
        </Chrome>
      );

    // 2 · POS
    case 2:
      return (
        <Chrome label="POS · Punto de venta">
          <div className="flex h-full gap-2">
            <div className="flex-1 space-y-1.5">
              {['Café', 'Pastel', 'Jugo'].map((t, k) => (
                <div key={t} className="flex items-center justify-between rounded-md border border-white/8 bg-void-2/60 px-2 py-1.5">
                  <span className="font-mono text-[9px] text-silver-dim">{t}</span>
                  <span className="font-mono text-[9px] text-electric-400">${(k + 1) * 45}</span>
                </div>
              ))}
            </div>
            <div className="flex w-2/5 flex-col rounded-md border border-electric-600/30 bg-electric-900/20 p-2">
              <span className="font-mono text-[8px] text-silver-faint">Total</span>
              <span className="font-mono text-lg font-semibold text-white">$180</span>
              <div className="mt-1 grid grid-cols-3 gap-1">
                {Array.from({ length: 6 }).map((_, k) => <span key={k} className="aspect-square rounded bg-white/8" />)}
              </div>
              <span className="mt-1 rounded-md bg-electric-600 py-1 text-center font-mono text-[8px] text-white">Cobrar</span>
            </div>
          </div>
        </Chrome>
      );

    // 3 · CRM
    case 3:
      return (
        <Chrome label="CRM · Prospectos">
          <div className="grid h-full grid-cols-3 gap-1.5">
            {['Nuevo', 'Contacto', 'Cerrado'].map((col, k) => (
              <div key={col} className="flex flex-col gap-1.5 rounded-md bg-void-2/50 p-1.5">
                <span className="font-mono text-[8px] uppercase text-silver-faint">{col}</span>
                {Array.from({ length: k === 1 ? 2 : 1 }).map((_, j) => (
                  <div key={j} className={`space-y-1 rounded border p-1.5 ${k === 2 ? 'border-electric-600/40 bg-electric-900/25' : 'border-white/8 bg-void/60'}`}>
                    <Bar w="w-3/4" />
                    <Bar w="w-1/2" c="bg-electric-600/25" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Chrome>
      );

    // 4 · Automatizaciones
    case 4:
      return (
        <Chrome label="Flujo · Automatización">
          <div className="flex h-full flex-col items-center justify-center gap-2">
            {['Nuevo pedido', 'Genera contrato', 'Envía WhatsApp'].map((t, k) => (
              <div key={t} className="flex w-full flex-col items-center">
                <div className={`flex w-3/4 items-center gap-2 rounded-lg border px-2 py-1.5 ${k === 0 ? 'border-electric-400/50 bg-electric-600/20' : 'border-white/10 bg-void-2/60'}`}>
                  <span className={`h-2 w-2 flex-none rounded-full ${k === 0 ? 'bg-electric-400' : 'bg-electric-600/60'}`} />
                  <span className="font-mono text-[9px] text-silver-dim">{t}</span>
                </div>
                {k < 2 && <span className="my-0.5 h-3 w-px bg-electric-600/50" />}
              </div>
            ))}
          </div>
        </Chrome>
      );

    // 5 · Menús QR
    case 5:
      return (
        <Chrome label="Menú QR · Escanea">
          <div className="flex h-full gap-3">
            <div className="w-2/5"><MiniQR /><p className="mt-1 text-center font-mono text-[8px] text-silver-faint">Escanéame</p></div>
            <div className="flex-1 space-y-1.5">
              {['Entradas', 'Platos', 'Postres', 'Bebidas'].map((t) => (
                <div key={t} className="flex items-center justify-between border-b border-white/8 pb-1">
                  <span className="font-mono text-[9px] text-silver-dim">{t}</span>
                  <span className="font-mono text-[9px] text-electric-400">$--</span>
                </div>
              ))}
            </div>
          </div>
        </Chrome>
      );

    // 6 · Cotizadores / formularios / dashboards
    case 6:
      return (
        <Chrome label="Dashboard · Resultados">
          <div className="flex h-full flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {['Ventas', 'Leads', 'Conv.'].map((t) => (
                <div key={t} className="rounded-md border border-white/8 bg-void-2/60 p-1.5">
                  <span className="font-mono text-[7px] uppercase text-silver-faint">{t}</span>
                  <Bar w="w-2/3" c="bg-white/30" h="h-2.5" />
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-1.5 rounded-md border border-white/8 bg-void-2/40 p-2">
              {[40, 65, 50, 80, 60, 90].map((h, k) => (
                <span key={k} className="flex-1 rounded-t bg-gradient-to-t from-electric-900 to-electric-600" style={{ height: `${h}%` }} />
              ))}
            </div>
            <span className="rounded-md bg-electric-600 py-1 text-center font-mono text-[8px] text-white">Generar cotización</span>
          </div>
        </Chrome>
      );

    // 7 · UI / UX / Systems
    default:
      return (
        <Chrome label="Diseño · Sistema">
          <div className="flex h-full gap-2">
            <div className="flex w-8 flex-col gap-1.5">
              {Array.from({ length: 4 }).map((_, k) => <span key={k} className="aspect-square rounded bg-white/8" />)}
            </div>
            <div className="relative flex-1 rounded-md border border-dashed border-electric-600/30 bg-[radial-gradient(circle,rgba(30,91,255,0.08)_1px,transparent_1px)] [background-size:12px_12px]">
              <div className="absolute left-3 top-3 h-10 w-20 rounded-md border border-electric-400/50 bg-electric-600/15" />
              <div className="absolute bottom-3 right-4 h-12 w-12 rounded-full border border-white/15 bg-white/5" />
              <div className="absolute bottom-4 left-4 space-y-1"><Bar w="w-12" /><Bar w="w-8" c="bg-electric-600/30" /></div>
            </div>
          </div>
        </Chrome>
      );
  }
}
