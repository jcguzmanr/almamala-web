import type { CartItem } from "@/types/cart";
import type { ShippingOption, LimaZone, ShippingInfo } from "@/types/checkout";
import type { OrderPayload } from "@/types/order";
import { buildOrderPayload } from "./order-builder";
import { receiptMetadata, renameReceiptFile, validateReceiptFile } from "./receipt";
import {
  buildWhatsAppMessage,
  sendOrderWithReceipt,
  type WhatsAppHandoffMethod,
} from "./whatsapp-message";

export type CheckoutResult = {
  success: boolean;
  orderId?: string;
  error?: string;
  cancelled?: boolean;
  method?: WhatsAppHandoffMethod;
  fileIncluded?: boolean;
  message?: string;
  receipt?: File;
};

/**
 * Flujo completo de checkout
 */
export async function processCheckout(
  cartItems: CartItem[],
  shippingOption: ShippingOption,
  couponCode: string | null,
  whatsappNumber: string,
  limaZone: LimaZone | undefined,
  shippingInfo?: ShippingInfo,
  bottleReturnDiscount: number = 0,
  receiptFile?: File | null
): Promise<CheckoutResult> {
  try {
    const receiptCheck = validateReceiptFile(receiptFile);
    if (!receiptCheck.ok || !receiptFile) {
      return {
        success: false,
        error: receiptCheck.ok
          ? "Sube el comprobante de pago antes de enviar el pedido."
          : receiptCheck.error,
      };
    }

    // Construir payload
    const payload = buildOrderPayload(cartItems, shippingOption, couponCode, limaZone);
    payload.receipt = receiptMetadata(receiptFile);

    // Registrar pedido en backend
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        success: false,
        error: data.error || "Error al registrar el pedido",
      };
    }

    const orderId = data.orderId;

    // Construir mensaje de WhatsApp con toda la información
    // Si shippingInfo no está disponible, usar información básica
    const defaultShippingInfo: ShippingInfo = shippingInfo || {
      nombre: "",
      apellidos: "",
      email: "",
      celular: "",
      dni: "",
      direccion: "",
      distrito: "",
      provincia: "",
      departamento: "",
    };
    
    const namedReceipt = renameReceiptFile(receiptFile, orderId);
    const message = buildWhatsAppMessage(
      payload,
      orderId,
      defaultShippingInfo,
      bottleReturnDiscount,
      namedReceipt.name
    );

    const handoff = await sendOrderWithReceipt(whatsappNumber, message, namedReceipt);

    if (handoff.cancelled) {
      return {
        success: false,
        cancelled: true,
        orderId,
        error: "Cancelaste el envío a WhatsApp. El pedido quedó registrado; puedes intentar de nuevo.",
        message,
        receipt: namedReceipt,
      };
    }

    return {
      success: true,
      orderId,
      method: handoff.method,
      fileIncluded: handoff.fileIncluded,
      message,
      receipt: namedReceipt,
    };
  } catch (error) {
    console.error("Error en checkout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

