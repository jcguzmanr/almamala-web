# PR3: Carrito de Compras

## Nombre del PR
**Carrito de Compras - Estado, Persistencia y Resumen**

## Objetivo del PR
Implementar el sistema de carrito de compras que permite a los usuarios agregar productos con diferentes presentaciones, actualizar cantidades, y mantener el estado persistente en localStorage. Este PR habilita la funcionalidad core de selección de productos antes del checkout.

**Qué habilita:**
- Agregar productos al carrito desde el catálogo
- Gestionar múltiples presentaciones del mismo producto
- Persistencia del carrito entre sesiones
- Cálculo automático de subtotales y totales
- Base para el proceso de checkout (PRs siguientes)

## Qué se implementa

### Tipos TypeScript
1. **Tipos del Carrito**
   - Tipo `CartItem` que representa un item en el carrito:
     ```typescript
     type CartItem = {
       productoId: string; // Identificador único del producto
       tipoPisco: string;  // Italia, Quebranta, Mosto Verde, Damajuana
       categoria: string;  // Categoría del producto
       volumen: string;    // 500 ML, 750 ML, Italia, Mosto Verde, Quebranta (para damajuanas)
       precio: number;     // Precio numérico (extraído de "S/ XX")
       cantidad: number;   // Cantidad seleccionada
       imagen: string;     // Nombre de la imagen
     }
     ```
   - Tipo `Cart` para el estado completo del carrito
   - Funciones helper para convertir precio de string a number

### Estado del Carrito (Context API)
1. **CartContext y CartProvider**
   - Context React para estado global del carrito
   - Provider que envuelve la aplicación
   - Hook `useCart()` para acceder al carrito desde componentes

2. **Funcionalidades del Context**
   - `addItem(item: CartItem)` - Agregar producto al carrito
   - `removeItem(productoId: string, volumen: string)` - Remover item específico
   - `updateQuantity(productoId: string, volumen: string, cantidad: number)` - Actualizar cantidad
   - `clearCart()` - Vaciar carrito completamente
   - `getTotal()` - Calcular total del carrito
   - `getSubtotal()` - Calcular subtotal (sin envío)
   - `getItemCount()` - Obtener cantidad total de items

3. **Lógica de Agregado**
   - Si el mismo producto con la misma presentación ya existe, incrementar cantidad
   - Si es diferente presentación del mismo producto, agregar como item separado
   - Validación de cantidades (mínimo 1, máximo razonable)

### Persistencia en localStorage
1. **Sincronización con localStorage**
   - Al agregar/quitar/actualizar items, guardar en `localStorage`
   - Clave: `'alma-mala-cart'` o similar
   - Al cargar la app, leer desde `localStorage` y restaurar estado
   - Manejo de errores si localStorage no está disponible (modo incógnito, etc.)

2. **Serialización**
   - Guardar carrito como JSON string
   - Validar estructura al leer desde localStorage
   - Limpiar datos corruptos si es necesario

### Componentes UI
1. **Componente Carrito (Cart)**
   - Componente principal que muestra items del carrito
   - Lista de items con opciones de editar cantidad y eliminar
   - Resumen de totales (subtotal, total)
   - Diseño mobile-first
   - Puede ser un drawer/sidebar o página completa

2. **Componente CartItem**
   - Muestra información de un item individual:
     - Tipo de pisco y volumen
     - Precio unitario
     - Cantidad (con controles +/-)
     - Subtotal del item (precio × cantidad)
     - Botón para eliminar
   - Diseño compacto para móvil

3. **Controles de Cantidad**
   - Botones +/- para incrementar/decrementar
   - Input numérico para editar directamente
   - Validación: mínimo 1, máximo razonable
   - Feedback visual al cambiar cantidad

4. **Resumen del Carrito**
   - Componente `CartSummary` que muestra:
     - Subtotal (suma de todos los items)
     - Total (subtotal + envío, pero envío será 0 en este PR)
   - Preparado para mostrar envío en PR4

5. **Botón/Icono del Carrito**
   - Indicador visual del carrito (icono + badge con cantidad)
   - Ubicado en header/navbar
   - Muestra cantidad total de items
   - Abre/cierra el carrito

### Integración con Catálogo
1. **Botones "Agregar al Carrito"**
   - Agregar botón en cada presentación del catálogo (PR2)
   - Al hacer click, agregar item al carrito
   - Feedback visual (toast, animación, etc.)
   - Actualizar badge del carrito

2. **Estado Visual**
   - Indicar cuando un producto está en el carrito
   - Mostrar cantidad actual si ya está agregado

### Cálculos
1. **Funciones de Cálculo**
   - `calculateSubtotal(items: CartItem[])` - Suma de precio × cantidad
   - `calculateTotal(subtotal: number, shipping: number)` - Subtotal + envío
   - Manejo de decimales (redondeo a 2 decimales)
   - Formateo de precios para mostrar (S/ XX.XX)

## Qué NO se implementa

- Opciones de envío o cálculo de envío (PR4)
- Campo de cupón o descuentos (PR4)
- Proceso de checkout o finalización de pedido (PR7)
- Validación de stock o disponibilidad
- Límites de compra por producto
- Múltiples carritos o listas de deseos
- Compartir carrito
- Guardar carrito en cuenta de usuario
- Historial de carritos anteriores

## Archivos afectados / creados

