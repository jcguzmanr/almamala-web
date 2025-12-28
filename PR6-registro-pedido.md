# PR6: Registro del Pedido

## Nombre del PR
**Registro del Pedido - Endpoint /api/orders y Generación de orderId**

## Objetivo del PR
Implementar el endpoint del backend que recibe el pedido, genera un `orderId` único, valida el payload y registra el pedido enviando un email como log. Este PR habilita el registro interno de pedidos sin depender solo de WhatsApp, creando una base para futuras funcionalidades como tracking y analytics.

**Qué habilita:**
- Registro interno de todos los pedidos
- Generación de orderId único para tracking
- Validación del payload en el backend
- Logging de pedidos vía email
- Base para futuras funcionalidades (estados, analytics, base de datos)

## Qué se implementa

### Endpoint API Route
1. **Ruta: `/api/orders`**
   - Método: `POST`
   - Ubicación: `app/api/orders/route.ts` (Next.js App Router)
   - Recibe: `OrderPayload` (sin `orderId`, se genera aquí)
   - Retorna: `{ ok: true, orderId: string }` o error

2. **Estructura del Endpoint**
   ```typescript
   export async function POST(request: Request) {
     // 1. Parsear y validar request body
     // 2. Validar payload
     // 3. Generar orderId
     // 4. Enviar email con resumen
     // 5. Retornar respuesta
   }
   ```

### Validación del Payload
1. **Validación en Backend**
   - Re-validar estructura del payload (doble validación)
   - Verificar que `items` no está vacío
   - Verificar que opción de envío está presente
   - Validar tipos de datos
   - Validar cálculos matemáticos
   - Retornar error 400 si validación falla

2. **Mensajes de Error**
   - Errores claros y específicos
   - Códigos HTTP apropiados (400 para validación, 500 para servidor)
   - Formato de error: `{ ok: false, error: string }`

### Generación de orderId
1. **Función `generateOrderId()`**
   - Genera ID único para cada pedido
   - Formato sugerido: `AM-YYYYMMDD-HHMMSS-XXXX` o UUID v4
   - Ejemplo: `AM-20241215-143022-a1b2` o `550e8400-e29b-41d4-a716-446655440000`
   - Debe ser único y no colisionar

2. **Implementación**
   - Usar `crypto.randomUUID()` (Node.js) o librería como `uuid`
   - O formato custom con timestamp + random
   - Agregar prefijo "AM-" para identificar pedidos Alma Mala

### Envío de Email como Log
1. **Función `sendOrderEmail()`**
   - Envía email con resumen del pedido
   - En PMV: puede usar servicio básico o console.log estructurado
   - Opciones:
     - **Opción 1 (PMV):** `console.log` estructurado con formato JSON
     - **Opción 2:** Resend, SendGrid, o servicio similar (requiere API key)
     - **Opción 3:** Nodemailer con SMTP básico

2. **Contenido del Email**
   - Asunto: `"Nuevo pedido Alma Mala - {orderId}"`
   - Cuerpo incluye:
     - orderId
     - Fecha y hora
     - Lista de productos (tipo, volumen, cantidad, precio)
     - Subtotal
     - Opción de envío
     - Total
     - Código de cupón (si aplica)
   - Formato: texto plano o HTML simple

3. **Configuración**
   - Variables de entorno para email (si usa servicio real)
   - `.env.local` con `EMAIL_SERVICE_API_KEY` o similar
   - Fallback a console.log si no está configurado

### Respuesta del Endpoint
1. **Respuesta Exitosa**
   ```typescript
   {
     ok: true,
     orderId: "AM-20241215-143022-a1b2"
   }
   ```
   - Status: 200
   - Incluye orderId generado

2. **Respuesta de Error**
   ```typescript
   {
     ok: false,
     error: "Mensaje de error descriptivo"
   }
   ```
   - Status: 400 (validación) o 500 (servidor)

### Manejo de Errores
1. **Errores de Validación**
   - Payload inválido → 400
   - Campos faltantes → 400
   - Cálculos incorrectos → 400

2. **Errores del Servidor**
   - Error al generar orderId → 500
   - Error al enviar email → 500 (pero orderId ya generado, considerar éxito parcial)
   - Errores inesperados → 500

3. **Logging**
   - Registrar errores en consola del servidor
   - No exponer detalles internos al cliente

### Tipos TypeScript
1. **Tipos del Endpoint**
   ```typescript
   type OrderRequest = Omit<OrderPayload, 'orderId'>;
   
   type OrderResponse = {
     ok: true;
     orderId: string;
   } | {
     ok: false;
     error: string;
   }
   ```

## Qué NO se implementa

- Base de datos o persistencia permanente (solo email/log)
- Estados avanzados del pedido (created, whatsapp_opened, confirmed)
- Autenticación o autorización
- Rate limiting
- Webhooks o notificaciones push
- Panel de administración
- Consulta de pedidos (GET endpoint)
- Actualización de pedidos (PUT/PATCH)
- Integración con sistemas de pago
- Tracking de envíos
- Analytics avanzados

