import type { CartItem } from "@/types/cart";
import type { ShippingOption, LimaZone, ShippingInfo } from "@/types/checkout";
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
  whatsappNumber: string,
  limaZone: LimaZone | undefined,
  shippingInfo?: ShippingInfo,
  bottleReturnDiscount: number = 0
): Promise<CheckoutResult> {
  try {
    // Construir payload
    const payload = buildOrderPayload(cartItems, shippingOption, couponCode, limaZone);

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
    
    const message = buildWhatsAppMessage(payload, orderId, defaultShippingInfo, bottleReturnDiscount);

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

