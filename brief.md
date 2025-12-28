
🧠 Proyecto: Web de Venta – Alma Mala (PMV)
Versión: v0.4 (con flujo documentado)
📍 Problema Actual
Hoy la venta de Alma Mala se gestiona principalmente vía WhatsApp, lo que genera tres fricciones claras:
Disponibilidad intermitente
El número no siempre está activo o atendido → ventas perdidas.
Proceso manual y repetitivo
Explicación uno a uno de productos, precios y formatos → alto desgaste operativo.
Falta de estructura comercial
No existe un flujo claro de selección → carrito → pedido → seguimiento → baja escalabilidad.

🎯 Objetivo del Primer Producto Mínimo Viable (PMV)
Crear una web mobile-first, simple y funcional que permita:
Mostrar el catálogo completo de productos Alma Mala.
Permitir al usuario armar un carrito (incluyendo distintas presentaciones del mismo producto).
Generar un pedido estructurado, que:
Abra WhatsApp con el mensaje listo para enviar.
Deje registro interno del pedido (email hoy, DB mañana).
👉 La web no reemplaza WhatsApp:
👉 lo estructura, lo ordena y evita perder ventas.

🧩 Alcance del PMV (fase 1)
📦 Listado de productos
Fuente: products.json
Nombre
Tipo (Italia, Mosto Verde, Quebranta)
Presentación (500 ml, 750 ml, 4L)
Precio por presentación
Descripción corta
Imagen por presentación (cuando exista)

🛒 Carrito de compras
Agregar / quitar productos
Un mismo producto puede tener múltiples presentaciones
Actualizar cantidades
Resumen claro:
Subtotal
Total (sin costos de envío en PMV)

📲 Botón “Finalizar pedido en WhatsApp”
Construye un orderPayload estructurado
Registra el pedido (email)
Abre WhatsApp con mensaje pre-llenado que incluye:
Productos
Presentaciones
Cantidades
Total
ID de pedido

🧠 Principio Estratégico
Este PMV prioriza conversión sobre perfección.
No hay pagos online.
No hay cálculo de envío complejo.
No hay cuenta de usuario.
El foco es:
reducir fricción, ordenar demanda y capturar intención de compra.

🚀 Qué habilita esta versión
Centralización del catálogo.
Menos errores humanos.
Registro básico de pedidos.
Base sólida para:
Pagos (Yape / Plin / tarjetas)
Envíos
Stock
Internacionalización
Panel admin

🧱 Enfoque Técnico del PMV
🧩 Stack Tecnológico
Frontend
Next.js (App Router)
TypeScript
Hosting: Vercel
UI / Diseño
Mobile-first
Tailwind CSS
shadcn/ui (componentes base)
Tokens de diseño definidos luego (theme.json)
Estado
Carrito en cliente
Persistencia en localStorage


📦 Registro del Pedido (fase inicial)
Objetivo: no depender solo de WhatsApp.
Implementación PMV
Endpoint: POST /api/orders
Valida payload
Genera orderId
Envía email con resumen del pedido
Devuelve { ok: true, orderId }
🔜 Más adelante:
Persistencia en Supabase
Estados del pedido (created, whatsapp_opened, confirmed)

📁 Inputs necesarios para desarrollo
✅ Ya disponibles
products.json
➕ A agregar
brand.json
brandName
whatsappNumber
currency
checkoutIntroText
theme.json
Colores primarios / secundarios
Backgrounds
Tipografía (similar a SF Rounded, web-friendly)
Radius / sombras
Assets (/images)
Logo (SVG ideal)
Imágenes por presentación (500 / 750)
Hero placeholder




