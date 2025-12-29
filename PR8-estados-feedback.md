# PR8: Estados y Feedback

## Nombre del PR
**Estados y Feedback - Loading, Errores y Mensajes Informativos**

## Objetivo del PR
Implementar todos los estados de UI (loading, error, success) y mensajes informativos a lo largo del flujo completo, asegurando que el usuario siempre tenga feedback claro sobre lo que está pasando. Este PR completa la experiencia de usuario del PMV con una UX mínima pero completa.

**Qué habilita:**
- Feedback visual claro en todas las acciones
- Estados de loading durante operaciones asíncronas
- Manejo de errores con mensajes claros
- Mensajes de éxito y confirmación
- UX completa y profesional del PMV

## Qué se implementa

### Estados de Loading
1. **Loading durante Registro de Pedido**
   - Spinner o indicador visual cuando se llama a `/api/orders`
   - Deshabilitar botón "Finalizar pedido" durante loading
   - Mensaje opcional: "Procesando pedido..." o similar
   - Evitar múltiples clicks mientras procesa

2. **Loading en Otras Operaciones**
   - Agregar producto al carrito (feedback rápido, opcional)
   - Cargar catálogo (skeleton loaders o spinner)
   - Cualquier operación asíncrona que tome tiempo

3. **Componentes de Loading**
   - `components/ui/Spinner.tsx` o usar componente de shadcn/ui
   - `components/ui/LoadingButton.tsx` - Botón con estado de loading
   - Skeleton loaders para catálogo (opcional pero recomendado)

### Manejo de Errores
1. **Errores de Validación**
   - Carrito vacío: "Por favor agrega productos al carrito antes de finalizar"
   - Opción de envío no seleccionada: "Por favor selecciona una opción de entrega"
   - Validación de payload: Mensajes específicos según el error

2. **Errores del Backend**
   - Error 400 (validación): Mostrar mensaje del backend si está disponible
   - Error 500 (servidor): "Hubo un error al procesar tu pedido. Por favor intenta nuevamente."
   - Error de red: "No se pudo conectar con el servidor. Verifica tu conexión."
   - Timeout: "La operación está tardando demasiado. Por favor intenta nuevamente."

3. **Componentes de Error**
   - `components/ui/ErrorMessage.tsx` - Mensaje de error reutilizable
   - Toast notifications para errores (usar shadcn/ui toast o similar)
   - Alertas inline en formularios
   - Botón de reintentar cuando aplica

4. **Mensajes de Error Específicos**
   - Basados en los textos de `textocarrito.md` cuando aplica
   - Mensajes claros y accionables
   - No exponer detalles técnicos al usuario

### Estados de Éxito
1. **Éxito al Agregar al Carrito**
   - Toast o notificación: "Producto agregado al carrito"
   - Actualización visual del badge del carrito
   - Animación sutil (opcional)

2. **Éxito al Finalizar Pedido**
   - Mensaje antes de abrir WhatsApp: "Redirigiendo a WhatsApp..."
   - O mensaje después: "Pedido registrado correctamente. Abriendo WhatsApp..."
   - Feedback visual claro

3. **Componentes de Éxito**
   - Toast notifications para acciones exitosas
   - Mensajes de confirmación
   - Iconos de check o éxito visual

### Mensajes Informativos
1. **Mensajes según `textocarrito.md`**
   - "Tu pedido será atendido por WhatsApp"
   - "Una vez enviado el pedido, coordinaremos contigo el pago y la entrega directamente por WhatsApp."
   - "Confirmación del pedido"
   - "Tu pedido será confirmado una vez que recibamos el comprobante de depósito por WhatsApp."
   - "Los pedidos se procesan una vez confirmado el depósito."
   - "Los tiempos de entrega comienzan a contarse desde la confirmación del pago."

2. **Componentes Informativos**
   - `components/checkout/InfoMessages.tsx` - Mensajes informativos del checkout
   - Alertas informativas (usar shadcn/ui Alert)
   - Tooltips o ayuda contextual (opcional)

3. **Ubicación de Mensajes**
   - En la página de checkout/carrito
   - Visibles pero no intrusivos
   - Mobile-friendly (legibles en pantalla pequeña)

