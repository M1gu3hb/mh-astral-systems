# 05 · Modelo de datos y alcance del panel admin

Esto no se construye en la fase 1 (sitio estático con datos mock). Se deja
documentado para que cuando se conecte un backend real, la estructura ya
esté pensada y no haya que rediseñar nada.

## Backend sugerido

Supabase (Postgres + Auth + Storage en un solo lugar) — ya está disponible
como conector en el entorno de Miguel, así que no implica una herramienta
nueva que aprender ni un costo adicional que justificar antes de tener
cliente.

## Entidades

### `casos_exito`
| Campo | Tipo | Notas |
|---|---|---|
| folio | text | "SIS-01", etc. — se autogenera o se asigna manual |
| cliente | text | |
| resumen | text | |
| stack | text[] | tags tipo "POS", "CRM", "Web" |
| orden | int | para controlar el orden de despliegue |
| publicado | bool | permite ocultar un caso sin borrarlo |

### `servicios_precios`
| Campo | Tipo | Notas |
|---|---|---|
| nombre | text | "Presencia", "Autónomo", etc. |
| precio | text | texto libre, no numérico — permite "desde $X,XXX" |
| periodo | text | "proyecto", "mes", etc. |
| features | text[] | lista de bullets |
| destacado | bool | marca el tier "más elegido" |
| orden | int | |

### `blog_posts`
| Campo | Tipo | Notas |
|---|---|---|
| slug | text | único, usado en la URL |
| titulo | text | |
| resumen | text | |
| contenido | text | markdown o rich text |
| fecha | date | |
| publicado | bool | |

### `config_sitio`
| Campo | Tipo | Notas |
|---|---|---|
| whatsapp | text | número usado en todos los CTAs |
| hero_headline | text | editable sin tocar código |
| hero_subheadline | text | |
| redes | jsonb | links a redes sociales si se agregan después |

## Alcance del panel admin (solo Miguel, no clientes)

- Login con autenticación real (Supabase Auth) — reemplaza el stub actual
  que solo navega sin validar nada.
- CRUD completo sobre las 4 entidades de arriba.
- Reordenar casos y tiers (drag and drop o campo `orden` editable).
- Editor simple de blog (markdown es suficiente, no hace falta rich text
  complejo para el volumen de contenido que Miguel va a publicar).

## Explícitamente fuera de este panel

- Nada de clientes de Miguel entra aquí. Este panel es 100% interno.
- El portal de cliente (login de clientes para ver sus propios proyectos)
  es una base de datos y una autenticación completamente separadas — ver
  `06-plan-de-construccion.md`, fase 2.
