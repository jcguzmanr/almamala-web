"use client";

import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/cart";
import { CART_TEXTS } from "@/constants/texts";

export default function CartSummary() {
  const { getSubtotal, getTotal } = useCart();
  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className="space-y-4 p-6 bg-white rounded-md border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{CART_TEXTS.totals.title}</h2>

      <div className="space-y-4">
        {/* Subtotal */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-900 font-medium">{CART_TEXTS.totals.subtotal.label}</span>
            <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs text-gray-600">{CART_TEXTS.totals.subtotal.description}</p>
        </div>

        {/* Envío */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-900 font-medium">{CART_TEXTS.totals.shipping.label}</span>
            <span className="font-semibold text-gray-900">{formatPrice(0)}</span>
          </div>
          <p className="text-xs text-gray-600">{CART_TEXTS.totals.shipping.description}</p>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-lg font-bold text-gray-900">{CART_TEXTS.totals.total.label}</span>
            <span className="text-lg font-bold text-green-700">{formatPrice(total)}</span>
          </div>
          <p className="text-xs text-gray-600">{CART_TEXTS.totals.total.description}</p>
        </div>
      </div>
    </div>
  );
}

