# PR4: Textos del Carrito

## Nombre del PR
**Textos del Carrito - Implementación Exacta de Textos según textocarrito.md**

## Objetivo del PR
Implementar exactamente los textos definidos en `textocarrito.md` en la interfaz del carrito y checkout. Este PR asegura que todos los mensajes, opciones y textos informativos coincidan palabra por palabra con la documentación, garantizando consistencia en la comunicación con el usuario.

**Qué habilita:**
- UI del carrito con textos oficiales y consistentes
- Opciones de entrega claramente definidas
- Campo de cupón preparado para futuras promociones
- Mensajes informativos que guían al usuario
- Base para el proceso de checkout (PR7)

## Qué se implementa

### Textos de Totales del Carrito
1. **Sección de Totales**
   - Título: "Totales del carrito"
   - **Subtotal**
     - Etiqueta: "Subtotal"
     - Descripción: "Monto total de los productos seleccionados."
   - **Envío**
     - Etiqueta: "Envío"
     - Descripción: "Selecciona una opción de entrega para tu pedido."
   - **Total**
     - Etiqueta: "Total"
     - Descripción: "Monto final del pedido."

### Opciones de Entrega
1. **Tres Opciones de Entrega** (según `textocarrito.md`)
   
   **Opción 1: Envío regular**
   - Título: "Envío regular (3–7 días hábiles)"
   - Descripción: "Entrega estándar dentro del plazo indicado. Disponible de lunes a viernes."
   - Valor: `"regular"` o similar para identificar en el payload
   
   **Opción 2: Envío gratuito**
   - Título: "Envío gratuito (3–7 días hábiles)"
   - Descripción: "Entrega sin costo adicional dentro del plazo indicado. Disponible de lunes a viernes."
   - Valor: `"gratuito"` o similar
   
   **Opción 3: Retiro en oficina**
   - Título: "Retiro en oficina"
   - Descripción completa: "Recoge tu pedido directamente en nuestra oficina una vez confirmado el pago. El retiro estará disponible en un plazo máximo de 48 horas después de la verificación del depósito. Recibirás un mensaje de confirmación por WhatsApp antes de acercarte."
   - Valor: `"retiro"` o similar

2. **Componente de Selección**
   - Radio buttons o select para elegir opción de entrega
   - Cada opción muestra título y descripción exactos del MD
   - Diseño mobile-first y accesible
   - Por defecto: ninguna opción seleccionada (o primera opción)

### Campo de Código de Cupón
1. **Sección de Cupón**
   - Título: "Código de cupón"
   - Label del campo: "Código de cupón"
   - Descripción: "Campo opcional para aplicar descuentos promocionales."
   - Botón: "Aplicar cupón"
   - Nota: "(Opción disponible para futuras promociones.)"

2. **Implementación UI**
   - Input de texto para código de cupón
   - Botón "Aplicar cupón"
   - Campo opcional (no requerido)
   - **NO incluye lógica de validación o descuentos** (solo UI)

### Finalización del Pedido
1. **Botón Principal**
   - Texto del botón: "Finalizar pedido en WhatsApp"
   - Ubicado en la sección de checkout/resumen

2. **Texto Informativo al Continuar**
   - "Al continuar:"
   - Lista de información:
     - "Tu pedido será enviado automáticamente a nuestro WhatsApp con el detalle completo."
     - "El proceso de pago se completará por WhatsApp."
     - "El depósito deberá enviarse por WhatsApp para validar y confirmar el pedido."

### Mensajes Informativos
1. **Mensaje Principal**
   - Texto: "Tu pedido será atendido por WhatsApp"
   - Descripción: "Una vez enviado el pedido, coordinaremos contigo el pago y la entrega directamente por WhatsApp."

2. **Mensaje de Confirmación**
   - Título: "Confirmación del pedido"
   - Texto: "Tu pedido será confirmado una vez que recibamos el comprobante de depósito por WhatsApp."

