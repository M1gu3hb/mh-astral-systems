# 10 · Guía de uso de los componentes reactbits

Este documento explica **cómo** se integra cada componente de los docs
07, 08 y 09 (estilo, color, comportamiento a conservar o adaptar). No
dicta en qué sección exacta va cada uno salvo donde Miguel ya lo decidió
explícitamente — esas excepciones están marcadas. La arquitectura final,
el orden de integración y la decisión de dónde va cada componente dentro
del sitio quedan a criterio de quien construya (Claude Code).

## Principio general

Todo el código de reactbits se integra **tal cual**, sin reescribir su
lógica interna (los hooks, las animaciones GSAP/Framer Motion, la
estructura del DOM). Lo único que se ajusta sistemáticamente son los
**colores** — todos estos componentes traen paletas default (morados,
blancos, negros genéricos tipo `#5227FF`, `#120F17`, `#B497CF`) que no son
la marca. Se reemplazan por los tokens de `02-sistema-diseno.md`
(`electric-600`, `void`, `black-ink`, `white`, etc.) vía props donde el
componente las expone, o editando las constantes de color en el CSS
cuando no hay prop para ello.

## Estética "liquid glass" — instrucción central de Miguel

Miguel vio en reactbits.dev el estilo de vidrio líquido/fluido (efecto de
distorsión, refracción, blur) y quiere que **varias tarjetas del sitio en
general** tengan esa sensación, no solo un componente aislado.
`GlassSurface` (doc 08) es la referencia técnica exacta de ese efecto
(desplazamiento de canal RGB, blur, blend mode). Quien construya debe
decidir si:
(a) reutiliza instancias reales de `GlassSurface` para las tarjetas que
lo necesiten, o
(b) extrae su lenguaje visual (blur + distorsión + bordes suaves) como
un patrón de tarjeta reutilizable en el sistema de diseño,
priorizando que el sitio en conjunto se sienta consistentemente "vidrio
líquido" y no solo un componente suelto con ese efecto rodeado de
tarjetas planas.

## Por componente

### DarkVeil (doc 07)
Fondo shader en WebGL (vía `ogl`). A Miguel le gustó tal cual lo vio — se
integra sin cambiar su lógica. Los parámetros de color se controlan con
`hueShift`; ajustar hasta que el resultado visual quede dentro de la
gama azul/negro de la marca (no dejarlo en el hue default si ese no
coincide). Es pesado en GPU — cargar de forma perezosa (`lazy()`), igual
que se indicó para cualquier fondo animado en `04-animaciones-e-interacciones.md`.

### Antigravity (doc 07)
Campo de partículas 3D que reacciona al cursor (three.js). Color por
prop (`color`) — cambiar del rosa default (`#FF9FFC`) a azul eléctrico o
plata de marca. Comportamiento (magnetismo, ondas, autoanimación) se
conserva tal cual.

### OrbitImages (doc 07)
Imágenes orbitando un path SVG (círculo, elipse, infinito, etc.). No
tiene color propio (usa las imágenes que se le pasen), así que no
requiere ajuste de paleta — solo decidir qué imágenes/contenido orbita.

### GlassSurface (doc 08)
**Ubicación ya decidida por Miguel: es parte del header/nav.** Fuera de
eso, es también la referencia de la estética "liquid glass" general (ver
sección arriba) — puede reutilizarse en otras tarjetas del sitio.
Comportamiento (distorsión SVG, canales RGB) se conserva tal cual; los
valores de `distortionScale`, `redOffset`, `greenOffset`, `blueOffset` se
pueden afinar para que el resultado se vea bien sobre el fondo oscuro de
la marca, pero la técnica no se reescribe.

### Folder (doc 08)
**Dos usos ya decididos por Miguel:**
1. En la sección de contacto, de alguna forma (el "folder" como
   metáfora de expediente/contacto).
2. En el futuro portal de cliente: cada proyecto del cliente se
   representa como un "folder" que se abre — la metáfora encaja
   directamente con el concepto de "ver tus proyectos". El portal en esta
   fase no tiene backend (ver `05-modelo-de-datos-backend.md` y
   `06-plan-de-construccion.md`), así que esto se construye con datos
   mock, solo para que la interacción exista y se vea, sin datos reales
   de clientes todavía.

Color del folder (prop `color`) se cambia del morado default
(`#5227FF`) al azul eléctrico de marca.

### MagicBento (doc 08)
Grid de tarjetas con spotlight, glow de borde, tilt 3D y magnetismo al
cursor. Color vía prop `glowColor` (viene en formato `"R, G, B"` sin
`rgba()`) — convertir el azul eléctrico de marca a ese formato. El
contenido de ejemplo (Analytics, Dashboard, etc.) es placeholder de
reactbits y se reemplaza por contenido real del sitio donde se decida
usarlo.

### StaggeredMenu (doc 08... nota: doc 09)
Miguel vio este menú y quiere el **comportamiento de apertura en capas
escalonadas tal cual está** (las pre-layers que entran en cascada, el
panel con stagger de links, el ícono que gira a X) — pero **no los
colores default** (morado `#B497CF`/`#5227FF`, fondo blanco del panel).
Recolorear el panel y las pre-layers a la paleta de marca (fondo oscuro
`void`/`panel`, acento `electric-600`). Este componente define cómo se
comporta el menú de navegación del propio sitio (no es un elemento
decorativo aparte) — la decisión de si reemplaza por completo al menú
móvil ya planeado en `01-arquitectura-sitio.md` o convive con él la toma
quien construya.

### Dock (doc 09)
Miguel fue explícito: **no usarlo tal cual como un dock de aplicación**
(no es ese el contexto de un sitio de marketing). Lo que sí quiere
conservar es su **animación** — la magnificación por proximidad del
cursor con física de resorte (spring). Se adapta esa animación a algún
elemento de navegación o accesos rápidos del sitio, con colores de marca
en vez del negro/blanco default. La decisión de qué elemento de
navegación usa esta animación la toma quien construya.

### FlowingMenu (doc 09)
A Miguel le gustó el efecto (texto + imagen en marquesina que aparece al
hacer hover desde el borde más cercano) y quiere que se use en algo del
sitio — sin especificar dónde. Colores vía props (`textColor`, `bgColor`,
`marqueeBgColor`, `marqueeTextColor`, `borderColor`) se ajustan a la
paleta de marca. El comportamiento de marquesina/hover se conserva tal
cual.

## Resumen de reglas duras

- Código de los componentes: **no se reescribe la lógica**, se copia tal
  cual de los docs 07-09.
- Colores: **siempre se adaptan** a `02-sistema-diseno.md`, ningún
  componente se queda con su paleta default de reactbits.
- Ubicación dentro del sitio: **la decide quien construye**, excepto los
  dos casos explícitos de arriba (GlassSurface en header, Folder en
  contacto + portal de cliente).
- El estilo "liquid glass" no es exclusivo de un componente — es una
  dirección estética que Miguel quiere sentir en varias tarjetas del
  sitio.
