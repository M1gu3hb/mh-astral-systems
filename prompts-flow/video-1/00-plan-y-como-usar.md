# Video 1 · SERVICIOS — plan de la animación de scroll

## Qué es y para qué

Este video **reemplaza** la animación actual de la sección Servicios (la laptop
que programé). La idea: una **laptop realista, centrada**, flotando en el vacío
azul-negro de la marca, y su **pantalla encendida va pasando por distintos tipos
de software** (página web → punto de venta → CRM → dashboard → automatización →
menú QR → cotizador/formulario → wireframe de diseño). Cada "pantalla" representa
uno de tus servicios.

Yo tomo ese video (o los frames) y lo convierto en **animación de scroll**: al
bajar, el video avanza (scrubbing) y encima **superpongo en código la tarjeta de
cada servicio en el liquid glass** (el mismo GlassSurface del header, que
distorsiona la pantalla de la laptop como agua). Por eso el video NO necesita
texto: los nombres de los servicios los pongo yo en código.

## Duración y estructura

- **16 segundos = 2 clips de 8 s** (Veo genera máximo 8 s por clip).
- `prompt-parte-1.md` → clip 1 (0–8 s)
- `prompt-parte-2.md` → clip 2 (8–16 s)
- El encuadre, la laptop y el fondo son **idénticos** en los dos, y el clip 2
  **arranca en la pantalla donde termina el clip 1** (el dashboard), para que al
  unirlos el corte sea invisible. (Mejor aún: usa el último frame del clip 1 como
  frame inicial del clip 2 con "Frames-to-Video" de Flow — ver README.)

## Secuencia de pantallas (así se alinea con tus 8 servicios)

| Momento | Pantalla en la laptop | Servicio que representa |
|---|---|---|
| Clip 1 · 0–3 s | Página web / landing | Páginas web profesionales · Panel de autoedición |
| Clip 1 · 3–5 s | Punto de venta (POS) | POS para negocios |
| Clip 1 · 5–8 s | Tablero CRM (columnas) | CRM y seguimiento |
| Clip 2 · 0–2 s | Dashboard con gráficas | Dashboards |
| Clip 2 · 2–4 s | Grafo de automatización | Automatizaciones |
| Clip 2 · 4–6 s | Menú con código QR | Menús QR |
| Clip 2 · 6–8 s | Formulario / cotizador → wireframe | Cotizadores · UI/UX/Systems |

## Encuadre (compu + teléfono)

16:9 horizontal, pero la **laptop siempre centrada** dentro del ~58 % central del
ancho; los lados solo con partículas y luz (ambiente), para que el recorte al
centro en teléfono (9:16) muestre la laptop completa. Ya está escrito en los prompts.

## Cómo lo integro después

Cuando me des `servicios.mp4` (o los 2 clips), reemplazo `ServiciosShowcase` por
una versión que hace **scrubbing del video por scroll** + las tarjetas de
servicio en liquid glass encima, y **borro** `ScreenMock.jsx` y la laptop
programada para no pesar la página.
