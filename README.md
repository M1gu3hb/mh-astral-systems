# MH Astral Systems — mh-astral-systems.com

Sitio web de **MH Astral Systems** (marca personal de Miguel Huerta Bautista,
CDMX). Herramienta de ventas que muestra sistemas reales construidos para
negocios de la Ciudad de México y comunica los niveles de servicio —
incluyendo el diferenciador: **páginas con panel de autoedición** para el
cliente.

> **Tagline:** Digitaliza tu negocio con páginas web y sistemas que sí venden y organizan.
> **UX · WEB · SYSTEMS**

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** (design tokens de la marca real en `tailwind.config.js`)
- **React Router 6** (SPA)
- **Motion** (Framer Motion) para animaciones de scroll y reveals
- Componentes de **[reactbits.dev](https://reactbits.dev)** integrados con su
  código fuente exacto y recoloreados a la paleta de marca:
  - `DarkVeil` (ogl / WebGL) — fondo del hero
  - `Antigravity` (three.js) — campo de partículas del CTA final
  - `OrbitImages` (motion) — chips orbitando el monograma en el hero
  - `GlassSurface` — la isla flotante del header (efecto "liquid glass")
  - `Folder` — proyectos del portal de cliente y expediente de contacto
  - `MagicBento` (gsap) — showcase de sistemas
  - `StaggeredMenu` (gsap) — menú móvil a pantalla completa
  - `Dock` (motion) — accesos rápidos del portal de cliente
  - `FlowingMenu` (gsap) — banda editorial del blog

## Fase actual (fase 1)

Sitio completo y navegable **sin backend ni base de datos**. Todo con datos
mock (`src/data`):

- **Home** — hero, servicios, sistemas, casos de éxito, diferenciador (panel de
  autoedición), precios, proceso, tarjeta de contacto y CTA.
- **Blog** — listado + artículo individual.
- **Portal de cliente** — login stub, dashboard con proyectos como carpetas.
- **Panel admin** — login stub, dashboard con casos, precios, blog y config.

Los logins son **stubs** (cualquier dato entra, sin autenticación real). La
integración con Supabase (Auth + Postgres + Storage) es **fase 2**, documentada
en `docs/05` y `docs/06` pero **no implementada** aquí.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción → dist/
npm run preview  # sirve el build
```

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Home |
| `/blog` · `/blog/:slug` | Blog |
| `/portal` · `/portal/dashboard` | Portal de cliente (stub) |
| `/admin` · `/admin/dashboard` | Panel interno (stub) |

## Documentación de diseño

El plan completo (arquitectura, sistema de diseño, contenido real, animaciones,
modelo de datos y componentes) vive en [`docs/`](./docs).

---

Contacto: WhatsApp **55 2311 8153** · mhastralsystems@gmail.com
