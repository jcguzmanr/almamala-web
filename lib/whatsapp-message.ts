import type { OrderPayload } from "@/types/order";
import { formatPrice } from "./cart";

/**
 * Construye el mensaje de WhatsApp con el formato especificado
 */
export function buildWhatsAppMessage(orderPayload: OrderPayload, orderId: string): string {
  let message = "Hola, quiero hacer un pedido de Alma Mala.\n\n";
  message += `Pedido #${orderId}\n\n`;
  message += "Productos:\n";

  // Listar productos
  orderPayload.items.forEach((item) => {
    message += `• ${item.tipoPisco} - ${item.volumen} x ${item.cantidad} = ${formatPrice(item.subtotal)}\n`;
  });

  message += `\n`;
  message += `Opción de entrega: ${getShippingOptionText(orderPayload.shipping.option)}\n`;
  message += `\n`;
  message += `Subtotal: ${formatPrice(orderPayload.subtotal)}\n`;
  message += `Total: ${formatPrice(orderPayload.total)}\n`;

  // Agregar código de cupón si existe
  if (orderPayload.coupon?.code) {
    message += `\n`;
    message += `Código de cupón: ${orderPayload.coupon.code}\n`;
  }

  message += `\n`;
  message += "Gracias!";

  return message;
}

function getShippingOptionText(option: string): string {
  const options: Record<string, string> = {
    regular: "Envío regular (3–7 días hábiles)",
    gratuito: "Envío gratuito (3–7 días hábiles)",
    retiro: "Retiro en oficina",
  };
  return options[option] || option;
}

/**
 * Construye la URL de WhatsApp
 */
export function buildWhatsAppURL(number: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

/**
 * Abre WhatsApp con el mensaje pre-llenado
 */
export function openWhatsApp(number: string, message: string): void {
  const url = buildWhatsAppURL(number, message);
  window.open(url, "_blank");
}

