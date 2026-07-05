# 02 · Sistema de diseño (basado en la marca real de Miguel)

Esto reemplaza cualquier paleta inventada de borradores anteriores. Todo
aquí sale de: el logo, el flyer y la tarjeta de presentación reales.

## Paleta de color

### Modo oscuro (base del sitio — el flyer usa este fondo)

| Token | Hex aprox. | Uso |
|---|---|---|
| `void` | `#070B16` | Fondo base del sitio, casi negro con tinte azul |
| `void-2` | `#0B1120` | Fondo de paneles/cards elevados |
| `panel` | `#0E1830` | Superficie de tarjetas |
| `electric-900` | `#0A1F55` | Azul profundo, sombras del degradado del logo |
| `electric-600` | `#1E5BFF` | Azul eléctrico principal — botones, links, acentos |
| `electric-400` | `#5B8CFF` | Azul claro — hover states, texto de acento |
| `chrome-highlight` | `#BFD6FF` | Brillo especular tipo metal — usar con mucha moderación, solo en el logo o un detalle puntual, nunca como color de fondo |
| `black-ink` | `#0A0A0C` | Negro casi puro — el mismo negro de la "M" del logo, para contraste fuerte |
| `white` | `#F4F6FA` | Texto principal sobre fondo oscuro |
| `silver-dim` | `#8B93A7` | Texto secundario |
| `silver-faint` | `#586178` | Texto terciario, metadatos, folios |

### Modo claro (la cara de la tarjeta de presentación — uso puntual)

Se usa **solo** en el componente de "tarjeta de contacto digital" (sección
8 de la Home) para replicar fielmente la tarjeta física, y opcionalmente en
el panel admin si Miguel prefiere un admin claro en vez de oscuro.

| Token | Hex aprox. | Uso |
|---|---|---|
| `card-bg` | `#F4F6FA` | Fondo de la tarjeta de contacto |
| `card-text` | `#0A0A0C` | Texto principal sobre la tarjeta |
| `card-accent` | `#1E5BFF` | Mismo azul eléctrico, consistente en ambos modos |

**Regla:** no mezclar modo claro y oscuro dentro de la misma sección. El
sitio es oscuro; el modo claro vive aislado en la tarjeta de contacto.

## Tipografía

El flyer usa una sans-serif gruesa y condensada para headlines, y una
fuente script/caligráfica solo para la firma de Miguel en la tarjeta. Se
traduce así al sitio:

- **Display (headlines):** una grotesca geométrica de peso alto — Space
  Grotesk o Clash Display funcionan bien y se sienten cercanas al peso del
  flyer sin ser genéricas.
- **Cuerpo:** IBM Plex Sans o similar, legible, técnica pero cálida.
- **Mono (folios, datos, labels):** IBM Plex Mono — para los códigos tipo
  "SIS-01", precios, metadatos. Refuerza la idea de "sistema", no solo
  "página bonita".
- **Firma/acento personal (uso puntual, no para UI):** una fuente
  script/caligráfica — se usa exclusivamente para citar el nombre de
  Miguel como firma (ej. en la tarjeta de contacto o un cierre de sección
  "— Miguel Huerta Bautista"), igual que en la tarjeta física. Nunca para
  botones, nav, ni cuerpo de texto.

## Motivos visuales (elementos que ya existen en la marca — reutilizar, no inventar otros)

1. **Punto + línea azul:** en la tarjeta de presentación, cada dato de
   contacto tiene un punto azul y una línea vertical delgada a la
   izquierda, y las líneas terminan en un corte diagonal. Este patrón se
   reutiliza como separador de sección, bullet de lista, y línea
   decorativa bajo headlines — es un motivo de marca real, no decoración
   genérica.
2. **Cuadros pixel/digitales:** el logo tiene 4 cuadros azules pequeños en
   distintos tamaños arriba a la derecha, sugiriendo algo "digital/binario"
   ensamblándose. Se puede usar como micro-motivo decorativo cerca del
   logo o en estados de carga, sin abusar.
3. **Líneas de circuito de fondo:** el flyer tiene líneas finas tipo
   circuito impreso, muy sutiles, en las esquinas. Sirve como textura de
   fondo del Hero (muy baja opacidad, nunca compitiendo con el texto).
4. **Corte diagonal en línea:** las líneas divisoras de la tarjeta no
   terminan en punta recta sino con un pequeño corte en ángulo — detalle
   fino que se puede replicar en dividers CSS con un `clip-path` o un SVG
   pequeño.

## Estilo de componentes

- **Tarjetas:** esquinas grandes redondeadas, marco exterior sutil +
  panel interior (double-bezel), nunca sombras duras — el flyer y el logo
  usan degradados suaves y brillos, no sombras planas.
- **Botones:** pill (totalmente redondeados), azul eléctrico sólido para
  la acción primaria, contorno delgado para la secundaria.
- **Lista de servicios:** ícono en caja con borde azul redondeado + label
  a la derecha — es el patrón exacto del flyer, se mantiene igual en el
  sitio (no se cambia a cards con sombra).
- **Logo:** siempre con espacio de respiro alrededor, nunca recortado, y
  nunca sobre fondos que compitan con el degradado azul-negro del
  monograma. Usar el archivo original, no recrearlo en CSS.

## Qué NO hacer

- No usar el "acid green" ni el "warm cream" de defaults genéricos de IA —
  la marca ya tiene su paleta, no hay espacio de color libre aquí.
- No usar iconos de relleno grueso tipo Material — el flyer usa íconos de
  línea delgada dentro de cajas con borde; mantener esa familia (ej.
  Phosphor Light o Lucide con stroke fino).
- No inventar un segundo color de acento — todo el acento vive en el azul
  eléctrico; el negro es contraste, no color secundario.
