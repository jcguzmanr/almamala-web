# PR5: Construcción del Pedido

## Nombre del PR
**Construcción del Pedido - orderPayload y Validación**

## Objetivo del PR
Implementar la construcción del `orderPayload` estructurado que contiene toda la información del pedido, validando que los datos sean correctos antes de enviarlos al backend y WhatsApp. Este PR prepara los datos del carrito y checkout en el formato requerido para el registro y envío.

**Qué habilita:**
- Transformación del estado del carrito en payload estructurado
- Validación de datos antes de enviar
- Preparación de datos para backend (PR6)
- Preparación de datos para mensaje WhatsApp (PR7)
- Base para tracking y registro de pedidos

## Qué se implementa

### Tipo orderPayload
1. **Estructura del Payload** (según brief.md)
   ```typescript
   type OrderPayload = {
     orderId?: string;        // Generado en backend, opcional aquí
     items: OrderItem[];      // Productos del carrito
     subtotal: number;        // Subtotal sin envío
     shipping: {
       option: ShippingOption; // 'regular' | 'gratuito' | 'retiro'
       cost: number;          // Costo de envío (0 en PMV)
     };
     total: number;           // Total final
     coupon?: {
       code: string | null;   // Código de cupón si aplica
       discount: number;      // Descuento aplicado (0 en PMV)
     };
     metadata: {
       createdAt: string;     // Timestamp ISO
       userAgent?: string;    // Opcional para analytics
     };
   }
   
   type OrderItem = {
     productoId: string;      // Identificador del producto
     tipoPisco: string;       // Italia, Quebranta, Mosto Verde, Damajuana
     categoria: string;       // Categoría del producto
     volumen: string;         // 500 ML, 750 ML, etc.
     precio: number;          // Precio unitario
     cantidad: number;        // Cantidad
     subtotal: number;        // precio × cantidad
   }
   ```

2. **Tipos Relacionados**
   - `ShippingOption` ya definido en PR4
   - Tipos helper para validación

### Función de Construcción
1. **Función `buildOrderPayload()`**
   - Parámetros:
     - `cartItems: CartItem[]` - Items del carrito
     - `shippingOption: ShippingOption | null` - Opción de envío seleccionada
     - `couponCode: string | null` - Código de cupón (opcional)
   - Retorna: `OrderPayload` completo y validado
   - Lógica:
     - Transforma `CartItem[]` a `OrderItem[]`
     - Calcula subtotal sumando todos los items
     - Calcula costo de envío (0 en PMV, pero estructura preparada)
     - Calcula descuento de cupón (0 en PMV)
     - Calcula total final
     - Agrega metadata (timestamp, etc.)

2. **Transformación de Datos**
   - Mapeo de `CartItem` a `OrderItem`
   - Cálculo de subtotales por item
   - Formateo de números (redondeo a 2 decimales)
   - Generación de timestamps ISO

### Validación
1. **Función `validateOrderPayload()`**
   - Valida que el payload tenga estructura correcta
   - Validaciones:
     - `items` no está vacío
     - Cada item tiene todos los campos requeridos
     - `subtotal` coincide con suma de items
     - `total` coincide con subtotal + shipping - discount
     - `shipping.option` es válido si está presente
     - Números son positivos y válidos
     - Cantidades son enteros positivos
   - Retorna: `{ valid: boolean, errors: string[] }`

2. **Validaciones Específicas**
   - Carrito no vacío
   - Opción de envío seleccionada (requerida)
   - Precios válidos (números positivos)
   - Cantidades válidas (enteros >= 1)
   - Cálculos matemáticos correctos

### Funciones Helper
1. **Cálculos**
   - `calculateItemsSubtotal(items: OrderItem[]): number`
   - `calculateShippingCost(option: ShippingOption): number` (retorna 0 en PMV)
   - `calculateCouponDiscount(code: string | null): number` (retorna 0 en PMV)
   - `calculateTotal(subtotal: number, shipping: number, discount: number): number`

2. **Utilidades**
   - `formatOrderItem(item: CartItem): OrderItem`
   - `generateOrderMetadata(): OrderMetadata`
   - `roundToTwoDecimals(value: number): number`

### Integración con Carrito
1. **Hook o Función de Uso**
   - Función `useOrderBuilder()` o similar
   - O función directa que se llama desde checkout
   - Toma datos del `CartContext` y `CheckoutData`
   - Retorna payload listo para enviar

2. **Preparación para Envío**
   - Payload listado para `POST /api/orders` (PR6)
   - Payload formateado para mensaje WhatsApp (PR7)
   - Validación antes de permitir continuar

### Manejo de Errores
1. **Errores de Validación**
   - Mensajes claros si el payload no es válido
   - Prevenir envío si hay errores
   - Mostrar errores al usuario si es necesario

2. **Casos Edge**
   - Carrito vacío
   - Opción de envío no seleccionada
   - Datos corruptos del carrito
   - Cálculos incorrectos

## Qué NO se implementa

- Envío real al backend (PR6)
- Generación de orderId (se hace en backend, PR6)
- Integración con WhatsApp (PR7)
- Persistencia del payload (solo construcción)
- UI de errores avanzada (solo validación básica)
- Lógica de cálculo de envío real (solo estructura)
- Lógica de descuentos de cupón (solo estructura)
- Base de datos o almacenamiento
- Tracking de estados del pedido