## Archivos afectados / creados

### API Route
- `app/api/orders/route.ts` - Endpoint POST principal

### Utilidades
- `lib/order-id-generator.ts` - Función `generateOrderId()`
- `lib/email-service.ts` - Función `sendOrderEmail()` o `logOrderEmail()`
- `lib/order-validator.ts` - Validación en backend (puede reusar de PR5)

### Tipos
- `types/api.ts` - Tipos para requests/responses del API
- `types/index.ts` - Exportación (actualizado)

### Configuración
- `.env.local.example` - Ejemplo de variables de entorno para email
- Actualizar `.env.local` con configuración real (no en git)

### Dependencias (si usa servicio de email)
- `resend` o `@sendgrid/mail` o `nodemailer` (opcional, según implementación)
- `uuid` (si se usa para generar IDs)

## Checklist de verificación manual

### Endpoint Básico
- [ ] Verificar que el endpoint `/api/orders` existe y acepta POST
- [ ] Confirmar que rechaza métodos no permitidos (GET, PUT, etc.)
- [ ] Verificar que retorna JSON en todas las respuestas
- [ ] Confirmar que maneja errores de parsing del body

### Validación
- [ ] Enviar payload válido y verificar que pasa validación
- [ ] Enviar payload sin items (vacío) y verificar error 400
- [ ] Enviar payload sin opción de envío y verificar error 400
- [ ] Enviar payload con estructura incorrecta y verificar error 400
- [ ] Verificar que los mensajes de error son claros y descriptivos

### Generación de orderId
- [ ] Verificar que se genera un orderId único
- [ ] Hacer múltiples requests y confirmar que cada uno tiene ID diferente
- [ ] Verificar que el formato del orderId es consistente
- [ ] Confirmar que el orderId se incluye en la respuesta exitosa

### Envío de Email/Log
- [ ] Verificar que se intenta enviar email/log al recibir pedido válido
- [ ] Confirmar que el email/log incluye toda la información del pedido:
  - [ ] orderId
  - [ ] Fecha y hora
  - [ ] Lista de productos
  - [ ] Totales
  - [ ] Opción de envío
- [ ] Verificar formato del email/log (legible y estructurado)
- [ ] Si usa servicio real: confirmar que el email llega correctamente
- [ ] Si usa console.log: verificar que aparece en logs del servidor

### Respuesta del Endpoint
- [ ] Verificar que respuesta exitosa tiene formato: `{ ok: true, orderId: "..." }`
- [ ] Confirmar que respuesta de error tiene formato: `{ ok: false, error: "..." }`
- [ ] Verificar que status codes son correctos (200 para éxito, 400/500 para errores)
- [ ] Confirmar que Content-Type es `application/json`

### Integración con Frontend
- [ ] Llamar endpoint desde componente de checkout
- [ ] Verificar que el orderId se recibe correctamente
- [ ] Confirmar que se puede usar el orderId para el mensaje de WhatsApp
- [ ] Verificar manejo de errores en el frontend

### Casos Edge
- [ ] Probar con payload muy grande (muchos items)
- [ ] Probar con caracteres especiales en datos
- [ ] Probar con números muy grandes o muy pequeños
- [ ] Verificar que maneja timeout si email tarda mucho
- [ ] Probar múltiples requests simultáneos

### Seguridad Básica
- [ ] Verificar que no se exponen detalles internos en errores
- [ ] Confirmar que se valida el origen del request (CORS si es necesario)
- [ ] Verificar que no hay vulnerabilidades de inyección en email

### TypeScript
- [ ] Verificar que no hay errores de TypeScript
- [ ] Confirmar que los tipos están correctamente definidos
- [ ] Verificar que no hay `any` implícitos

### Logging y Debugging
- [ ] Verificar que los logs del servidor muestran información útil
- [ ] Confirmar que se puede debuggear problemas fácilmente
- [ ] Verificar que los errores se registran apropiadamente

## Condición de cierre

Este PR se considera aprobado cuando:

1. ✅ El endpoint `/api/orders` acepta POST requests correctamente
2. ✅ Valida el payload y retorna errores claros si es inválido
3. ✅ Genera un orderId único para cada pedido válido
4. ✅ Envía email/log con resumen completo del pedido
5. ✅ Retorna `{ ok: true, orderId }` en caso de éxito
6. ✅ Retorna `{ ok: false, error }` en caso de error con status codes apropiados
7. ✅ Maneja errores gracefully sin exponer detalles internos
8. ✅ Los tipos TypeScript están correctos
9. ✅ El endpoint se puede llamar desde el frontend correctamente
10. ✅ Los logs/emails contienen toda la información necesaria del pedido

**Criterio de éxito:** Un desarrollador puede hacer un POST a `/api/orders` con un `OrderPayload` válido, recibir un `orderId` único en la respuesta, y ver el resumen del pedido en los logs del servidor (o email si está configurado). El pedido queda registrado internamente y listo para ser usado en el mensaje de WhatsApp.


