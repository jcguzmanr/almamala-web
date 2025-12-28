import type { CartItem } from "@/types/cart";

/**
 * Convierte un precio de string a number
 * @param priceString - Precio en formato "S/ XX"
 * @returns Precio como número
 */
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^\d.]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formatea un precio de number a string
 * @param price - Precio como número
 * @returns Precio en formato "S/ XX.XX"
 */
export function formatPrice(price: number): string {
  return `S/ ${price.toFixed(2)}`;
}

/**
 * Calcula el subtotal de los items del carrito
 * @param items - Array de items del carrito
 * @returns Subtotal como número
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + item.precio * item.cantidad;
  }, 0);
}

/**
 * Calcula el total del carrito
 * @param subtotal - Subtotal de los productos
 * @param shipping - Costo de envío (default 0)
 * @returns Total como número
 */
export function calculateTotal(subtotal: number, shipping: number = 0): number {
  return subtotal + shipping;
}

/**
 * Guarda el carrito en localStorage
 * @param items - Array de items del carrito
 */
export function saveCartToStorage(items: CartItem[]): void {
  try {
    localStorage.setItem("alma-mala-cart", JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

/**
 * Carga el carrito desde localStorage
 * @returns Array de items del carrito o null si no existe
 */
export function loadCartFromStorage(): CartItem[] | null {
  try {
    const stored = localStorage.getItem("alma-mala-cart");
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    // Validar estructura básica
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => {
        return (
          item.productoId &&
          item.tipoPisco &&
          item.volumen &&
          typeof item.precio === "number" &&
          typeof item.cantidad === "number" &&
          item.cantidad > 0
        );
      });
    }
    return null;
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return null;
  }
}

