---
cursor:
  subagentId: "bc-f73aeefe-76ed-50fd-8166-4471e83f31d7"
title: Review de optimización — PMV web Alma Mala
date: 2026-09-10
live: https://almamala-web.vercel.app
domain: https://almamala.com (no es el PMV)
---

# Review de optimización — landing actual

Revisé el PMV **en producción** (`https://almamala-web.vercel.app`) y el código local de `AlmaMalaWeb` (rama `cursor/whatsapp-receipt-checkout-31d7`, 2 commits por delante de `origin/main`: age-gate y WhatsApp canónico). No afirmé DO en ningún lado: el live tampoco lo hace.

## Superficies “vivas”

| URL | Qué hay hoy |
|---|---|
| [almamala.com](https://almamala.com) | Parking de Squarespace: *Coming Soon*, `noindex`. No es la tienda. `/carrito` y assets de producto no existen aquí. |
| [almamala-web.vercel.app](https://almamala-web.vercel.app) | PMV real: catálogo → carrito → WhatsApp. Título *Alma Mala \| Desde Mala, Perú*. Sin age-gate (el commit local no está en Vercel). |
| Local | Lo que corre en esta máquina, con comprobante de pago en el checkout. |

Hasta que el dominio apunte al deploy de Vercel, el canal público de marca es un coming soon y la venta web vive en un subdominio de Vercel.

## Qué funciona

- Flujo mobile-first de tienda: tabs por cepa, cards con foto de formato, carrito en `localStorage`.
- Paleta web `#062F3C` / `#1F4E4A` / `#D6AA4C` / `#FFD77A` aplicada de forma consistente en chrome, cards y botones. No hay cyan.
- Copy de catálogo y ficha sensorial (nariz / boca / final / ABV) sin folklorismo ni claim de DO.
- Checkout en 3 pasos, Yape/Plin + Interbank visibles, WhatsApp `+51 971 702 991` en footer y en config.
- SEO de layout alineado con el brief (*Desde Mala, Perú*; “uva, proceso y territorio”).
- Empty del carrito y error boundary existen.

## UX

**Home es tienda, no landing de marca.** Logo + tabs + listado. No hay hero, origen, ni CTA de territorio. Para conversión del PMV está bien; para Mariana / Lisa / Marco falta el “por qué esta botella”.

Fricciones concretas:

1. **El pedido se iba a WhatsApp sin prueba de pago.** El copy ya pedía el comprobante *después* del chat. Eso se implementó en local (ver abajo); el live de Vercel todavía abre un `wa.me` solo-texto.
2. **Tras “Finalizar” el carrito se vaciaba aunque WhatsApp se bloqueara.** No había pantalla de éxito con el `orderId`.
3. **Retiro en depósito pide dirección completa** igual que el envío a Lima.
4. **Cupón “aplicar” no descuenta** y lo dice en itálica; se siente a medio hacer.
5. **Perfil sensorial en `line-clamp-2`**: las notas largas (Italia) se cortan justo donde Lisa necesita la ficha.
6. **Una foto por formato, no por cepa.** Italia / Quebranta / Mosto Verde se ven iguales en 500 y 750.
7. **Tabs sticky + IntersectionObserver** con logs de debug a `127.0.0.1:7243` en cada mount (catálogo, tabs, error boundary). En producción son requests muertos.

## Copy

- Metatags: bien, voz de marca, sin DO.
- Home: cero bajada (*Un espíritu que nace de la tierra…* sigue sin usarse).
- *Acerca de*: genérico (“alta calidad”, “tradición”) y **no nombra el Valle de Mala**.
- Legal, FAQ, gift card, diversidad, botellas retornables, libro de reclamaciones: **lorem ipsum**. En un sitio de alcohol + pagos por Yape eso quema confianza.
- Checkout (live): “el pago se completa por WhatsApp” vs. la página ya muestra Yape/QR. Mensaje cruzado. El copy local ahora pide pagar, subir comprobante y enviar.
- Precios S/ 22–50 vs. discurso premium S/ 35–80 del material de marketing: no es un bug, pero la home no explica el valor.

## Checkout (live vs. lo pedido)

Live Vercel:

1. Carrito + zona Lima (S/ 15 / 25 / 35) o retiro Pueblo Libre.
2. Datos de envío.
3. Resumen + medios de pago + `wa.me` con el detalle.
4. `POST /api/orders` genera `AM-…` y **solo lo imprime en consola del server**. No hay email real ni DB.
5. El total del payload **no resta** el 5% de botellas retornables (sí se escribe en el mensaje, aparte). El número de WhatsApp y el del backend pueden no coincidir.

Hueco que pedía Juan Carlos: el comprobante no viajaba con el pedido. `wa.me` no admite archivos; había que forzar upload + share/adjunto. Eso ya está en el código local, no en Vercel.

## Performance

Medido en el HTML y headers de Vercel (HIT, `cache-control: public, max-age=0, must-revalidate`):

| Asset | Peso | Nota |
|---|---|---|
| Home HTML | ~14 KB | Aceptable. |
| `500ML.png` | 402 KB | PNG sin comprimir, una por card. |
| `750ML.png` | 552 KB | Igual. |
| `DAMAJUANA.png` | 695 KB | Igual. |
| `logo_am.svg` | 342 KB | SVG enorme (casi seguro con raster embebido); se carga **dos veces** en home. |
| `QR_yape.JPG` | 218 KB | Solo en checkout. |
| `/images/metatag.png` | **404** | OG apunta aquí. |
| `/favicon.ico` | **404** | |

El catálogo es client-side (`getProductos()` en `useEffect`) con spinner aunque el JSON ya está en el bundle. `next/image` no tiene `priority` en las botellas; el logo sí. No hay `Playfair`/`Inter`: el brief los pide, el HTML no los carga (Inter en el source es coincidencia de strings, no la fuente).

## Alineación de marca

A favor: verdes profundos + oro, botella como protagonista, sin clichés, sin rostros IA, sin claim de DO.

En contra:

- Paleta de docs (`#224036` / `#D4AF37` / crema) vs. tokens web (`#062F3C` / `#D6AA4C`). El código web es la fuente a seguir hasta unificar.
- Tipografía de sistema, no editorial.
- Home no cuenta Mala.
- Age-gate solo en local; el live de alcohol no pregunta 18+.
- Dominio canónico no sirve la tienda.

## Lo que se implementó en esta pasada (local)

Ver sección de entrega. No se pusheó. No se tocó copy de DO. No se rediseñó el home (fuera de alcance: el pedido era optimizar/revisar + comprobante en el flujo actual).

## Backlog que no se envía ahora

Prioridad alta

1. Apuntar `almamala.com` al PMV (o redirigir) y sacar el coming soon de Squarespace.
2. Deploy del age-gate (`33d3d50`) + número canónico + este flujo de comprobante.
3. Reemplazar lorem de términos, privacidad, FAQ y libro de reclamaciones. Ocultar Gift card / Diversidad si no existen.
4. Subir `metatag.png` (1200×630) y un favicon.
5. Quitar los `fetch('http://127.0.0.1:7243/ingest/…')` de `PiscoTabs`, `ProductosList` y `app/error.tsx`.
6. Incluir el descuento de botellas retornables en `payload.total` (hoy el WhatsApp y el API mienten distinto).

Prioridad media

7. Hero corto en la home actual (una bajada + origen), sin armar un segundo sitio.
8. Comprimir/exportar botellas a WebP (~80–120 KB) y aligerar el SVG del logo; `Cache-Control` largo en `/images`.
9. Playfair + Inter, o decidir que el PMV se queda en sistema.
10. Formulario de retiro: solo nombre, celular, email; dirección cuando hay envío.
11. Notas sensoriales sin clamp, o “ver más”.
12. Fotos por SKU desde el banco `AM/` (no clips de IA).
13. Persistencia real de pedidos (Supabase o mailbox), no `console.log`.

Prioridad baja / más adelante

14. Cupones de verdad o sacar el campo.
15. i18n NL/EN cuando exista operación en Países Bajos.
16. Unificar paleta docs vs. web.
17. Google Maps: la key va en `NEXT_PUBLIC_` (expuesta). Restringir por referrer o diferir el mapa.
18. Borrar `CheckoutSummary.tsx` si ya no se usa.
19. Validar `distrito` en el paso 2 (el tipo lo pide; el validador a veces no).
