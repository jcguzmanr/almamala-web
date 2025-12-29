# PR7: Checkout por WhatsApp

## Nombre del PR
**Checkout por WhatsApp - Generación de Mensaje y Apertura de WhatsApp**

## Objetivo del PR
Implementar la funcionalidad completa de checkout que construye el mensaje estructurado para WhatsApp, registra el pedido en el backend, y abre WhatsApp con el mensaje pre-llenado. Este PR completa el flujo principal del PMV, conectando el carrito con WhatsApp para finalizar la compra.

**Qué habilita:**
- Finalización completa del flujo de compra
- Mensaje estructurado y claro para WhatsApp
- Integración con registro de pedidos (PR6)
- Apertura automática de WhatsApp con mensaje listo
- Experiencia de usuario completa del PMV

## Qué se implementa

### Generación del Mensaje WhatsApp
1. **Función `buildWhatsAppMessage()`**
   - Parámetros:
     - `orderPayload: OrderPayload` - Payload completo del pedido
     - `orderId: string` - ID del pedido generado por backend
     - `whatsappNumber: string` - Número de WhatsApp (desde config o env)
   - Retorna: Mensaje formateado como string
   - Formato del mensaje según textos del brief y `textocarrito.md`

2. **Estructura del Mensaje**
   ```
   Hola, quiero hacer un pedido de Alma Mala.
   
   Pedido #AM-20241215-143022-a1b2
   
   Productos:
   • Pisco Italia - 500 ML x 2 = S/ 44.00
   • Pisco Quebranta - 750 ML x 1 = S/ 30.00
   • Mosto Verde - 500 ML x 1 = S/ 35.00
   
   Opción de entrega: Envío regular (3–7 días hábiles)
   
   Subtotal: S/ 109.00
   Total: S/ 109.00
   
   [Código de cupón: DESCUENTO10] (si aplica)
   
   Gracias!
   ```
   - Incluye saludo inicial
   - Incluye orderId
   - Lista todos los productos con formato claro
   - Muestra opción de envío seleccionada
   - Muestra subtotal y total
   - Incluye código de cupón si existe
   - Formato mobile-friendly (legible en WhatsApp)

3. **Formateo de Productos**
   - Cada producto en formato: `Tipo - Volumen x Cantidad = Subtotal`
   - Ejemplo: `Pisco Italia - 500 ML x 2 = S/ 44.00`
   - Lista ordenada y clara
   - Precios formateados con 2 decimales

### Integración con Registro de Pedido
1. **Flujo Completo**
   - Usuario hace click en "Finalizar pedido en WhatsApp"
   - Construir `orderPayload` (PR5)
   - Validar payload localmente
   - Llamar a `POST /api/orders` (PR6)
   - Recibir `orderId` del backend
   - Construir mensaje WhatsApp con `orderId`
   - Abrir WhatsApp con mensaje pre-llenado

2. **Manejo de Errores**
   - Si el registro falla, no abrir WhatsApp
   - Mostrar error al usuario
   - Permitir reintentar

### Apertura de WhatsApp
1. **Función `openWhatsApp()`**
   - Construye URL de WhatsApp: `https://wa.me/{numero}?text={mensajeEncoded}`
   - Codifica el mensaje correctamente (URL encoding)
   - Abre en nueva ventana/pestaña: `window.open(url, '_blank')`
   - O redirige: `window.location.href = url`

2. **Número de WhatsApp**
   - Leer desde configuración:
     - Variable de entorno: `NEXT_PUBLIC_WHATSAPP_NUMBER`
     - O archivo de configuración: `brand.json` (según brief)
   - Formato: número con código de país (ej: `51987654321` para Perú)
   - Sin espacios, guiones o caracteres especiales

3. **Codificación del Mensaje**
   - Usar `encodeURIComponent()` para codificar el mensaje
   - Manejar caracteres especiales correctamente
   - Asegurar que el mensaje completo cabe en la URL

### Componente de Checkout
1. **Actualización de `CheckoutButton`**
   - Manejar estado de loading durante registro
   - Deshabilitar botón mientras se procesa
   - Mostrar spinner o indicador de carga
   - Manejar éxito y error

2. **Flujo de Usuario**
   - Click en botón → Loading → Registro → WhatsApp abierto
   - Si error → Mostrar mensaje → Permitir reintentar
   - Feedback visual claro en cada paso

### Configuración
1. **Número de WhatsApp**
   - Variable de entorno: `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - O leer desde `brand.json` si existe
   - Validar que el número existe antes de abrir WhatsApp

2. **Texto de Saludo (Opcional)**
   - Puede ser configurable desde `brand.json`
   - O hardcodeado según textos del MD

### Utilidades
1. **Funciones Helper**
   - `formatProductForWhatsApp(item: OrderItem): string`
   - `formatPriceForWhatsApp(price: number): string`
   - `encodeWhatsAppMessage(message: string): string`
   - `buildWhatsAppURL(number: string, message: string): string`

## Qué NO se implementa

- Tracking de si el usuario realmente envió el mensaje
- Confirmación automática de recepción del mensaje
- Integración con API de WhatsApp Business
- Chatbot o respuestas automáticas
- Historial de mensajes enviados
- Múltiples números de WhatsApp
- Personalización avanzada del mensaje por usuario
- Envío automático del mensaje (solo abre WhatsApp)

## Archivos afectados / creados

### Utilidades
- `lib/whatsapp-message.ts` - Función `buildWhatsAppMessage()`
- `lib/whatsapp-utils.ts` - Funciones helper para formateo y URL
- `lib/checkout-flow.ts` - Función principal que orquesta el flujo completo

### Servicios
- `lib/api-client.ts` - Cliente para llamar a `/api/orders` (o usar fetch directamente)

### Componentes
- `components/checkout/CheckoutButton.tsx` - Actualizado con lógica completa
- `components/checkout/CheckoutFlow.tsx` - Componente que maneja el flujo (opcional)

### Configuración
- `.env.local.example` - Agregar `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `lib/config.ts` - Leer configuración de WhatsApp (o directamente desde env)

