import type { OrderPayload } from "@/types/order";
import { formatPrice } from "./cart";

/**
 * Envía email con resumen del pedido (en PMV solo log)
 */
export async function sendOrderEmail(orderId: string, payload: OrderPayload): Promise<void> {
  const emailContent = buildEmailContent(orderId, payload);

  // En PMV, solo loguear en consola
  // En producción, aquí se integraría con un servicio de email
  console.log("=".repeat(80));
  console.log(`NUEVO PEDIDO ALMA MALA - ${orderId}`);
  console.log("=".repeat(80));
  console.log(emailContent);
  console.log("=".repeat(80));

  // Si hay variables de entorno configuradas, se podría enviar email real
  // Por ahora solo logging
}

function buildEmailContent(orderId: string, payload: OrderPayload): string {
  let content = `\n`;
  content += `Pedido ID: ${orderId}\n`;
  content += `Fecha: ${new Date(payload.metadata.createdAt).toLocaleString("es-PE")}\n`;
  content += `\n`;
  content += `PRODUCTOS:\n`;
  content += `-`.repeat(80) + `\n`;

  payload.items.forEach((item, index) => {
    content += `${index + 1}. ${item.tipoPisco} - ${item.volumen}\n`;
    content += `   Cantidad: ${item.cantidad}\n`;
    content += `   Precio unitario: ${formatPrice(item.precio)}\n`;
    content += `   Subtotal: ${formatPrice(item.subtotal)}\n`;
    content += `\n`;
  });

  content += `RESUMEN:\n`;
  content += `-`.repeat(80) + `\n`;
  content += `Subtotal: ${formatPrice(payload.subtotal)}\n`;
  content += `Opción de envío: ${payload.shipping.option}\n`;
  content += `Costo de envío: ${formatPrice(payload.shipping.cost)}\n`;

  if (payload.coupon?.code) {
    content += `Código de cupón: ${payload.coupon.code}\n`;
    content += `Descuento: ${formatPrice(payload.coupon.discount)}\n`;
  }

  content += `TOTAL: ${formatPrice(payload.total)}\n`;
  content += `\n`;

  return content;
}


