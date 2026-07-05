# 00 · Resumen ejecutivo — mh-astral-systems.com

## Qué es esto

Plan completo de la página web de **MH Astral Systems** (marca personal de
Miguel Huerta Bautista, digital builder, Xochimilco/CDMX). Este set de
documentos es el contexto que se le da a Claude Code / Antigravity / Codex
para construir el sitio — aquí no hay código, solo decisiones ya tomadas.

**Regla de oro para quien construya esto:** si algo no está definido en
estos documentos, se pregunta antes de improvisar. El diseño y el contenido
ya están decididos; lo que falta es solo ejecución.

## Objetivo del sitio

No es un portafolio bonito. Es la herramienta de ventas de Miguel: tiene que
convertir visitas en conversaciones de WhatsApp, mostrando que ya construyó
sistemas reales (no mockups) para negocios de CDMX, y comunicar claramente
los niveles de servicio que ofrece — incluyendo el diferenciador nuevo:
páginas con panel de autoedición para el cliente.

## Marca — activos reales ya existentes

Miguel ya tiene identidad de marca hecha (logo, flyer, tarjeta de
presentación). El sitio **hereda esta identidad**, no inventa una nueva. Ver
`02-sistema-diseno.md` para el detalle de colores/tipografía extraídos de
estos materiales.

- **Logo:** monograma "MH" — la M en negro/metal oscuro, la H en degradado
  azul cromado, con 4 cuadros azules pequeños (motivo "pixel/digital") arriba
  a la derecha del logo.
- **Flyer de marca:** fondo azul-negro casi puro con líneas de circuito muy
  sutiles de fondo, tipografía blanca gruesa para headlines, azul eléctrico
  para palabras clave resaltadas.
- **Tarjeta de presentación:** cara clara (fondo blanco/gris muy claro) con
  el logo, tagline, y un bloque de contacto con separadores de punto azul +
  línea — ese motivo de "punto + línea" se reutiliza como elemento de diseño
  en el sitio (ver sección de motivos en `02-sistema-diseno.md`).
- **Tagline oficial:** "Digitaliza tu negocio con páginas web y sistemas que
  sí venden y organizan."
- **Sub-tagline:** "UX · WEB · SYSTEMS"

## Datos de contacto reales (ya confirmados, usar tal cual)

- WhatsApp: **55 2311 8153**
- Correo: **mhastralsystems@gmail.com**
- Nombre para firma/legal: **Miguel Huerta Bautista**
- Dominio: **mh-astral-systems.com**

## Los 7 documentos de este plan

1. `00-resumen-ejecutivo.md` — este archivo.
2. `01-arquitectura-sitio.md` — mapa de rutas y estructura sección por
   sección de cada página.
3. `02-sistema-diseno.md` — colores reales de marca, tipografía, motivos
   visuales, reglas de uso del logo.
4. `03-contenido-y-servicios.md` — todo el copy real: servicios (del
   flyer), el nuevo diferenciador de paneles de personalización, tiers de
   precio, casos de éxito.
5. `04-animaciones-e-interacciones.md` — spec de motion, con componentes
   concretos de reactbits.dev sugeridos por sección.
6. `05-modelo-de-datos-backend.md` — qué entidades necesitará el backend
   futuro (Supabase) y alcance del panel admin.
7. `06-plan-de-construccion.md` — orden de trabajo en Claude Code, y qué
   es fase 1 (ahora) vs fase 2 (después, no tocar todavía).

## Fuera de alcance para esta primera versión (confirmado)

- Portal de cliente (login de clientes de Miguel para ver avances/apps).
- Generación de imágenes con IA dentro de paneles de cliente.
- Backend real / autenticación real del admin.

Todo esto está documentado como roadmap en `06-plan-de-construccion.md`,
pero **no se construye en esta fase**.