### Estados del Carrito
1. **Carrito Vacío**
   - Mensaje: "Tu carrito está vacío"
   - Botón o link para volver al catálogo
   - Ilustración o icono (opcional)

2. **Carrito con Items**
   - Mostrar resumen claro
   - Indicadores visuales de cantidad
   - Feedback al modificar cantidades

### Feedback Visual
1. **Animaciones Sutiles**
   - Transiciones al agregar/quitar productos
   - Animación del badge del carrito
   - Loading spinners suaves
   - No exagerar, mantener profesional

2. **Estados Visuales**
   - Botones deshabilitados claramente marcados
   - Campos con errores destacados visualmente
   - Estados hover y active claros
   - Feedback táctil en móvil

### Componentes de UI
1. **Toast/Notifications**
   - Usar shadcn/ui toast o implementar propio
   - Para errores, éxitos e información
   - Auto-dismiss después de unos segundos
   - Stack de múltiples toasts si es necesario

2. **Alertas**
   - Usar shadcn/ui Alert para mensajes informativos
   - Diferentes variantes (info, warning, error, success)
   - Cerrar manualmente o auto-dismiss

3. **Modales/Dialogs** (Opcional)
   - Para confirmaciones importantes
   - O para mostrar detalles adicionales

### Accesibilidad
1. **ARIA Labels**
   - Estados de loading con `aria-busy`
   - Mensajes de error con `role="alert"`
   - Botones deshabilitados con `aria-disabled`

2. **Navegación por Teclado**
   - Todos los elementos interactivos accesibles
   - Focus visible y claro
   - Orden lógico de tab

## Qué NO se implementa

- Sistema de notificaciones push
- Sonidos o feedback auditivo
- Animaciones complejas o pesadas
- Modales complejos o wizards
- Sistema de ayuda avanzado o tutoriales
- Tracking avanzado de interacciones
- Personalización de mensajes por usuario
- Internacionalización (i18n) avanzada

## Archivos afectados / creados

### Componentes de UI Base
- `components/ui/Spinner.tsx` - Spinner de loading (o usar shadcn)
- `components/ui/LoadingButton.tsx` - Botón con estado de loading
- `components/ui/ErrorMessage.tsx` - Mensaje de error reutilizable
- `components/ui/Toast.tsx` - Sistema de toasts (o usar shadcn/ui toast)
- `components/ui/Alert.tsx` - Alertas informativas (o usar shadcn/ui alert)

### Componentes de Feedback
- `components/feedback/CartEmpty.tsx` - Estado de carrito vacío
- `components/feedback/CheckoutMessages.tsx` - Mensajes informativos del checkout
- `components/feedback/ErrorBoundary.tsx` - Boundary para errores React (opcional)

### Hooks
- `hooks/useToast.ts` - Hook para mostrar toasts (si no usa shadcn)
- `hooks/useAsyncOperation.ts` - Hook genérico para operaciones async con estados

### Context/Provider
- `contexts/ToastContext.tsx` - Context para toasts (si no usa shadcn)

### Utilidades
- `lib/error-messages.ts` - Constantes de mensajes de error
- `lib/success-messages.ts` - Constantes de mensajes de éxito

### Actualizaciones de Componentes Existentes
- `components/checkout/CheckoutButton.tsx` - Agregar estados de loading/error
- `components/cart/Cart.tsx` - Agregar estado de carrito vacío
- `components/productos/ProductoCard.tsx` - Agregar feedback al agregar al carrito
- `app/layout.tsx` - Agregar ToastProvider si es necesario

## Checklist de verificación manual

### Estados de Loading
- [ ] Verificar que aparece spinner al hacer click en "Finalizar pedido"
- [ ] Confirmar que el botón se deshabilita durante loading
- [ ] Verificar que no se pueden hacer múltiples clicks
- [ ] Confirmar que el loading desaparece al terminar (éxito o error)
- [ ] Verificar loading en otras operaciones si aplica

