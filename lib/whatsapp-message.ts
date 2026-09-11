import type { OrderPayload } from "@/types/order";
import type { ShippingInfo } from "@/types/checkout";
import { formatPrice } from "./cart";
import { ZONE_PRICES } from "@/types/checkout";
import { getWhatsAppDisplayNumber } from "./app-config";
import { copyReceiptImageToClipboard, downloadReceiptFile } from "./receipt";

export type WhatsAppHandoffMethod = "share" | "link";

export type WhatsAppHandoffResult = {
  method: WhatsAppHandoffMethod;
  fileIncluded: boolean;
  cancelled: boolean;
};

/**
 * Construye el mensaje de WhatsApp con el formato especificado
 */
export function buildWhatsAppMessage(
  orderPayload: OrderPayload,
  orderId: string,
  shippingInfo: ShippingInfo,
  bottleReturnDiscount: number = 0,
  receiptFileName?: string
): string {
  let message = "Hola, quiero hacer un pedido de Alma Mala.\n\n";
  message += `📦 Pedido #${orderId}\n\n`;
  
  // Productos
  message += `🛍️ *Productos*\n`;
  orderPayload.items.forEach((item) => {
    message += `• ${item.tipoPisco} - ${item.volumen}\n`;
    message += `  Cantidad: ${item.cantidad}\n`;
    message += `  Precio: ${formatPrice(item.precio * item.cantidad)}\n\n`;
  });

  // Totales
  message += `💰 *Totales del carrito*\n`;
  message += `Subtotal: ${formatPrice(orderPayload.subtotal)}\n`;
  
  // Envío
  message += `Envío: ${getShippingOptionText(orderPayload.shipping.option)}\n`;
  if (orderPayload.shipping.option === "regular" && orderPayload.shipping.limaZone) {
    const zoneName = orderPayload.shipping.limaZone === "provincias" 
      ? "Provincias" 
      : orderPayload.shipping.limaZone.toUpperCase();
    const zonePrice = ZONE_PRICES[orderPayload.shipping.limaZone as Exclude<typeof orderPayload.shipping.limaZone, null>];
    if (zonePrice !== null) {
      message += `${zoneName}: ${formatPrice(zonePrice)}\n`;
    } else {
      message += `${zoneName}: Consultar\n`;
    }
  }
  
  // Descuento por botellas retornables
  if (bottleReturnDiscount > 0) {
    message += `Devolución de botellas (Beta): – ${formatPrice(bottleReturnDiscount)}\n`;
  }
  
  // Código de cupón
  if (orderPayload.coupon?.code) {
    message += `Código de cupón: ${orderPayload.coupon.code}\n`;
  }
  
  message += `Total: ${formatPrice(orderPayload.total)}\n\n`;

  // Información de envío (solo si está completa)
  if (shippingInfo.nombre && shippingInfo.email && shippingInfo.celular) {
    message += `📋 *Información de envío*\n`;
    message += `Nombre: ${shippingInfo.nombre} ${shippingInfo.apellidos}\n`;
    message += `Email: ${shippingInfo.email}\n`;
    message += `Celular: ${shippingInfo.celular}\n`;
    message += `DNI/CE: ${shippingInfo.dni}\n`;
    message += `Dirección: ${shippingInfo.direccion}`;
    if (shippingInfo.referencia) {
      message += ` - ${shippingInfo.referencia}`;
    }
    message += `\n`;
    message += `Ubicación: ${shippingInfo.distrito}, ${shippingInfo.provincia}, ${shippingInfo.departamento}\n`;
  }

  message += `\n`;
  if (receiptFileName) {
    message += `🧾 *Comprobante de pago*\n`;
    message += `Archivo: ${receiptFileName}\n`;
    message += `Enviar a: +51 ${getWhatsAppDisplayNumber()}\n`;
    message += `Va adjunto en este envío. Si no aparece, súbelo en este chat.\n\n`;
  }
  message += "Gracias!";

  return message;
}

function getShippingOptionText(option: string): string {
  const options: Record<string, string> = {
    regular: "Envío regular (3–7 días hábiles)",
    gratuito: "Envío gratuito (3–7 días hábiles)",
    retiro: "Retiro en Depósito",
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

function canShareReceipt(file: File, message: string): boolean {
  if (typeof navigator === "undefined" || typeof navigator.canShare !== "function") {
    return false;
  }

  try {
    return navigator.canShare({ files: [file], text: message });
  } catch {
    try {
      return navigator.canShare({ files: [file] });
    } catch {
      return false;
    }
  }
}

/**
 * Entrega el pedido a WhatsApp con el comprobante.
 * wa.me no admite archivos: en móvil usamos Web Share (el usuario elige WhatsApp);
 * en escritorio abrimos el chat y dejamos el archivo listo para adjuntar.
 */
export async function sendOrderWithReceipt(
  number: string,
  message: string,
  receipt: File
): Promise<WhatsAppHandoffResult> {
  if (canShareReceipt(receipt, message)) {
    try {
      await navigator.share({
        text: message,
        files: [receipt],
      });
      return { method: "share", fileIncluded: true, cancelled: false };
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return { method: "share", fileIncluded: false, cancelled: true };
      }
      // Si el share falla (permiso, tipo), caemos al chat directo.
    }
  }

  await copyReceiptImageToClipboard(receipt);
  downloadReceiptFile(receipt);
  openWhatsApp(number, message);
  return { method: "link", fileIncluded: false, cancelled: false };
}

