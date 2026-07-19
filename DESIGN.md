# Sistema de Diseño — Balanz

Sistema de diseño propio inspirado en la filosofía visual de Supabase (fondo oscuro, alto contraste, estética developer-first, separación por bordes) con una paleta azul de marca conservadora y profesional.

---

## 1. Paleta de color

Los tokens de color son variables CSS definidas en `globals.css` con doble tema (light/dark). Se usa el sistema de tokens semánticos de Tailwind v4.

### Tema claro

| Token CSS | HSL | Uso |
|---|---|---|
| `--background` | `hsl(217 100% 97%)` | Fondo principal de página |
| `--foreground` | `hsl(217 100% 22%)` | Texto principal |
| `--card` | `hsl(0 0% 100%)` | Tarjetas, paneles |
| `--card-foreground` | `hsl(217 100% 22%)` | Texto en tarjetas |
| `--primary` | `hsl(214 82% 41%)` | Acento de marca: CTAs, links activos |
| `--primary-foreground` | `hsl(0 0% 100%)` | Texto sobre acento |
| `--secondary` | `hsl(217 80% 94%)` | Fondo secundario |
| `--secondary-foreground` | `hsl(217 100% 22%)` | Texto sobre secundario |
| `--muted` | `hsl(217 40% 93%)` | Fondo atenuado |
| `--muted-foreground` | `hsl(216 21% 41%)` | Texto secundario, descripciones |
| `--accent` | `hsl(217 80% 94%)` | Fondo de acento (hover) |
| `--accent-foreground` | `hsl(217 100% 22%)` | Texto sobre acento |
| `--border` | `hsl(217 30% 88%)` | Líneas divisorias, bordes |
| `--input` | `hsl(217 30% 88%)` | Bordes de inputs |
| `--ring` | `hsl(217 100% 50%)` | Anillos de focus, glow |
| `--destructive` | `hsl(0 85% 64%)` | Estados de error/destrucción |

### Tema oscuro

| Token CSS | HSL | Uso |
|---|---|---|
| `--background` | `hsl(217 50% 6%)` | Fondo principal (casi negro con temperatura azul) |
| `--foreground` | `hsl(217 30% 90%)` | Texto principal |
| `--card` | `hsl(217 40% 10%)` | Tarjetas, superficie elevada |
| `--card-foreground` | `hsl(217 30% 90%)` | Texto en tarjetas |
| `--primary` | `hsl(217 100% 50%)` | Acento de marca: CTAs, glow del hero |
| `--primary-foreground` | `hsl(217 30% 98%)` | Texto sobre acento |
| `--secondary` | `hsl(217 30% 16%)` | Fondo secundario |
| `--muted-foreground` | `hsl(217 15% 55%)` | Metadatos, labels secundarias |
| `--border` | `hsl(217 25% 18%)` | Líneas divisorias, bordes de tarjetas |
| `--sidebar` | `hsl(217 40% 8%)` | Fondo del sidebar |
| `--sidebar-foreground` | `hsl(217 25% 85%)` | Texto del sidebar |

**Filosofía de color:** el azul (`--primary`) se usa con moderación — como un "glow" puntual (headline, botón primario, bordes activos), nunca como relleno de grandes superficies. El fondo oscuro se mantiene casi negro para que el azul brille por contraste. La separación entre superficies se logra con bordes (`border`), no con sombras.

---

## 2. Tipografía

Una sola familia sans para todo el texto, con restricción deliberada de pesos: la jerarquía se construye con tamaño y tracking, no con negritas.

| Rol | Fuente | Tamaño | Peso | Line-height | Dónde se usa |
|---|---|---|---|---|---|
| Hero display | Hanken Grotesk | 56-72px | 400 (Regular) | 1.0 | Titular principal del hero |
| Section heading | Hanken Grotesk | 28-36px | 400 | 1.2 | Encabezados de sección (`<h2>`) |
| Subheading | Hanken Grotesk | 20-24px | 400 | 1.3 | Títulos de tarjetas, subtítulos |
| Body default | Hanken Grotesk | 16px | 400 | 1.5 | Texto de párrafo estándar |
| Body medium | Hanken Grotesk | 14px | 400 | 1.4 | Texto secundario, descripciones |
| Label medium | Hanken Grotesk | 14px | **500 (Medium)** | 1.4 | Links de navegación, texto de botones |
| Label small | Hanken Grotesk | 12px | 400 | 1.3 | Badges, metadatos, captions |

**Reglas de peso:**
- El **400 (Regular)** domina el 90% del contenido.
- El **500 (Medium)** se reserva exclusivamente para elementos interactivos (botones, links del menú).
- **No se usa 700 (Bold)** en ningún punto.

---

## 3. Layout y estructura

- **Espaciado entre secciones:** 90–128px (`py-28` a `py-32` en Tailwind), para un ritmo donde cada sección se siente como una escena aislada.
- **Espaciado interno:** denso (16–24px, `p-4` a `p-6`) dentro de cada sección, generando bloques de información concentrados.
- **Separación por borde, no por sombra:** usar `border` para delimitar tarjetas y paneles en vez de `box-shadow`.
- **Grid tipo "bento"** para secciones de features: tarjetas de tamaños desiguales con bordes de acento sutil.
- **Breakpoint principal:** 600px (`sm:`), priorizando mobile-first.

---

## 4. Elemento de firma (signature)

El **glow azul del hero**: el titular principal se renderiza en `text-primary`, pero una palabra o frase clave se resalta con `text-primary` y un `text-shadow` sutil en dark mode, simulando el efecto de una terminal iluminada. Este mismo glow reaparece de forma contenida en el borde superior de las tarjetas activas y en el CTA principal.

---

## 5. Notas de uso rápido

- CTA primario → fondo `bg-primary`, texto `text-primary-foreground`, peso 500.
- CTA secundario (ghost/outline) → borde `border-border`, texto `text-muted-foreground`, hover a `text-primary`.
- Links de navegación → `text-muted-foreground` en reposo, `text-foreground` + underline en hover.
- Tarjetas → `border border-border/30 bg-card` sin `shadow`.
- Inputs → `border border-input/50 bg-transparent`, focus con `ring-1 ring-ring`.
