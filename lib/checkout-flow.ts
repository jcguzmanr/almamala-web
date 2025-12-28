import type { CartItem } from "@/types/cart";
import type { ShippingOption } from "@/types/checkout";
import type { OrderPayload } from "@/types/order";
import { buildOrderPayload } from "./order-builder";
import { buildWhatsAppMessage, openWhatsApp } from "./whatsapp-message";

export type CheckoutResult = {
  success: boolean;
  orderId?: string;
  error?: string;
};

/**
 * Flujo completo de checkout
 */
export async function processCheckout(
  cartItems: CartItem[],
  shippingOption: ShippingOption,
  couponCode: string | null,
  whatsappNumber: string
): Promise<CheckoutResult> {
  try {
    // Construir payload
    const payload = buildOrderPayload(cartItems, shippingOption, couponCode);

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

    // Construir mensaje de WhatsApp
    const message = buildWhatsAppMessage(payload, orderId);

    // Abrir WhatsApp
    openWhatsApp(whatsappNumber, message);

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.error("Error en checkout:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

