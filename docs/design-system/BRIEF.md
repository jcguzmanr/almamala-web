# Brief — sistema de diseño Alma Mala

Tarea para un humano + **Claude Code en Mac**. Este PR es solo docs/JSON. La implementación va en otro PR.

## Qué hacer

Implementar **desde los JSON**, no desde una página de reglas ni inventando paleta.

```text
Implementa docs/design-system/BRIEF.md.
Fuente: docs/design-system/tokens/*.json (colores, tipo, espacio).
Forma: tokens → components → recipes → templates.
Un modelo de botella. Formatos: 500 ml, 750 ml, damajuana 4 L. No hay 250 ml.
Producto-primero (fotos grandes, pocos colores), método ITSU, tokens Alma de tailwind.config.js.
Orden: tokens primero, luego componentes, luego layout.
No cambies el número de WhatsApp ni el flujo de checkout.
```

## Forma (obligatoria)

1. **Tokens** — `tokens/colors.json`, `tokens/typography.json`, `tokens/spacing.json`. Una fuente. Cablear a Tailwind **y** CSS variables (`app/globals.css` hoy es gris shadcn). Un solo `tailwind.config` canónico (`components.json` apunta al `.ts` slate; el `.js` ya tiene Alma). La página **consume** esos JSON. Sin hex nuevos.
2. **Components** — `components/product-block.json`. UI que lee tokens.
3. **Recipes** — `recipes/product-menu.json`. Bloque tipo carta.
4. **Templates** — `templates/home.json`, `templates/checkout.json`. Layout al final.

El logo está en `logo/` (apunta a `public/images/logo_am.svg`). **No** va dentro de la tabla de tokens.

## Paleta (ya en el repo; no inventar)

`alma-verde-profundo` `#062F3C`, `alma-verde-seco` `#1F4E4A`, `alma-dorado-oscuro` `#D6AA4C`, `alma-dorado-claro` `#FFD77A`, `alma-negro-carbon` `#1A1A1A`, `alma-blanco-hueso` `#F6F4EF`.

Tipo: stack de sistema (no la font de otra marca). Spacing: escala de 8 en el JSON.

## Producto

Fotos: `public/images/500ML.png`, `750ML.png`, `DAMAJUANA.png`. Un modelo físico; las tres uvas comparten foto por formato. Cero render Quebranta. Cero 250 ml.

## No tocar en el PR de implementación

- WhatsApp: `51924473237` / `924 473 237` (`data/app-config.json`).
- Flujo catálogo → carrito → checkout → `POST /api/orders` → WhatsApp.
- Claims DO/legales que el repo no tenga ya.

## Listo cuando

Tokens JSON mandan el color en Tailwind + variables. Bloques con las tres pack shots a tamaño héroe. Checkout y número iguales. Diff por capas (tokens → components → recipes → templates).
