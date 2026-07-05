# 04 · Animaciones e interacciones

Regla general: una animación orquestada por sección se siente mejor que
muchas animaciones sueltas. Todo debe respetar `prefers-reduced-motion`
(reducir a fades cortos, sin desplazamientos grandes ni parallax).

Sobre reactbits.dev: es una librería de componentes React ya animados,
open source (MIT + Commons Clause, uso comercial permitido), instalable
por CLI (`npx shadcn@latest add ...` o `jsrepo`), compatible con Vite. Sus
categorías son: **Text Animations**, **Backgrounds**, **Animations**,
**Components**. Se usa como punto de partida y se ajustan los colores a la
paleta de la marca (nunca dejar los colores default del componente).

## Hero

- **Fondo:** candidato de reactbits categoría *Backgrounds* — algo tipo
  "Beams" o "Aurora" reconfigurado en azul eléctrico sobre `void`, muy
  sutil, para no competir con el texto. Alternativa: mantener la idea
  original de constelación 3D custom (nodos que arman el monograma "MH")
  si Miguel prefiere algo 100% a medida en vez de un componente de
  librería — **esto lo decide Miguel antes de construir**.
- **Headline:** reveal de texto al cargar — candidato *Text Animations*:
  "SplitText" o "BlurText" de reactbits, con blur-to-sharp + fade-up,
  duración ~800ms, sin rebote exagerado.
- **CTAs:** aparecen últimos en la secuencia de carga, con un pequeño
  delay respecto al headline (efecto de cascada, no todo a la vez).

## Scroll reveals (todas las secciones debajo del hero)

- Fade-up + blur-to-sharp al entrar en viewport, una sola vez
  (`IntersectionObserver` / `whileInView` de Framer Motion, nunca
  `scroll` event listener).
- Stagger leve entre elementos de una misma grilla (casos, servicios,
  tiers) — 80-120ms de diferencia entre tarjetas, no más.

## Sección de servicios (lista ícono + label)

- Cada fila entra con un fade-up leve y el ícono tiene un hover sutil
  (escala 1.05, sin rotación) para dar sensación interactiva sin
  sobrecargar. El ítem destacado (paneles de autoedición) puede tener un
  micro-glow azul permanente y discreto para diferenciarlo visualmente sin
  necesidad de texto extra tipo "NUEVO".

## Sección de diferenciador (paneles de autoedición)

- Si se usa una captura/mockup del panel: animación tipo "antes → después"
  con un slider de comparación o un cross-fade automático en loop lento
  (3-4 segundos por estado), para comunicar "esto cambia en vivo" sin
  necesitar que el usuario interactúe.

## Tarjetas de casos de éxito y tiers

- Hover: elevación leve (`translateY(-2px)`) + brillo del borde azul,
  nunca sombra dura.
- El folio (SIS-01, etc.) puede tener un parpadeo sutil del punto de
  estado (el motivo "punto azul" de la marca) para dar sensación de
  "sistema en vivo".

## Nav

- Transparente → sólido con blur al hacer scroll (transición de
  `background-color`, no de `opacity` del contenido).
- Menú móvil: overlay a pantalla completa, links con stagger de entrada
  (translateY + opacity), hamburguesa que se transforma en X con rotación.

## Tarjeta de contacto digital

- Al hacer scroll a esta sección, un efecto sutil de "escaneo" horizontal
  sobre el QR (una línea de luz que cruza una vez) — referencia directa a
  que es un QR real y escaneable, sin ser una animación en loop molesta.

## Botones (todos)

- `active:scale(0.98)` al presionar.
- Ícono interno (flecha) se desplaza diagonal en hover.
- Transiciones con cubic-bezier custom, nunca `linear` ni `ease-in-out`
  default.

## Rendimiento — no negociable

- Animar solo `transform` y `opacity`, nunca `top/left/width/height`.
- `backdrop-blur` solo en nav/overlays fijos, nunca en contenido que
  hace scroll.
- Si se usa una escena 3D o un componente de fondo pesado (partículas,
  three.js), cargarlo con `lazy()` / dynamic import para que no bloquee el
  resto de la página — debe quedar en su propio chunk de JS.
