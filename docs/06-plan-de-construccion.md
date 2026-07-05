# 06 · Plan de construcción (orden de trabajo en Claude Code)

## Stack confirmado

React + Vite + Tailwind + Framer Motion + React Router. Componentes de
reactbits.dev como base para fondos/text animations, adaptados a la
paleta de marca (ver `02-sistema-diseno.md`). Sin Base44 — este proyecto
se construye y se mantiene fuera de esa plataforma.

## Orden sugerido de construcción (fase 1)

No se construye todo de un jalón. Este orden evita retrabajo:

1. **Design tokens + tipografía** — colores y fuentes de
   `02-sistema-diseno.md` como variables globales (Tailwind config /
   CSS custom properties). Se define una vez y no se toca después.
2. **Layout base: Navbar + Footer** — son los únicos elementos presentes
   en todas las páginas, conviene resolverlos antes que el contenido.
3. **Hero** — la pieza más compleja visualmente (fondo animado +
   headline). Mejor resolver la parte difícil temprano que dejarla para
   el final.
4. **Servicios** (lista ícono + label) y **Casos de éxito** — contenido
   mayormente estático, avance rápido una vez que el sistema de diseño
   ya está resuelto.
5. **Diferenciador de paneles de autoedición** — sección nueva, depende
   de que Miguel decida si usa capturas reales o mockup (ver pendientes
   en `03-contenido-y-servicios.md`).
6. **Tiers de precio + Proceso + CTA final** — patrones de tarjeta ya
   establecidos en el paso 4, se reutilizan.
7. **Tarjeta de contacto digital** — replica la tarjeta física, usa el
   modo claro definido en `02-sistema-diseno.md`.
8. **Blog** (listado + post individual) — con un solo post de ejemplo.
9. **Admin skeleton** — login stub + dashboard con secciones, leyendo
   datos mock. Es lo menos urgente porque no lo ve ningún cliente.

## Fase 1 — qué se construye ahora

Todo lo de `01-arquitectura-sitio.md` con contenido real de
`03-contenido-y-servicios.md`, datos mock para blog/casos/precios
(reemplazables fácilmente), sin backend ni autenticación real.

## Fase 2 — después, no ahora (con qué se justifica empezarla)

| Ítem | Se empieza cuando... |
|---|---|
| Backend real (Supabase) para casos/precios/blog | Miguel quiera dejar de editar código para actualizar contenido |
| Autenticación real del panel admin | Se conecte el backend real |
| Portal de cliente (login → avances, apps, links a su POS/CRM) | Haya 3-4 clientes activos que realmente lo usarían |
| Generación de imágenes IA en paneles de cliente, con límite mensual | Haya un cliente nuevo dispuesto a pagar el tier "Autónomo + IA" |

**Razón de fondo (ya acordada en conversaciones anteriores):** construir
estas 4 cosas antes de tener demanda real es tiempo que se le quita a
Confetti/Jardines/Fiesta Total, que sí generan ingresos ahora. La página
propia es la prioridad; todo lo demás espera a que haya una razón concreta
para construirlo.

## Checklist final antes de dar por "lista" la fase 1

- [ ] Responsive verificado en móvil real, no solo en devtools.
- [ ] `prefers-reduced-motion` respetado en todas las animaciones.
- [ ] Foco de teclado visible en todos los elementos interactivos.
- [ ] Todos los CTAs de WhatsApp usan el número real: 55 2311 8153.
- [ ] Precios reales cargados (no "$X,XXX").
- [ ] Meta tags (título, descripción, og:image con el logo) configurados
      para que se vea bien al compartir el link.
