import type { OrderPayload } from "@/types/order";

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

/**
 * Valida el payload del pedido
 */
export function validateOrderPayload(payload: OrderPayload): ValidationResult {
  const errors: string[] = [];

  // Validar que hay items
  if (!payload.items || payload.items.length === 0) {
    errors.push("El pedido debe tener al menos un producto");
  }

  // Validar cada item
  payload.items?.forEach((item, index) => {
    if (!item.productoId) {
      errors.push(`Item ${index + 1}: falta productoId`);
    }
    if (!item.tipoPisco) {
      errors.push(`Item ${index + 1}: falta tipoPisco`);
    }
    if (!item.volumen) {
      errors.push(`Item ${index + 1}: falta volumen`);
    }
    if (typeof item.precio !== "number" || item.precio <= 0) {
      errors.push(`Item ${index + 1}: precio inválido`);
    }
    if (typeof item.cantidad !== "number" || item.cantidad < 1) {
      errors.push(`Item ${index + 1}: cantidad inválida`);
    }
    if (typeof item.subtotal !== "number" || item.subtotal <= 0) {
      errors.push(`Item ${index + 1}: subtotal inválido`);
    }
    // Validar que subtotal = precio × cantidad
    const expectedSubtotal = Math.round(item.precio * item.cantidad * 100) / 100;
    if (Math.abs(item.subtotal - expectedSubtotal) > 0.01) {
      errors.push(`Item ${index + 1}: subtotal no coincide con precio × cantidad`);
    }
  });

  // Validar subtotal total
  if (typeof payload.subtotal !== "number" || payload.subtotal <= 0) {
    errors.push("Subtotal inválido");
  } else {
    const calculatedSubtotal = payload.items.reduce((sum, item) => sum + item.subtotal, 0);
    const roundedCalculated = Math.round(calculatedSubtotal * 100) / 100;
    if (Math.abs(payload.subtotal - roundedCalculated) > 0.01) {
      errors.push("Subtotal no coincide con la suma de items");
    }
  }

  // Validar shipping
  if (!payload.shipping || !payload.shipping.option) {
    errors.push("Debe seleccionar una opción de envío");
  }
  if (typeof payload.shipping?.cost !== "number" || payload.shipping.cost < 0) {
    errors.push("Costo de envío inválido");
  }

  // Validar total
  if (typeof payload.total !== "number" || payload.total <= 0) {
    errors.push("Total inválido");
  } else {
    const discount = payload.coupon?.discount || 0;
    const expectedTotal =
      Math.round((payload.subtotal + payload.shipping.cost - discount) * 100) / 100;
    if (Math.abs(payload.total - expectedTotal) > 0.01) {
      errors.push("Total no coincide con subtotal + envío - descuento");
    }
  }

  // Validar metadata
  if (!payload.metadata || !payload.metadata.createdAt) {
    errors.push("Metadata inválida");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

