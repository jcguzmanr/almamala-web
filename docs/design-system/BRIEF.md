# Brief de sistema de diseño — Alma Mala

Este archivo **es la tarea**. Un humano + Claude Code, en un Mac, deben implementarla en este repo y abrir un PR de código. No rediseñes desde cero: unifica lo que ya existe y cambia el acento visual del catálogo.

Idioma de trabajo: español. Código, commits y PR en el idioma que ya usa el repo (español está bien).

---

## 0. Cómo ejecutar esto en Mac + Claude Code

1. Clona o actualiza el repo y abre la carpeta en Claude Code.
2. Pega o apunta a este archivo: `docs/design-system/BRIEF.md`.
3. Pide explicitamente: *implementa este brief en el orden de las fases; no saltes tokens; no inventes assets ni claims*.
4. Trabaja en una rama de feature. Un PR de implementación al final.
5. Antes de cada fase, relee la sección **Prohibido** y **Estado verificado**. Si el código contradice este brief, gana el código y anótalo en el PR.

Comando sugerido para Claude Code:

```text
Implementa docs/design-system/BRIEF.md.
Orden obligatorio: 1) tokens 2) tipo/spacing 3) bloques de producto 4) layout.
No inventes 250 ml, ni un render Quebranta, ni claims legales/DO.
No cambies el número de WhatsApp ni el flujo de checkout.
```

---

## 1. Objetivo

Hacer que la web se lea como un **menú de producto**, no como un ensayo de marca.

Dirección visual (referencia, **no un clon**): ITSU — fotos de producto grandes, pocos colores, bloques tipo carta, cero storytelling en el hero. Traducir eso a los verdes y dorados de Alma Mala y a **tres formatos reales** (500 ml, 750 ml, damajuana 4 L).

El resultado comercial no cambia: el usuario elige presentaciones, arma carrito y cierra por WhatsApp.

---

## 2. Prohibido

- Inventar un formato **250 ml**. No hay asset ni SKU.
- Inventar un **render de botella Quebranta** (ni de Italia, ni de Mosto Verde). Hay **un solo modelo físico** de botella; las tres uvas de 500/750 comparten la misma foto.
- Añadir claims de **DO / Denominación de Origen**, certificación, premios, “el mejor pisco”, o cualquier copy legal que **no esté ya** en el repo.
- Cambiar el **número de WhatsApp**, el formato `wa.me`, o el texto del botón `Finalizar pedido en WhatsApp`.
- Romper el flujo catálogo → carrito → checkout → `POST /api/orders` → WhatsApp.
- Empezar por layout o “rediseñar páginas” antes de unificar tokens.
- Crear un sistema de color paralelo (`theme.json` nuevo, tokens con otros hex) si ya existen estos hex en `tailwind.config.js`.

---

## 3. Estado verificado del repo (abril de lectura: no inventar)

Comprobado contra el código. Si algo no coincide al implementar, el código manda.

### Color ya nombrado

En `tailwind.config.js` (este es el archivo que hoy define las clases `alma-*` usadas en la UI):

| Token Tailwind           | Hex       |
| ------------------------ | --------- |
| `alma-verde-profundo`    | `#062F3C` |
| `alma-verde-seco`        | `#1F4E4A` |
| `alma-dorado-oscuro`     | `#D6AA4C` |
| `alma-dorado-claro`      | `#FFD77A` |
| `alma-negro-carbon`      | `#1A1A1A` |
| `alma-blanco-hueso`      | `#F6F4EF` |

`colors.json` tiene los **mismos hex** con otros nombres (`verdeMalaProfundo`, `doradoPiscoOscuro`, etc.). No inventar una tercera paleta: unificar nombres.

Roles ya usados en `tailwind.config.js` (mantener el espíritu, no los grises de shadcn):

- primary = dorado oscuro `#D6AA4C`, foreground verde profundo `#062F3C`
- secondary = verde seco `#1F4E4A`, foreground dorado claro `#FFD77A`
- accent = dorado claro `#FFD77A`, foreground verde profundo
- card = blanco hueso `#F6F4EF`, foreground verde profundo

### Tokens rotos hoy

`app/globals.css` sigue con las **CSS variables grises por defecto de shadcn** (`--background: 0 0% 100%`, `--primary: 222.2 47.4% 11.2%`, slate/gray). El `body` sí pinta un degradado Alma a mano (`#062F3C` / `#1F4E4A`) y texto `#D6AA4C`. Hay dos fuentes de verdad.

