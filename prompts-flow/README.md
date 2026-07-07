# Prompts para Google Flow (Veo 3.1 Fast) — videos de las animaciones de scroll

Esta carpeta tiene todo lo que necesitas para generar los **2 videos** con Google
Flow / Veo 3.1 Fast y luego integrarlos como animaciones de scroll.

```
prompts-flow/
├── README.md            ← esto (cómo funciona Veo/Flow, reglas de encuadre, cómo exportar)
├── video-1/             ← SERVICIOS · reemplaza la animación actual (la laptop)
│   ├── 00-plan-y-como-usar.md
│   ├── prompt-parte-1.md   (clip 1 · 8 s)
│   └── prompt-parte-2.md   (clip 2 · 8 s)   → total 16 s
└── video-2/             ← PROCESO · solo fondo detrás de las tarjetas de vidrio
    ├── 00-plan-y-como-usar.md
    └── prompt.md           (clip único · 8 s en loop)
```

---

## 1. Cómo funciona Veo 3.1 (lo que hay que saber antes de generar)

- **Duración por clip:** Veo 3.1 (Fast/Lite/Quality) genera clips de **4, 6 u 8
  segundos**. El máximo real por generación es **8 s** (NO 10 s). Por eso:
  - **Video 1** lo parto en **2 clips de 8 s = 16 s** (dos prompts, ver
    `video-1/`). Los pegas uno tras otro en tu editor y queda un solo video de 16 s.
  - **Video 2** es **1 clip de 8 s en loop** (un prompt).
- **Continuidad entre clips:** Veo **NO** entiende "continúa el video anterior".
  Cada prompt describe su clip **completo y por sí solo** (así están escritos).
  Para que el corte entre el clip 1 y el clip 2 sea invisible tienes 2 opciones:
  1. **Recomendado — Frames-to-Video / "Extend" de Flow:** genera el clip 1,
     toma su **último frame** y úsalo como **imagen inicial** del clip 2 (Flow
     deja subir un frame de inicio). Así el empalme es perfecto.
  2. **Manual:** el encuadre, la laptop y el fondo son **idénticos** en ambos
     prompts, y el clip 2 **arranca en la misma pantalla en la que termina el
     clip 1** (el dashboard). Al concatenar, el salto es imperceptible.
- **Modelo y ajustes en Flow:** `Veo 3.1 Fast` · **formato horizontal 16:9** ·
  duración 8 s · sin audio (o lo silencias al integrar).
- **Prompting:** Veo lee el prompt **de forma literal** y le da más peso a lo que
  va **primero**. Fórmula: **Cámara → Sujeto → Acción → Contexto → Estilo/Ambiente.**
  Prompts densos (150–200 palabras) rinden mejor para escenas complejas.

---

## 2. Regla de ENCUADRE (crítica — que se vea bien en compu Y en teléfono)

Los videos son **16:9 (horizontal)** para computadora, PERO todo lo importante va
**centrado dentro de una "zona segura" cuadrada** en el centro del cuadro:

```
16:9 (lo que se ve en computadora)
┌───────────┬───────────────┬───────────┐
│  ambiente │   ZONA SEGURA │  ambiente │
│ partículas│   (sujeto     │ partículas│   ← en teléfono se recorta a esta
│  y luz    │   centrado)   │  y luz    │     zona central (9:16) y se ve completo
└───────────┴───────────────┴───────────┘
```

- El **sujeto** (la laptop en el video 1; el hilo de luz en el video 2) va
  **centrado**, dentro del **~55–60 % central** del ancho (una zona ~1:1).
- Los **lados** (que solo se ven en computadora) se llenan con **ambiente**
  (partículas, líneas de circuito, glow) — así **no se ven vacíos** en compu,
  pero **no llevan nada esencial**, para que en teléfono (recorte al centro
  9:16) se vea **todo completo**.
- Los dos prompts ya traen esta instrucción escrita.

---

## 3. Paleta EXACTA de marca (repetida en cada prompt)

| Uso | Hex |
|---|---|
| Fondo negro-azulado (base) | `#070B16` → `#0B1120` |
| Azul eléctrico (acento principal) | `#1E5BFF` |
| Azul claro (luz/acento) | `#5B8CFF` |
| Cromo / blanco brillo | `#BFD6FF` |

**Prohibido en todos los videos:** texto/letras/palabras legibles, logotipos,
marcas de agua, **personas**, caras, manos, **verde**, **morado/violeta**,
tonos cálidos/naranja, cámara temblorosa, parpadeo rápido, audio.

---

## 4. Cuando tengas los videos — cómo entregármelos

1. Exporta cada clip en **MP4 (H.264), 1920×1080, 16:9**.
2. Nómbralos así y ponlos en `public/media/`:
   - Video 1 (los 2 clips ya unidos en uno de 16 s): **`servicios.mp4`**
     *(o mándame los 2 clips por separado — `servicios-1.mp4`, `servicios-2.mp4` — y yo los uno).*
   - Video 2: **`proceso-loop.mp4`**
3. Avísame y **entonces sí** reemplazo la animación de Servicios actual por la de
   scroll basada en tu video (y borro los componentes viejos para no pesar la
   página). El Proceso lo dejo como está: tu `proceso-loop.mp4` entra como fondo
   detrás de las tarjetas de vidrio automáticamente.

---

## Fuentes (investigación)

- [Google Cloud — Ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)
- [Google Cloud Docs — Use Veo to extend videos](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/video/extend-a-veo-video)
- [How Long Are Veo 3 / 3.1 Videos? (2026)](https://ulazai.com/how-long-veo3-videos/)
- [MindStudio — What is Veo 3.1 Fast](https://www.mindstudio.ai/blog/what-is-google-veo-3-1-fast-video)
- [How to Extend Veo 3.1 Beyond 8 Seconds (Flow, Frames-to-Video)](https://www.aifreeapi.com/en/posts/veo-3-extend-video-length)