### Tipos TypeScript
- `types/cart.ts` - Tipos para CartItem y Cart
- `types/index.ts` - Exportación de tipos (actualizado)

### Context y Estado
- `contexts/CartContext.tsx` - Context y Provider del carrito
- `hooks/useCart.ts` - Hook personalizado para usar el carrito (opcional, puede estar en Context)

### Utilidades
- `lib/cart.ts` - Funciones helper:
  - `parsePrice(priceString: string): number` - Convertir "S/ 22" a 22
  - `formatPrice(price: number): string` - Convertir 22 a "S/ 22.00"
  - `calculateSubtotal(items: CartItem[]): number`
  - `saveCartToStorage(cart: CartItem[]): void`
  - `loadCartFromStorage(): CartItem[] | null`

### Componentes
- `components/cart/Cart.tsx` - Componente principal del carrito
- `components/cart/CartItem.tsx` - Item individual del carrito
- `components/cart/CartSummary.tsx` - Resumen con totales
- `components/cart/CartButton.tsx` - Botón/icono del carrito con badge
- `components/cart/QuantityControls.tsx` - Controles +/- de cantidad (opcional)

### Actualizaciones de Componentes Existentes
- `components/productos/ProductoCard.tsx` - Agregar botón "Agregar al carrito"
- `components/productos/PresentacionItem.tsx` - Agregar funcionalidad de agregar al carrito
- `app/layout.tsx` - Envolver con CartProvider

## Checklist de verificación manual

### Funcionalidad Básica
- [ ] Verificar que se puede agregar un producto al carrito desde el catálogo
- [ ] Confirmar que el badge del carrito muestra la cantidad correcta
- [ ] Verificar que se pueden agregar múltiples productos diferentes
- [ ] Confirmar que se pueden agregar diferentes presentaciones del mismo producto
- [ ] Verificar que si se agrega la misma presentación dos veces, se incrementa la cantidad

### Gestión de Cantidades
- [ ] Verificar que los botones +/- funcionan correctamente
- [ ] Confirmar que el input numérico permite editar cantidad directamente
- [ ] Verificar que no se puede poner cantidad menor a 1
- [ ] Confirmar que al llegar a cantidad 0, se elimina el item (o previene llegar a 0)
- [ ] Verificar que el subtotal del item se actualiza al cambiar cantidad

### Eliminación de Items
- [ ] Verificar que el botón eliminar remueve el item del carrito
- [ ] Confirmar que el badge del carrito se actualiza al eliminar
- [ ] Verificar que se puede eliminar todos los items
- [ ] Confirmar que el carrito vacío se muestra correctamente

### Cálculos
- [ ] Verificar que el subtotal se calcula correctamente (suma de precio × cantidad)
- [ ] Confirmar que el total es igual al subtotal (sin envío aún)
- [ ] Verificar que los cálculos se actualizan al agregar/quitar items
- [ ] Confirmar que los precios se muestran con formato correcto (S/ XX.XX)
- [ ] Verificar que no hay errores de redondeo

### Persistencia localStorage
- [ ] Agregar items al carrito
- [ ] Recargar la página (F5)
- [ ] Verificar que los items se mantienen después de recargar
- [ ] Confirmar que las cantidades se mantienen correctamente
- [ ] Verificar que funciona en modo incógnito (si localStorage está disponible)
- [ ] Probar en diferentes navegadores

### UI/UX Mobile
- [ ] Verificar que el carrito se ve bien en móvil
- [ ] Confirmar que los controles de cantidad son fáciles de usar en touch
- [ ] Verificar que el carrito es accesible y fácil de abrir/cerrar
- [ ] Confirmar que el diseño es claro y legible
- [ ] Verificar que no hay overflow horizontal

### Integración con Catálogo
- [ ] Verificar que los botones "Agregar al carrito" funcionan desde el catálogo
- [ ] Confirmar que hay feedback visual al agregar (toast, animación, etc.)
- [ ] Verificar que el badge del carrito se actualiza inmediatamente
- [ ] Confirmar que se puede agregar desde diferentes productos

### Casos Edge
- [ ] Probar con carrito muy grande (muchos items)
- [ ] Verificar comportamiento si localStorage está lleno
- [ ] Probar agregar el mismo producto múltiples veces rápidamente
- [ ] Verificar que no hay race conditions en actualizaciones
- [ ] Confirmar que el carrito se limpia correctamente al usar `clearCart()`

### TypeScript
- [ ] Verificar que no hay errores de TypeScript
- [ ] Confirmar que los tipos están correctamente definidos
- [ ] Verificar que no hay `any` implícitos

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ Los usuarios pueden agregar productos al carrito desde el catálogo
2. ✅ Se pueden agregar múltiples presentaciones del mismo producto
3. ✅ Las cantidades se pueden actualizar correctamente (botones +/- e input)
4. ✅ Los items se pueden eliminar del carrito
5. ✅ El subtotal y total se calculan correctamente
6. ✅ El carrito persiste en localStorage entre sesiones
7. ✅ El badge del carrito muestra la cantidad correcta de items
8. ✅ La UI es mobile-first y funcional
9. ✅ No hay errores en consola
10. ✅ Los tipos TypeScript están correctos

**Criterio de éxito:** Un usuario puede navegar el catálogo, agregar varios productos con diferentes presentaciones al carrito, modificar cantidades, y al recargar la página el carrito se mantiene intacto con todos los cálculos correctos.