Además:

- Existe `tailwind.config.ts` **sin** colores `alma-*`. `components.json` apunta a ese `.ts` (`baseColor: slate`, `cssVariables: true`).
- `CartSummary.tsx` y `CheckoutSummary.tsx` todavía usan `gray-900` / `green-700`. Evidencia de que los tokens no están unificados.

**Fase 1 existe para arreglar esto. No toques layout hasta que un token cambie el color en Tailwind y en CSS variables a la vez.**

### Assets reales

| Archivo                         | Uso                                      |
| ------------------------------- | ---------------------------------------- |
| `public/images/logo_am.svg`     | Logo. Ya se usa en header, home, páginas |
| `public/images/500ML.png`       | Pack shot 500 ml                         |
| `public/images/750ML.png`       | Pack shot 750 ml                         |
| `public/images/DAMAJUANA.png`   | Pack shot damajuana 4 L                  |

`lib/productos.ts` mapea `500ML` / `750ML` / `DAMAJUANA` a esas rutas. Fallback actual: `500ML.png`. No hay 250 ml.

Otros archivos en `public/images/` (Yape, Interbank, `Logos.png`) son de checkout/pago. No son pack shots. No inventar `metatag.png` si no está en disco.

### Catálogo real

`productos.json`:

- **Italia**, **Quebranta**, **Mosto Verde**: cada uno con 500 ML y 750 ML. Las tres uvas usan las **mismas** claves de imagen `500ML` y `750ML`.
- **Damajuanas 4L**: tres líneas (Italia, Mosto Verde, Quebranta) que comparten `DAMAJUANA.png`. El campo `volumen` aquí es el **tipo de uva**, no el mililitraje.

Un modelo de botella. Tres fotos. No hay render por cepa.

Tabs en home (`PiscoTabs`): Italia, Quebranta, Mosto Verde, Damajuanas.

### Flujo de venta que se conserva

1. Home: catálogo + tabs + logo + carrito.
2. Agregar presentación (cantidad + “Agregar”).
3. `/carrito` y checkout en 3 pasos (revisión, envío, revisa y paga).
4. `processCheckout` → `POST /api/orders` → `openWhatsApp`.
5. Botón: **Finalizar pedido en WhatsApp**.
6. Número canónico en `data/app-config.json`:
   - `number`: `924473237`
   - `displayNumber`: `924 473 237`
   - `fullNumber`: `51924473237`
   - override opcional: `NEXT_PUBLIC_WHATSAPP_NUMBER`
7. Footer: “WhatsApp Pedidos” enlaza a `https://wa.me/{fullNumber}`.

**No cambies ese número ni el override de env.** Si tocas `getWhatsAppNumber()`, el valor por defecto sigue siendo `51924473237`.

Pagos ya descritos en checkout: Yape/Plin y transferencia Interbank. Coordinación por WhatsApp. No añadir pasarela nueva.

### Copy que sí existe (se puede reusar; no ampliar claims)

Metadatos (`app/layout.tsx`):

- Título: `Alma Mala | Desde Mala, Perú`
- Descripción: `Alma Mala, desde Mala, Perú. Un destilado trabajado con respeto por la uva, el proceso y el territorio.`

`data/pages-content.json` → `acerca-de`: marca peruana, pisco de alta calidad, tradición, excelencia, sostenibilidad. El resto de páginas legales son *lorem ipsum*.

Textos de producto: los de `productos.json` (descripcion, disfrutaloEn, nose/taste/finish, ABV, cocktails, precios).

`coredrives.json` existe (Valle de Mala, destilación, etc.) pero **no alimenta la UI**. No lo conviertas en un ensayo en home. Si usas una frase, que sea corta y ya escrita ahí o en `acerca-de`. No cites DO.

### Tipo hoy

No hay webfont. `layout` usa `antialiased` y el stack del sistema. El brief de PMV (`brief.md`) mencionó “similar a SF Rounded, web-friendly” como deseo, **no está implementado**.

### UI de producto hoy (el problema)

`PresentacionItem` muestra la foto en un recuadro chico (`w-24 h-32` / `md:w-32 md:h-40`). `ProductoCard` lidera con párrafo largo + “Presentaciones disponibles” + bloque sensorial completo (NOSE / TASTE / FINISH). Eso es ensayo + thumbnails. Lo contrario de ITSU.