3. **Nota Operativa**
   - Texto: "Los pedidos se procesan una vez confirmado el depósito."
   - Texto adicional: "Los tiempos de entrega comienzan a contarse desde la confirmación del pago."

### Componentes UI
1. **Componente CheckoutSummary**
   - Muestra totales con textos exactos
   - Incluye selección de envío
   - Campo de cupón
   - Botón de finalización

2. **Componente ShippingOptions**
   - Radio group con las 3 opciones de entrega
   - Cada opción con título y descripción exactos
   - Estado seleccionado guardado en estado del carrito/checkout

3. **Componente CouponField**
   - Input y botón para cupón
   - Textos exactos del MD
   - Sin lógica de validación (solo UI)

4. **Componente InfoMessages**
   - Muestra mensajes informativos según el MD
   - Puede ser collapsible o siempre visible
   - Diseño claro y legible

### Actualización del Resumen del Carrito
1. **CartSummary Actualizado**
   - Incluye sección de envío (aunque costo sea 0 por ahora)
   - Muestra total con envío seleccionado
   - Textos exactos del MD

2. **Estado del Checkout**
   - Guardar opción de envío seleccionada
   - Guardar código de cupón (aunque no se valide)
   - Preparar para enviar en orderPayload (PR5)

## Qué NO se implementa

- Lógica de cálculo de costo de envío (solo UI, costo = 0)
- Validación de códigos de cupón
- Aplicación de descuentos
- Lógica de procesamiento de cupones
- Integración con APIs de envío
- Cálculo de tiempos de entrega dinámicos
- Proceso de checkout completo (solo UI y textos)
- Envío del pedido a WhatsApp (PR7)
- Validación de datos del pedido (PR5)

## Archivos afectados / creados

### Tipos TypeScript
- `types/checkout.ts` - Tipos para opciones de envío y cupón:
  ```typescript
  type ShippingOption = 'regular' | 'gratuito' | 'retiro';
  
  type CheckoutData = {
    shippingOption: ShippingOption | null;
    couponCode: string | null;
  }
  ```

### Componentes Nuevos
- `components/checkout/CheckoutSummary.tsx` - Resumen completo del checkout
- `components/checkout/ShippingOptions.tsx` - Opciones de entrega con textos exactos
- `components/checkout/CouponField.tsx` - Campo de cupón (solo UI)
- `components/checkout/InfoMessages.tsx` - Mensajes informativos
- `components/checkout/CheckoutButton.tsx` - Botón "Finalizar pedido en WhatsApp"

### Actualizaciones de Componentes Existentes
- `components/cart/CartSummary.tsx` - Actualizar con textos exactos del MD
- `contexts/CartContext.tsx` - Agregar estado para shippingOption y couponCode

### Constantes de Textos
- `lib/texts.ts` o `constants/texts.ts` - Constantes con todos los textos del MD:
  ```typescript
  export const CART_TEXTS = {
    totals: { ... },
    shipping: { ... },
    coupon: { ... },
    checkout: { ... },
    messages: { ... }
  }
  ```

### Páginas
- `app/carrito/page.tsx` o `app/checkout/page.tsx` - Página de checkout con todos los componentes
- O actualizar página existente del carrito

## Checklist de verificación manual

### Textos Exactos
- [ ] Verificar que "Totales del carrito" aparece exactamente así
- [ ] Confirmar que "Subtotal" tiene descripción: "Monto total de los productos seleccionados."
- [ ] Verificar que "Envío" tiene descripción: "Selecciona una opción de entrega para tu pedido."
- [ ] Confirmar que "Total" tiene descripción: "Monto final del pedido."

### Opciones de Entrega
- [ ] Verificar texto exacto: "Envío regular (3–7 días hábiles)"
- [ ] Confirmar descripción exacta: "Entrega estándar dentro del plazo indicado. Disponible de lunes a viernes."
- [ ] Verificar texto exacto: "Envío gratuito (3–7 días hábiles)"
- [ ] Confirmar descripción exacta: "Entrega sin costo adicional dentro del plazo indicado. Disponible de lunes a viernes."
- [ ] Verificar texto exacto: "Retiro en oficina"
- [ ] Confirmar descripción completa exacta (3 líneas según MD)
- [ ] Verificar que se puede seleccionar una opción de envío
- [ ] Confirmar que solo se puede seleccionar una opción a la vez

