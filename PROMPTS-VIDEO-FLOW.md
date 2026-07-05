# Prompts para Google Flow — videos de fondo de las animaciones de scroll

Estos videos van **detrás** de las animaciones que ya están programadas en el
sitio (no son la animación en sí — el sitio ya anima la laptop, las tarjetas de
servicio y los pasos del proceso encima). Su trabajo es dar **profundidad y
ambiente cinematográfico** para que no parezca plantilla.

## Cómo los usa el sitio (léelo antes de generar)

- Se ponen a **~55 % de opacidad**, **teñidos de azul** de marca (mix-blend),
  con un **degradado oscuro arriba y abajo** y un velo oscuro encima.
- **El centro del cuadro debe quedar oscuro y tranquilo** — ahí van la laptop
  (Servicios) y las tarjetas (Proceso). La energía visual va en los **bordes y
  en la profundidad** del cuadro.
- Por eso puedes generarlos un poco más brillantes/coloridos de lo que se verá
  final: el sitio los oscurece y unifica en azul.

## Especificaciones técnicas (para los dos)

| Parámetro | Valor |
|---|---|
| Relación | 16:9 |
| Resolución | 1920 × 1080 |
| Duración | 8–10 s, **loop perfecto** (el último frame debe empatar con el primero) |
| FPS | 24 |
| Cámara | Fija (bloqueada), casi sin movimiento |
| Audio | Ninguno |
| Paleta EXACTA | negro-azul `#070B16` / `#0B1120`, azul eléctrico `#1E5BFF`, azul claro `#5B8CFF`, cromo `#BFD6FF` |
| Prohibido | texto, palabras, logotipos, personas, manos, dispositivos reales (laptops/celulares), **verde**, **morado/violeta**, tonos cálidos, movimiento brusco, parpadeo, marca de agua |

Los prompts principales están en **inglés** (Google Flow / Veo responde mejor
en inglés); abajo de cada uno dejo la versión en español por si la prefieres.

Nombres de archivo EXACTOS (guárdalos en `public/media/`):
`servicios-loop.mp4` y `proceso-loop.mp4`.

---

## 1) `servicios-loop.mp4` — fondo de la sección **Servicios** (la laptop)

**Intención:** un espacio tecnológico premium, tipo estudio oscuro, con paneles
de interfaz holográficos desenfocados flotando en la profundidad (una web, un
dashboard, un QR, un ticket de POS) que se cruzan y disuelven lentamente —
sugiriendo "todo lo que puede hacer tu sistema" — mientras el **centro
permanece oscuro y despejado** para la laptop que va encima.

### Prompt (EN — recomendado, pégalo tal cual)

```
Cinematic abstract technology background, ultra-dark navy-black void, color
graded in deep blue monochrome. Base colors #070B16 deepening to #0B1120. The
CENTER of the frame stays very dark, calm and empty. In the deep background and
toward the edges, translucent holographic UI panels float in soft focus (heavy
bokeh): one panel resembles a clean website layout, another a data dashboard
with glowing bar and line charts, another a square QR-code grid, another a
point-of-sale receipt list. Each panel is drawn as thin glowing wireframes in
electric blue #1E5BFF and light blue #5B8CFF, with faint chrome-white #BFD6FF
edge highlights. The panels drift slowly with parallax depth and gently
cross-dissolve from one type into the next in a continuous cycle. A fine field
of tiny blue light particles floats through the space at different depths.
Extremely subtle printed-circuit trace lines run across the far background at
very low opacity. One slow volumetric light ray sweeps in from the top-right
corner. Camera locked and almost perfectly still, with an imperceptible slow
push-in. Mood: quiet, premium, high-end fintech / design-studio. Rich blacks,
no warm tones. Seamless loop, the last frame matches the first.
No text, no words, no logos, no readable UI labels, no people, no hands, no real
laptop or phone, no green, no purple, no orange. 16:9, 1920x1080, ~10 seconds,
24fps.
```

### Negative prompt (si Flow lo pide aparte)

```
text, letters, words, watermark, logo, brand, faces, people, hands, real laptop,
smartphone, green, purple, violet, orange, warm light, cluttered center, fast
motion, strobe, flicker, low quality, jpeg artifacts
```

### Versión ES (por si la prefieres)

