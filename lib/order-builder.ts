import type { CartItem } from "@/types/cart";
import type { OrderPayload, OrderItem, OrderMetadata } from "@/types/order";
import type { ShippingOption, LimaZone } from "@/types/checkout";
import { ZONE_PRICES } from "@/types/checkout";
import { calculateSubtotal } from "./cart";

/**
 * Redondea un número a 2 decimales
 */
function roundToTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Formatea un CartItem a OrderItem
 */
function formatOrderItem(item: CartItem): OrderItem {
  return {
    productoId: item.productoId,
    tipoPisco: item.tipoPisco,
    categoria: item.categoria,
    volumen: item.volumen,
    precio: roundToTwoDecimals(item.precio),
    cantidad: item.cantidad,
    subtotal: roundToTwoDecimals(item.precio * item.cantidad),
  };
}

/**
 * Genera metadata del pedido
 */
function generateOrderMetadata(): OrderMetadata {
  return {
    createdAt: new Date().toISOString(),
    userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
  };
}

/**
 * Calcula el costo de envío según la opción y zona seleccionada
 */
function calculateShippingCost(option: ShippingOption, limaZone?: LimaZone): number {
  // Si no es envío regular, el costo es 0
  if (option !== "regular") {
    return 0;
  }

  // Si es envío regular pero no hay zona seleccionada, retornar 0
  if (!limaZone) {
    return 0;
  }

  // Obtener precio de la zona
  const zonePrice = ZONE_PRICES[limaZone as Exclude<LimaZone, null>];
  
  // Si el precio es null (provincias), retornar 0 (se consultará después)
  return zonePrice ?? 0;
}

/**
 * Calcula el descuento del cupón (0 en PMV)
 */
function calculateCouponDiscount(code: string | null): number {
  // En PMV, no hay descuentos
  return 0;
}

/**
 * Calcula el total del pedido
 */
function calculateTotal(subtotal: number, shipping: number, discount: number): number {
  return roundToTwoDecimals(subtotal + shipping - discount);
}

/**
 * Construye el payload del pedido desde el carrito
 */
export function buildOrderPayload(
  cartItems: CartItem[],
  shippingOption: ShippingOption | null,
  couponCode: string | null,
  limaZone?: LimaZone
): OrderPayload {
  // Validar que hay items
  if (cartItems.length === 0) {
    throw new Error("El carrito está vacío");
  }

  // Validar que hay opción de envío
  if (!shippingOption) {
    throw new Error("Debe seleccionar una opción de envío");
  }

  // Validar que si es envío regular, debe tener zona seleccionada
  if (shippingOption === "regular" && !limaZone) {
    throw new Error("Debe seleccionar una zona de Lima para envío regular");
  }

  // Transformar items
  const orderItems: OrderItem[] = cartItems.map(formatOrderItem);

  // Calcular subtotal
  const subtotal = roundToTwoDecimals(calculateSubtotal(cartItems));

  // Calcular shipping
  const shippingCost = calculateShippingCost(shippingOption, limaZone);

  // Calcular descuento
  const discount = calculateCouponDiscount(couponCode);

  // Calcular total
  const total = calculateTotal(subtotal, shippingCost, discount);

  // Generar metadata
  const metadata = generateOrderMetadata();

  // Construir payload
  const payload: OrderPayload = {
    items: orderItems,
    subtotal,
    shipping: {
      option: shippingOption,
      cost: shippingCost,
      ...(limaZone && { limaZone }),
    },
    total,
    coupon: {
      code: couponCode,
      discount,
    },
    metadata,
  };

  return payload;
}