### Manejo de Errores
- [ ] Probar con carrito vacío y verificar mensaje de error
- [ ] Probar sin opción de envío y verificar mensaje de error
- [ ] Probar con backend caído y verificar mensaje de error
- [ ] Probar con error de red y verificar mensaje apropiado
- [ ] Verificar que los mensajes de error son claros y accionables
- [ ] Confirmar que hay opción de reintentar cuando aplica
- [ ] Verificar que los errores se muestran en lugar visible

### Estados de Éxito
- [ ] Verificar toast al agregar producto al carrito
- [ ] Confirmar que el badge del carrito se actualiza
- [ ] Verificar mensaje de éxito al finalizar pedido
- [ ] Confirmar feedback visual claro en acciones exitosas

### Mensajes Informativos
- [ ] Verificar que aparecen los mensajes de `textocarrito.md`:
  - [ ] "Tu pedido será atendido por WhatsApp"
  - [ ] Descripción completa del proceso
  - [ ] "Confirmación del pedido"
  - [ ] Notas operativas
- [ ] Confirmar que los mensajes son legibles en móvil
- [ ] Verificar que no son intrusivos pero son visibles

### Carrito Vacío
- [ ] Verificar mensaje cuando el carrito está vacío
- [ ] Confirmar que hay forma de volver al catálogo
- [ ] Verificar que el diseño es claro y no confuso

### Feedback Visual
- [ ] Verificar que hay transiciones suaves en cambios de estado
- [ ] Confirmar que los botones deshabilitados se ven claramente
- [ ] Verificar que los campos con errores se destacan
- [ ] Confirmar que el feedback es profesional y no exagerado

### Toast/Notifications
- [ ] Verificar que los toasts aparecen correctamente
- [ ] Confirmar que se auto-dismiss después de unos segundos
- [ ] Verificar que múltiples toasts se apilan correctamente
- [ ] Confirmar que son accesibles y no bloquean la UI

### Accesibilidad
- [ ] Verificar que los estados de loading tienen `aria-busy`
- [ ] Confirmar que los mensajes de error tienen `role="alert"`
- [ ] Verificar navegación por teclado
- [ ] Confirmar que el focus es visible

### Flujo Completo
- [ ] Probar flujo completo desde catálogo hasta WhatsApp
- [ ] Verificar que hay feedback en cada paso:
  - [ ] Al agregar productos
  - [ ] Al modificar carrito
  - [ ] Al seleccionar envío
  - [ ] Al finalizar pedido
  - [ ] Al abrir WhatsApp
- [ ] Confirmar que el usuario siempre sabe qué está pasando

### Casos Edge
- [ ] Probar con conexión lenta (verificar que loading se muestra)
- [ ] Probar con múltiples errores seguidos
- [ ] Verificar que los estados se resetean correctamente
- [ ] Probar en diferentes navegadores
- [ ] Verificar en móvil y desktop

### Mobile-First
- [ ] Verificar que todos los mensajes son legibles en móvil
- [ ] Confirmar que los toasts no bloquean la UI en móvil
- [ ] Verificar que los botones son fáciles de tocar
- [ ] Confirmar que el feedback es claro en pantalla pequeña

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ Todos los estados de loading se muestran correctamente
2. ✅ Los errores se manejan con mensajes claros y accionables
3. ✅ Los estados de éxito dan feedback visual claro
4. ✅ Los mensajes informativos de `textocarrito.md` están presentes
5. ✅ El estado de carrito vacío se maneja correctamente
6. ✅ El feedback visual es profesional y no intrusivo
7. ✅ Los toasts/notificaciones funcionan correctamente
8. ✅ La accesibilidad básica está implementada
9. ✅ El usuario siempre sabe qué está pasando en cada paso
10. ✅ La UX es completa y profesional en todo el flujo

**Criterio de éxito:** Un usuario puede navegar todo el flujo (catálogo → carrito → checkout → WhatsApp) y en cada paso tiene feedback claro sobre lo que está pasando: loading durante operaciones, mensajes de error claros si algo falla, mensajes de éxito cuando algo funciona, y mensajes informativos que explican el proceso. La experiencia es fluida, profesional y sin fricciones innecesarias.