```
Fondo abstracto tecnológico cinematográfico, vacío negro-azulado muy oscuro,
gradación en monocromo azul profundo (#070B16 a #0B1120). El CENTRO del cuadro
queda muy oscuro, tranquilo y despejado. En la profundidad y hacia los bordes
flotan, muy desenfocados (bokeh), paneles de interfaz holográficos: uno parece
una página web, otro un dashboard con gráficas brillantes, otro una cuadrícula
de código QR, otro un ticket de punto de venta. Cada panel es de líneas finas
brillantes en azul eléctrico #1E5BFF y azul claro #5B8CFF, con bordes cromo
#BFD6FF. Los paneles se desplazan lento con profundidad y se disuelven de un
tipo a otro en ciclo continuo. Un campo de partículas azules diminutas flota a
distintas profundidades. Líneas de circuito impreso muy tenues cruzan el fondo.
Un rayo de luz volumétrico entra despacio desde arriba a la derecha. Cámara
fija, casi inmóvil, con un acercamiento lentísimo. Ambiente premium, silencioso,
tipo fintech / estudio de diseño. Negros ricos, sin tonos cálidos. Loop
perfecto. Sin texto, sin logos, sin personas, sin laptop o celular reales, sin
verde ni morado. 16:9, 1920x1080, ~10 s, 24fps.
```

---

## 2) `proceso-loop.mp4` — fondo de la sección **Proceso** (los 4 pasos)

**Intención:** sensación de **recorrido / línea de producción ordenada**. Un
hilo de luz azul viaja lento de **izquierda a derecha** por el centro-alto del
cuadro (empata con la línea que el sitio dibuja entre las 4 tarjetas), pasando
por **4 nodos** que laten suavemente. Calma, orden, avance. El centro-medio
queda tranquilo para las tarjetas.

### Prompt (EN — recomendado, pégalo tal cual)

```
Cinematic abstract technology background evoking a calm journey or an orderly
pipeline, color graded in deep blue monochrome. Base colors #070B16 to #0B1120.
A single luminous thread of electric-blue light #1E5BFF travels slowly and
smoothly from the LEFT edge to the RIGHT edge across the upper-middle of the
frame, leaving a soft glowing trail, and passing through FOUR evenly spaced,
gently pulsing light nodes. Around this line, a deep starfield of tiny blue
particles drifts with parallax depth. Faint printed-circuit pathways branch
softly in the far background at low opacity. Soft light-blue #5B8CFF and
chrome-white #BFD6FF bokeh orbs float and blur in and out of focus. Gentle
volumetric haze gives a sense of forward depth and quiet progress. The center of
the frame stays relatively dark and uncluttered. Camera locked and near still,
with an imperceptible slow drift to the right. Mood: premium, orderly,
reassuring, high-end. Rich blacks, no warm tones. Seamless loop, the last frame
matches the first.
No text, no words, no logos, no people, no hands, no devices, no green, no
purple, no orange. 16:9, 1920x1080, ~10 seconds, 24fps.
```

### Negative prompt (si Flow lo pide aparte)

```
text, letters, words, watermark, logo, faces, people, hands, devices, green,
purple, violet, orange, warm light, cluttered center, fast motion, strobe,
flicker, low quality, jpeg artifacts
```

### Versión ES (por si la prefieres)

```
Fondo abstracto tecnológico cinematográfico que evoca un recorrido tranquilo o
una línea de producción ordenada, monocromo azul profundo (#070B16 a #0B1120).
Un solo hilo de luz azul eléctrico #1E5BFF viaja lento y suave del borde
IZQUIERDO al DERECHO por el centro-alto del cuadro, dejando una estela brillante
y pasando por CUATRO nodos de luz equidistantes que laten suavemente. Alrededor,
un campo de partículas azules diminutas con profundidad. Caminos de circuito
tenues se ramifican al fondo. Orbes bokeh azul claro #5B8CFF y cromo #BFD6FF
flotan y se desenfocan. Neblina volumétrica suave, sensación de avance y calma.
El centro queda oscuro y despejado. Cámara fija, casi inmóvil, con un
desplazamiento lentísimo a la derecha. Ambiente premium, ordenado, que
tranquiliza. Negros ricos, sin tonos cálidos. Loop perfecto. Sin texto, sin
logos, sin personas, sin dispositivos, sin verde ni morado. 16:9, 1920x1080,
~10 s, 24fps.
```

---

## Después de generarlos

1. Descarga cada video como MP4 y (si pesan mucho) comprímelos a < 6 MB.
2. Renómbralos EXACTAMENTE: `servicios-loop.mp4` y `proceso-loop.mp4`.
3. Colócalos en `public/media/`.
4. `npm run build` y vuelve a desplegar (o solo súbelos y Vercel redepliega).

El sitio los toma automáticamente. Si algún día quieres quitarlos, el fondo de
marca (degradados + circuito) ya se ve completo sin video.
