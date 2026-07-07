VIDEOS / FRAMES DE LAS ANIMACIONES
===================================

Los prompts y el plan están en la carpeta:  /prompts-flow/

PROCESO (segunda animación) — YA INTEGRADO:
  - El clip de Veo se convirtió en una secuencia de frames para hacer
    animación de scroll (scroll-scrub) — mucho más ligero y fluido que un
    video en autoplay, y en teléfono va una tarjeta a la vez refractando el
    frame de atrás.
  - Frames en:  proceso-frames/f-001.webp ... f-060.webp  (~1.5 MB en total)
  - Para regenerarlos desde un mp4 nuevo:
      ffmpeg -i tu-video.mp4 -vf "fps=7.5,scale=1000:-2:flags=lanczos" \
        -c:v libwebp -q:v 70 public/media/proceso-frames/f-%03d.webp
    (deja 60 frames; si cambias la cantidad, ajusta FRAME_COUNT en
     src/components/home/ProcesoShowcase.jsx)

SERVICIOS (primera animación):
  - Sin video (usa la laptop programada). Si algún día generas uno que te
    guste, lo integramos igual como scroll-scrub.
