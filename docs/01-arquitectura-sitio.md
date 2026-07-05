# 01 · Arquitectura del sitio

## Mapa de rutas

```
/                    Home — todas las secciones de venta
/blog                Listado de artículos
/blog/:slug          Artículo individual
/admin               Login del panel (Miguel, no clientes)
/admin/dashboard     Panel: casos, precios, blog, configuración
```

No hay portal de cliente ni rutas de autenticación de clientes en esta
fase. Ver `06-plan-de-construccion.md` para el roadmap.

## Home — estructura sección por sección

### 1. Navbar
Isla flotante fija arriba, separada del borde (no pegada). Contiene:
logo "MH" + wordmark, links a Casos / Servicios / Proceso / Blog, botón
CTA de WhatsApp. En móvil colapsa a hamburguesa con overlay a pantalla
completa.

### 2. Hero
- Fondo: escena animada con motivo de circuito/partículas (ver
  `04-animaciones-e-interacciones.md` — candidato: componente "Beams" o
  "Aurora" de reactbits, en azul, no genérico gradiente morado).
- Headline: variación de la tagline oficial, ajustada a "tú" (el visitante
  es el dueño del negocio, no Miguel).
- Sub-headline: una frase que mencione páginas + sistemas + paneles de
  autoedición desde el hero, porque es el diferenciador nuevo y no debe
  esperar hasta la sección de servicios para aparecer.
- 2 CTAs: "Cuéntame tu proyecto" (primario, WhatsApp) / "Ver sistemas
  construidos" (ancla a Casos).

### 3. Servicios (basado en el flyer real, expandido)
Formato de lista con ícono + label, igual que el flyer (no cards
genéricas) — es un patrón que Miguel ya usa y que sus clientes ya
reconocen. Ver `03-contenido-y-servicios.md` para el listado completo,
que incluye el nuevo ítem destacado de paneles de personalización.

### 4. Casos de éxito
Confetti, Jardines Club Hípico, Fiesta Total DJ's, Electrotécnica Berlín.
Formato "folio" (SIS-01, SIS-02...) — ver contenido completo en el doc 03.

### 5. Diferenciador: paneles de autoedición
Sección propia, no un ítem más de la lista de servicios. Aquí se explica
con ejemplo concreto (screenshots o mockup del panel de Confetti editando
precios/fotos) por qué esto vale más que una página estática. Esta sección
es nueva respecto al primer borrador — Miguel pidió explícitamente que
fuera un atractivo central, no un checkbox más.

### 6. Tiers de precio
Presencia / Autónomo (con panel) / Autónomo + IA (con generación de
imágenes limitada). Precios reales pendientes de definir por Miguel.

### 7. Proceso
4 pasos: Diagnóstico → Propuesta → Construcción → Entrega. Es una
secuencia real, por eso lleva numeración.

### 8. Tarjeta de contacto digital
Componente que replica visualmente la tarjeta de presentación física de
Miguel (QR de WhatsApp + teléfono + correo + firma). Es un activo de marca
que ya existe y que refuerza que esto es un negocio real con dueño con
nombre, no una agencia anónima.

### 9. CTA final
Bloque destacado antes del footer, WhatsApp directo.

### 10. Footer
Logo, año, links a Blog/Admin, datos de contacto.

## Preguntas que Miguel debe confirmar antes de construir

- ¿La sección "Sobre mí" (historia, Xochimilco, por qué hace esto) se
  incluye o se deja fuera? *(pendiente de tu respuesta — no se agregó
  todavía a esta arquitectura)*
- ¿Los precios de los tiers ya están definidos o se dejan como "cotización
  personalizada" en el lanzamiento?