---

## 4. Dirección visual (traducir, no copiar)

ITSU sirve como **método**, no como skin:

| ITSU (método)                         | Alma Mala                                      |
| ------------------------------------- | ---------------------------------------------- |
| Foto de plato enorme                  | Pack shot 500 / 750 / damajuana a tamaño héroe |
| Paleta corta (pocos colores)          | Solo los 6 tokens Alma + transparencias suyas  |
| Bloque tipo menú: nombre, precio, CTA | Bloque SKU: uva, formato, precio, una línea, agregar |
| Home = carta, no manifiesto           | Home = catálogo. La marca vive en logo + color |

Reglas:

- El producto ocupa más superficie que el texto.
- Pocos colores. Cero `gray-*` / `green-700` residuales en superficies de venta.
- Bloques repetibles, alineados, como filas de carta. No cards de blog.
- El logo (`logo_am.svg`) identifica; no hace falta un manifiesto bajo el logo.
- Fondo: verdes Alma. CTA y precio: dorados. Superficie de ficha: hueso o verde seco, no blanco puro de shadcn.
- Mobile-first. El pack shot sigue siendo grande en móvil (ancho de bloque, no thumbnail).

---

## 5. Orden de implementación (obligatorio)

No mezclar fases en un solo “rediseño”. Se puede commitear por fase. No abrir el PR de implementación hasta terminar la fase 4, pero el diff debe dejar claro que los tokens fueron primero.

### Fase 1 — Tokens (una sola fuente)

Unificar Tailwind **y** CSS variables **antes** de cualquier layout.

Hacer:

1. Elegir **un** `tailwind.config` canónico. Hoy hay `.js` (con Alma) y `.ts` (slate). Dejar uno. Actualizar `components.json` para que apunte al canónico. No dejar dos configs que se contradicen.
2. Definir los 6 colores Alma **una vez** (hex + equivalentes HSL para `hsl(var(--…))`). Verificar la conversión; no copiar HSL de memoria.
3. Mapear variables shadcn en `app/globals.css` (`:root` y, si se conserva, `.dark`) a esos tokens. `--primary`, `--secondary`, `--accent`, `--background`, `--foreground`, `--card`, `--muted`, `--border`, `--ring` dejan de ser slate.
4. Exponer los mismos valores como `alma-*` en `theme.extend.colors` (las clases actuales de la UI no deben romperse).
5. Alinear `colors.json` a los mismos nombres o documentar el alias. Nada de hex distintos.
6. Sustituir `gray-900` / `green-700` / fondos `#fff` de shadcn en checkout/carrito por tokens Alma.
7. El degradado del `body` debe usar tokens (variables o clases), no hex sueltos si ya viven en el tema.

Criterio de salida de fase 1: cambiar un token (p. ej. `--primary` / `alma-dorado-oscuro`) cambia CTA, bordes y variables shadcn a la vez. `npm run lint` y `npm run build` pasan.

### Fase 2 — Tipo y spacing (notas → tokens, aún no layout de página)

Documentar e implementar **escala**, no rediseñar home.

Tipo:

- Una familia para UI/menú. Sin serif editorial.
- Opciones aceptables: stack de sistema (`ui-rounded`, `-apple-system`, `system-ui`) — en Mac se acerca a SF — **o** una webfont redondeada/neutra, de peso limitado (2–3 weights).
- Si cargas webfont, justifícala en el PR y úsala vía token (`font-sans` / `fontFamily` en el config). No mezclar tres familias.
- Escala corta: display (nombre de producto), title (formato/sección), body, price, meta (ABV, “disfrútalo en”).
- Precios en dorado, tabulares si es posible (`tabular-nums`).

Spacing:

- Escala 4/8 (p. ej. 8 / 16 / 24 / 32 / 48). Dejar de mezclar `px-2` + `p-6` + `max-w-6xl` sin criterio.
- Radio: ya existe `--radius` (hoy `0.5rem`). Un valor para bloques de menú; no reinventar `rounded-2xl` por componente sin token.
- Ancho de contenido: un `max-width` para catálogo. El producto puede sangrar más que el texto.

Criterio de salida de fase 2: tokens de `fontSize` / `spacing` / `borderRadius` en el tema (o CSS variables), aplicados al menos a bloques de producto y CTA. Todavía no reordenar la página.

### Fase 3 — Bloques de producto (las tres fotos)

Rediseñar el **SKU**, no el sitio.