### Tipos
- `types/whatsapp.ts` - Tipos relacionados con WhatsApp (opcional)

## Checklist de verificación manual

### Generación del Mensaje
- [ ] Verificar que `buildWhatsAppMessage()` genera mensaje correcto
- [ ] Confirmar que el mensaje incluye orderId
- [ ] Verificar que lista todos los productos correctamente
- [ ] Confirmar que muestra opción de envío seleccionada
- [ ] Verificar que muestra subtotal y total correctos
- [ ] Confirmar que incluye código de cupón si existe
- [ ] Verificar formato del mensaje (legible y estructurado)
- [ ] Confirmar que el mensaje es mobile-friendly

### Formateo de Productos
- [ ] Verificar formato: "Tipo - Volumen x Cantidad = Subtotal"
- [ ] Confirmar que los precios tienen 2 decimales
- [ ] Verificar que la lista está ordenada y clara
- [ ] Confirmar que maneja productos con nombres largos

### Integración con Backend
- [ ] Verificar que se llama a `POST /api/orders` antes de abrir WhatsApp
- [ ] Confirmar que se espera la respuesta del backend
- [ ] Verificar que se usa el `orderId` recibido en el mensaje
- [ ] Confirmar que si el backend falla, no se abre WhatsApp
- [ ] Verificar manejo de errores del backend

### Apertura de WhatsApp
- [ ] Verificar que se construye la URL correctamente
- [ ] Confirmar formato: `https://wa.me/{numero}?text={mensaje}`
- [ ] Verificar que el mensaje está correctamente codificado (URL encoding)
- [ ] Confirmar que se abre en nueva ventana/pestaña
- [ ] Verificar que el mensaje aparece pre-llenado en WhatsApp
- [ ] Probar en móvil y desktop

### Número de WhatsApp
- [ ] Verificar que se lee desde variable de entorno o config
- [ ] Confirmar que el número tiene formato correcto (código de país)
- [ ] Verificar que funciona con diferentes formatos de número
- [ ] Confirmar que valida que el número existe

### Flujo Completo
- [ ] Agregar productos al carrito
- [ ] Seleccionar opción de envío
- [ ] (Opcional) Agregar código de cupón
- [ ] Click en "Finalizar pedido en WhatsApp"
- [ ] Verificar que aparece loading
- [ ] Confirmar que se registra el pedido en backend
- [ ] Verificar que se recibe orderId
- [ ] Confirmar que se abre WhatsApp con mensaje correcto
- [ ] Verificar que el mensaje contiene toda la información

### Manejo de Errores
- [ ] Probar con carrito vacío (debe mostrar error, no abrir WhatsApp)
- [ ] Probar sin opción de envío (debe mostrar error)
- [ ] Probar si backend está caído (debe mostrar error)
- [ ] Verificar que los mensajes de error son claros
- [ ] Confirmar que se puede reintentar después de error

### Estados de UI
- [ ] Verificar que el botón muestra loading durante registro
- [ ] Confirmar que el botón se deshabilita durante proceso
- [ ] Verificar que hay feedback visual claro
- [ ] Confirmar que los estados se manejan correctamente

### Casos Edge
- [ ] Probar con muchos productos en el carrito
- [ ] Probar con nombres de productos muy largos
- [ ] Probar con mensaje muy largo (verificar que WhatsApp lo acepta)
- [ ] Probar con caracteres especiales en nombres de productos
- [ ] Verificar que funciona en diferentes navegadores
- [ ] Probar en móvil y desktop

### Mensaje Final
- [ ] Verificar que el mensaje es profesional y claro
- [ ] Confirmar que incluye toda la información necesaria
- [ ] Verificar que el formato es consistente
- [ ] Confirmar que es fácil de leer en WhatsApp móvil

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ El mensaje de WhatsApp se genera correctamente con toda la información
2. ✅ El mensaje incluye el orderId del pedido registrado
3. ✅ Se registra el pedido en el backend antes de abrir WhatsApp
4. ✅ WhatsApp se abre con el mensaje pre-llenado correctamente
5. ✅ El mensaje contiene productos, cantidades, totales y opción de envío
6. ✅ El formato del mensaje es claro y profesional
7. ✅ Se manejan errores correctamente (no abre WhatsApp si falla registro)
8. ✅ Los estados de loading y error se muestran correctamente en UI
9. ✅ El flujo completo funciona de principio a fin
10. ✅ El número de WhatsApp se configura correctamente

**Criterio de éxito:** Un usuario puede agregar productos al carrito, seleccionar opción de envío, hacer click en "Finalizar pedido en WhatsApp", y WhatsApp se abre automáticamente con un mensaje completo y estructurado que incluye todos los productos, el orderId, y los totales, listo para enviar. El pedido queda registrado internamente antes de abrir WhatsApp.