### Campo de Cupón
- [ ] Verificar título: "Código de cupón"
- [ ] Confirmar label del campo: "Código de cupón"
- [ ] Verificar descripción: "Campo opcional para aplicar descuentos promocionales."
- [ ] Confirmar texto del botón: "Aplicar cupón"
- [ ] Verificar nota: "(Opción disponible para futuras promociones.)"
- [ ] Confirmar que el campo es opcional (no requerido)
- [ ] Verificar que se puede escribir en el campo
- [ ] Confirmar que el botón "Aplicar cupón" existe (aunque no haga nada aún)

### Botón de Finalización
- [ ] Verificar texto exacto del botón: "Finalizar pedido en WhatsApp"
- [ ] Confirmar que aparece el texto "Al continuar:"
- [ ] Verificar los 3 puntos informativos exactos:
  - [ ] "Tu pedido será enviado automáticamente a nuestro WhatsApp con el detalle completo."
  - [ ] "El proceso de pago se completará por WhatsApp."
  - [ ] "El depósito deberá enviarse por WhatsApp para validar y confirmar el pedido."

### Mensajes Informativos
- [ ] Verificar mensaje: "Tu pedido será atendido por WhatsApp"
- [ ] Confirmar descripción: "Una vez enviado el pedido, coordinaremos contigo el pago y la entrega directamente por WhatsApp."
- [ ] Verificar título: "Confirmación del pedido"
- [ ] Confirmar texto: "Tu pedido será confirmado una vez que recibamos el comprobante de depósito por WhatsApp."
- [ ] Verificar nota operativa: "Los pedidos se procesan una vez confirmado el depósito."
- [ ] Confirmar texto adicional: "Los tiempos de entrega comienzan a contarse desde la confirmación del pago."

### Funcionalidad UI
- [ ] Verificar que se puede seleccionar una opción de envío
- [ ] Confirmar que la selección se guarda en el estado
- [ ] Verificar que se puede escribir código de cupón
- [ ] Confirmar que el campo de cupón es opcional
- [ ] Verificar que el botón "Finalizar pedido" está presente (aunque no funcione aún)
- [ ] Confirmar que los totales se muestran correctamente

### Diseño Mobile
- [ ] Verificar que todos los textos son legibles en móvil
- [ ] Confirmar que las opciones de envío son fáciles de seleccionar en touch
- [ ] Verificar que el campo de cupón es fácil de usar en móvil
- [ ] Confirmar que no hay overflow horizontal
- [ ] Verificar que el diseño es claro y organizado

### Comparación con MD
- [ ] Comparar palabra por palabra con `textocarrito.md`
- [ ] Verificar que no hay textos inventados o diferentes
- [ ] Confirmar que todos los textos del MD están implementados
- [ ] Verificar que no faltan textos importantes

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ Todos los textos coinciden exactamente con `textocarrito.md`
2. ✅ Las tres opciones de entrega están implementadas con textos exactos
3. ✅ El campo de cupón está presente con textos exactos (solo UI)
4. ✅ El botón "Finalizar pedido en WhatsApp" tiene el texto exacto
5. ✅ Todos los mensajes informativos están presentes con textos exactos
6. ✅ La UI es mobile-first y funcional
7. ✅ Se puede seleccionar opción de envío y guardar en estado
8. ✅ Se puede escribir código de cupón (aunque no se valide)
9. ✅ No hay textos inventados o diferentes al MD
10. ✅ La comparación palabra por palabra con el MD es exitosa

**Criterio de éxito:** Un revisor puede abrir `textocarrito.md` y la UI del carrito/checkout, y verificar que cada texto coincide exactamente palabra por palabra, sin excepciones ni textos adicionales inventados.