Cada ítem vendible es un bloque de menú:

1. **Foto grande** del pack shot correcto (`500ML.png`, `750ML.png`, `DAMAJUANA.png`) con `next/image`, `object-contain`, fondo limpio (hueso o verde).
2. Tipo de pisco (Italia / Quebranta / Mosto Verde).
3. Formato visible: `500 ml`, `750 ml`, o `Damajuana 4 L`.
4. Precio tal cual en `productos.json` (`S/ 22`, etc.).
5. **Una** línea de apoyo: `disfrutaloEn` o la primera frase de `descripcion`. No el párrafo entero.
6. Control de cantidad + **Agregar** (misma semántica que `PresentacionItem` / `CartContext`). IDs de carrito: no romper `productoId` / `volumen` / `imagen`.

Reglas de foto:

- Italia 500, Quebranta 500 y Mosto Verde 500 = **la misma** `500ML.png`.
- Igual para 750 y para damajuana.
- No generes ni pidas un PNG “Quebranta only”.
- No uses `Logos.png` ni el logo como si fueran la botella.

Sensorial (`nose`, `taste`, `finish`, `abv`, `cocktails`): puede quedar **secundario** (desplegable, pie de bloque, o una sola línea ABV). No puede competir en tamaño con la foto. No inventes notas nuevas.

Damajuana: tres bloques (Italia / Mosto Verde / Quebranta) con la **misma** `DAMAJUANA.png`. El label de uva distingue; la foto no.

Criterio de salida de fase 3: en un viewport móvil se entiende el formato por la foto; agregar al carrito sigue funcionando para las 3 uvas × 2 botellas + 3 damajuanas.

### Fase 4 — Layout de página (al final)

Solo cuando las fases 1–3 están hechas.

Home:

- Header: logo + carrito. Tabs de uva/formato pueden quedarse si ayudan a saltar; no las conviertas en un essay.
- Quitar o reducir el logo grande duplicado bajo el header si ya está en el header. El héroe es el **producto**, no el isotipo repetido.
- Lista/carta de bloques de la fase 3. Ritmo vertical constante. No un manifiesto `coredrives` en el centro.
- Footer: conservar depósito, horario, WhatsApp (mismo número), enlaces. Puedes alinear color/tipo a tokens; no reescribir legales.

Otras rutas (`/carrito`, checkout, `/acerca-de`, legales):

- Aplicar tokens (fase 1–2) para que no queden islas gris/verde-700.
- No “rediseñar” `/acerca-de` como landing de marca. El catálogo es la home.
- No rellenar *lorem ipsum* de páginas legales con claims nuevos.

Criterio de salida de fase 4: home se recorre como menú; checkout y WhatsApp intactos; `npm run lint` + `npm run build` OK.

---

## 6. Criterios de aceptación (PR de implementación)

- [ ] Una sola fuente de tokens; `tailwind.config` canónico + `globals.css` alineados; `components.json` apunta al canónico.
- [ ] Los 6 hex Alma son los únicos cromáticos de marca. Sin slate residual en venta/checkout.
- [ ] Pack shots usados: solo `500ML.png`, `750ML.png`, `DAMAJUANA.png`. Cero 250 ml. Cero render por cepa.
- [ ] Bloques de producto: foto grande, formato, precio, una línea, agregar.
- [ ] Carrito y checkout: mismas presentaciones, mismos precios, mismo `orderPayload`.
- [ ] WhatsApp: `51924473237` / display `924 473 237`. Botón y mensaje prellenado siguen.
- [ ] Copy nueva, si la hay, es recorte o reorden de textos ya existentes. Sin DO ni superlativos legales.
- [ ] Diff revisable por fase (tokens → tipo → bloques → layout).

---

## 7. Cómo se revisará el PR de implementación

1. **Diff**: tokens primero; luego tipografía/spacing; luego componentes de producto; layout al final. Rechazar un PR que solo mueva cajas y deje `globals.css` en gris shadcn.
2. **Preview** (sí, en el PR de código): home móvil y desktop, agregar 500 / 750 / damajuana, carrito, checkout hasta el umbral de WhatsApp. Comprobar que el número no cambió (footer + `app-config` + env).
3. **No** se pide rediseño de páginas legales ni copy nueva de marca.

Este documento (`docs/design-system/BRIEF.md`) no se implementa en el PR de docs. El PR de docs solo entrega el brief.