## Archivos afectados / creados

### Tipos TypeScript
- `types/order.ts` - Tipos `OrderPayload`, `OrderItem`, `OrderMetadata`
- `types/index.ts` - Exportación de tipos (actualizado)

### Funciones de Construcción
- `lib/order-builder.ts` - Función principal `buildOrderPayload()`
- `lib/order-validator.ts` - Función `validateOrderPayload()`
- `lib/order-helpers.ts` - Funciones helper de cálculos y transformaciones

### Hooks (Opcional)
- `hooks/useOrderBuilder.ts` - Hook para construir payload desde componentes
- O funciones directas sin hook

### Tests (Opcional pero recomendado)
- `__tests__/order-builder.test.ts` - Tests unitarios para construcción
- `__tests__/order-validator.test.ts` - Tests para validación

### Actualizaciones
- `components/checkout/CheckoutButton.tsx` - Usar `buildOrderPayload()` antes de habilitar botón
- `contexts/CartContext.tsx` - Posible método `buildOrder()` que use las funciones

## Checklist de verificación manual

### Construcción del Payload
- [ ] Verificar que `buildOrderPayload()` retorna estructura correcta
- [ ] Confirmar que todos los campos requeridos están presentes
- [ ] Verificar que los items se transforman correctamente de `CartItem` a `OrderItem`
- [ ] Confirmar que el subtotal se calcula correctamente
- [ ] Verificar que el total se calcula correctamente (subtotal + shipping - discount)
- [ ] Confirmar que el metadata incluye timestamp

### Validación
- [ ] Verificar que `validateOrderPayload()` detecta carrito vacío
- [ ] Confirmar que detecta opción de envío faltante
- [ ] Verificar que valida estructura de items
- [ ] Confirmar que valida cálculos matemáticos
- [ ] Verificar que retorna errores claros y específicos
- [ ] Confirmar que payload válido pasa todas las validaciones

### Cálculos
- [ ] Verificar que subtotal por item = precio × cantidad
- [ ] Confirmar que subtotal total = suma de subtotales de items
- [ ] Verificar que shipping cost = 0 (en PMV)
- [ ] Confirmar que coupon discount = 0 (en PMV)
- [ ] Verificar que total = subtotal + shipping - discount
- [ ] Confirmar que los números se redondean a 2 decimales
- [ ] Verificar que no hay errores de precisión flotante

### Integración con Carrito
- [ ] Verificar que se puede construir payload desde items del carrito
- [ ] Confirmar que se incluye opción de envío seleccionada
- [ ] Verificar que se incluye código de cupón si existe
- [ ] Confirmar que el payload se actualiza si cambia el carrito
- [ ] Verificar que el payload se actualiza si cambia opción de envío

### Casos Edge
- [ ] Probar con carrito vacío (debe fallar validación)
- [ ] Probar sin opción de envío seleccionada (debe fallar validación)
- [ ] Probar con muchos items en el carrito
- [ ] Probar con precios muy altos o muy bajos
- [ ] Probar con cantidades grandes
- [ ] Verificar que maneja datos corruptos del carrito

### TypeScript
- [ ] Verificar que no hay errores de TypeScript
- [ ] Confirmar que los tipos están correctamente definidos
- [ ] Verificar que no hay `any` implícitos
- [ ] Confirmar que el autocompletado funciona correctamente

### Estructura del Payload
- [ ] Verificar que el payload tiene la estructura esperada por el brief
- [ ] Confirmar que incluye todos los campos mencionados en el brief:
  - [ ] Productos
  - [ ] Presentaciones
  - [ ] Cantidades
  - [ ] Total
  - [ ] (orderId se agregará en backend)
- [ ] Verificar que el formato es JSON serializable

### Preparación para Backend
- [ ] Verificar que el payload se puede serializar a JSON
- [ ] Confirmar que el payload está listo para `POST /api/orders`
- [ ] Verificar que no hay datos sensibles o innecesarios
- [ ] Confirmar que el formato es el esperado por el backend (según brief)

### Preparación para WhatsApp
- [ ] Verificar que el payload contiene toda la info necesaria para mensaje
- [ ] Confirmar que los datos están en formato legible
- [ ] Verificar que se puede acceder fácilmente a productos, cantidades, total

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ La función `buildOrderPayload()` construye payload correctamente
2. ✅ El payload tiene la estructura definida en el brief
3. ✅ La validación detecta todos los casos inválidos
4. ✅ Los cálculos matemáticos son correctos (subtotal, total)
5. ✅ El payload se puede construir desde el estado del carrito
6. ✅ El payload incluye opción de envío y cupón (si aplica)
7. ✅ El payload es JSON serializable y está listo para backend
8. ✅ Los tipos TypeScript están correctos y no hay errores
9. ✅ El payload contiene toda la información necesaria para WhatsApp
10. ✅ Se manejan correctamente los casos edge (carrito vacío, etc.)

**Criterio de éxito:** Un desarrollador puede llamar `buildOrderPayload(cartItems, shippingOption, couponCode)` y obtener un objeto `OrderPayload` válido, serializable y listo para enviar al backend y formatear para WhatsApp, con todas las validaciones pasando correctamente.



