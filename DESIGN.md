# Sistema de Diseño Web — "Supabase" en clave púrpura

Adaptación del lenguaje visual de Supabase (fondo oscuro, alto contraste, estética developer-first) reemplazando el verde esmeralda de marca por una paleta púrpura, conservando la estructura, jerarquía tipográfica y filosofía de espaciado que hacen reconocible a Supabase.

---

## 1. Paleta de color

| Token | Hex | Uso |
|---|---|---|
| `bg-base` | `#121016` | Fondo principal de página (negro con temperatura violeta) |
| `surface-elevated` | `#1E1B24` | Tarjetas, paneles, code blocks |
| `border-subtle` | `#33303C` | Líneas divisorias, bordes de tarjetas (Supabase separa por línea, no por sombra) |
| `brand-purple` | `#9333EA` | Acento de marca: CTAs, links activos, glow del hero |
| `brand-purple-light` | `#C084FC` | Hover states, gradientes, resaltados de código |
| `text-primary` | `#FAFAFA` | Titulares y texto principal |
| `text-secondary` | `#B4B4B4` | Subtítulos, descripciones |
| `text-muted` | `#898989` | Metadatos, timestamps, labels secundarias |

**Filosofía de color:** igual que Supabase evita sombras y genera profundidad por contraste de superficie, aquí el púrpura se usa con moderación — como un "glow" puntual (headline, botón primario, bordes activos), nunca como relleno de grandes superficies. El fondo se mantiene casi negro para que el púrpura brille por contraste, replicando el efecto "terminal en la oscuridad" del original.

---

## 2. Tipografía

Igual que el sistema original, se recomienda **una sola familia sans para todo el texto** (evitando mezclar demasiadas fuentes) más **una monoespaciada para código**, con restricción deliberada de pesos: la jerarquía se construye con tamaño y tracking, no con negritas.

| Rol | Fuente | Tamaño | Peso | Line-height | Letter-spacing | Dónde se usa |
|---|---|---|---|---|---|---|
| Hero display | Circular (o alternativa libre: **Inter** / **General Sans**) | 72px | 400 (Regular) | 72px (leading 1.0) | normal | Titular principal del hero, línea comprimida sin aire vertical extra |
| Section heading | Circular / Inter | 36px | 400 | 43.2px | normal | Encabezados de cada sección (`<h2>`) |
| Subheading | Circular / Inter | 24px | 400 | 32px | -0.16px | Subtítulos de sección, títulos de tarjetas de features |
| Large body | Circular / Inter | 18px | 400 | 28px | normal | Párrafos destacados bajo el hero |
| Body default | Circular / Inter | 16px | 400 | 24px | normal | Texto de párrafo estándar |
| Body medium | Circular / Inter | 14px | 400 | 20px | normal | Texto secundario, descripciones de tarjetas |
| Label medium | Circular / Inter | 14px | **500 (Medium)** | 20px | normal | Links de navegación, texto de botones (único lugar con peso >400) |
| Label small | Circular / Inter | 12px | 400 | 16px | normal | Badges, metadatos, captions |
| Código | **Source Code Pro** (o **JetBrains Mono**) | 12–14px | 400–500 | 1.5 | normal | Bloques de código, terminal, snippets inline |

**Reglas de peso:**
- El **400 (Regular)** domina el 90% del contenido — evita que la interfaz se sienta "gritada".
- El **500 (Medium)** se reserva exclusivamente para elementos interactivos/de navegación (botones, links del menú), como señal sutil de "esto es accionable".
- **No se usa 700 (Bold)** en ningún punto: la jerarquía visual la da el tamaño, el color (púrpura) y el espaciado, no el grosor de trazo.

---

## 3. Layout y estructura

- **Espaciado entre secciones:** 90–128px, para un ritmo "cinematográfico" donde cada sección se siente como una escena aislada en el fondo oscuro.
- **Espaciado interno:** denso (16–24px) dentro de cada sección, generando bloques de información concentrados.
- **Separación por borde, no por sombra:** usar `border-subtle` (1px) para delimitar tarjetas y paneles en vez de `box-shadow`. Si se necesita profundidad, un `box-shadow` mínimo y funcional: `rgba(0,0,0,0.1) 0px 4px 12px`, sólo en focus states.
- **Grid tipo "bento"** para secciones de features: tarjetas de tamaños desiguales, cada una con un ícono lineal o mini-diagrama con glow púrpura.
- **Breakpoint principal:** un único quiebre en 600px, priorizando mobile-first y progressive enhancement por encima de un sistema de grillas complejo.

---

## 4. Elemento de firma (signature)

El **glow púrpura del hero**: el titular principal se renderiza en `text-primary`, pero una palabra o frase clave se resalta con `brand-purple` y un `text-shadow`/gradiente radial suave detrás, simulando el efecto de una terminal iluminada en un cuarto oscuro. Este mismo glow reaparece de forma contenida en el borde superior de las tarjetas activas y en el CTA principal — es el único lugar donde el color "brilla" en vez de solo pintar.

---

## 5. Notas de uso rápido

- CTA primario → fondo `brand-purple`, texto `#FAFAFA`, peso 500.
- CTA secundario (ghost) → borde `border-subtle`, texto `text-secondary`, hover a `brand-purple-light`.
- Links de navegación → `text-secondary` en reposo, `text-primary` + `brand-purple-light` underline en hover.
- Código inline → fondo `surface-elevated`, texto en `brand-purple-light`, fuente monoespaciada.
