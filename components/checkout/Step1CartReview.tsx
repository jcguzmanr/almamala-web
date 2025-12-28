"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/cart/CartItem";
import ShippingOptions from "./ShippingOptions";
import CouponField from "./CouponField";
import { formatPrice } from "@/lib/cart";
import { CART_TEXTS } from "@/constants/texts";
import type { ShippingOption } from "@/types/checkout";

interface Step1CartReviewProps {
  shippingOption: ShippingOption | null;
  onShippingChange: (option: ShippingOption) => void;
  couponCode: string | null;
  onCouponChange: (code: string | null) => void;
  onNext: () => void;
}

export default function Step1CartReview({
  shippingOption,
  onShippingChange,
  couponCode,
  onCouponChange,
  onNext,
}: Step1CartReviewProps) {
  const { items, getSubtotal, getTotal } = useCart();
  const subtotal = getSubtotal();
  const total = getTotal();

  const canProceed = shippingOption !== null && items.length > 0;

  return (
    <div className="space-y-6">
      {/* Lista de productos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alma-dorado-claro">Productos en tu carrito</h2>
        {items.map((item, index) => (
          <CartItem key={`${item.productoId}-${item.volumen}-${index}`} item={item} />
        ))}
      </div>

      {/* Totales */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <h2 className="text-xl font-bold text-alma-dorado-oscuro mb-4">{CART_TEXTS.totals.title}</h2>

        <div className="space-y-4">
          {/* Subtotal */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-alma-verde-profundo font-medium">{CART_TEXTS.totals.subtotal.label}</span>
              <span className="font-semibold text-alma-dorado-oscuro">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-alma-verde-profundo/70">{CART_TEXTS.totals.subtotal.description}</p>
          </div>

          {/* Envío */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-alma-verde-profundo font-medium">{CART_TEXTS.totals.shipping.label}</span>
              <span className="font-semibold text-alma-dorado-oscuro">{formatPrice(0)}</span>
            </div>
            <p className="text-xs text-alma-verde-profundo/70">{CART_TEXTS.totals.shipping.description}</p>
          </div>

          {/* Total */}
          <div className="border-t border-alma-dorado-oscuro/30 pt-4 mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-lg font-bold text-alma-dorado-oscuro">{CART_TEXTS.totals.total.label}</span>
              <span className="text-lg font-bold text-alma-dorado-claro">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-alma-verde-profundo/70">{CART_TEXTS.totals.total.description}</p>
          </div>
        </div>
      </div>

      {/* Opciones de envío */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <ShippingOptions selectedOption={shippingOption} onSelect={onShippingChange} />
      </div>

      {/* Campo de cupón */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <CouponField value={couponCode} onChange={onCouponChange} />
      </div>

      {/* Botón continuar */}
      <div className="fixed bottom-0 left-0 right-0 bg-alma-verde-profundo/95 backdrop-blur-sm border-t border-alma-dorado-oscuro/30 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full px-6 py-4 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-lg font-semibold text-lg hover:bg-alma-dorado-claro hover:text-alma-verde-profundo disabled:bg-alma-verde-seco/50 disabled:text-alma-dorado-oscuro/50 disabled:cursor-not-allowed transition-colors"
          >
            Continuar - {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );
}

