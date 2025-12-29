"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CartItem from "@/components/cart/CartItem";
import ShippingOptions from "./ShippingOptions";
import CouponField from "./CouponField";
import BottleReturn from "./BottleReturn";
import { formatPrice } from "@/lib/cart";
import { CART_TEXTS } from "@/constants/texts";
import type { ShippingOption, LimaZone, BottleReturn as BottleReturnType } from "@/types/checkout";
import { ZONE_PRICES } from "@/types/checkout";

interface Step1CartReviewProps {
  shippingOption: ShippingOption | null;
  onShippingChange: (option: ShippingOption) => void;
  couponCode: string | null;
  onCouponChange: (code: string | null) => void;
  limaZone?: LimaZone;
  onZoneChange?: (zone: LimaZone) => void;
  bottleReturns?: BottleReturnType[];
  onBottleReturnsChange?: (returns: BottleReturnType[]) => void;
  onNext: () => void;
}

export default function Step1CartReview({
  shippingOption,
  onShippingChange,
  couponCode,
  onCouponChange,
  limaZone,
  onZoneChange,
  bottleReturns = [],
  onBottleReturnsChange,
  onNext,
}: Step1CartReviewProps) {
  const { items, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  
  // Calcular costo de envío según la zona
  const getShippingCost = (): number => {
    if (shippingOption !== "regular" || !limaZone) {
      return 0;
    }
    const zonePrice = ZONE_PRICES[limaZone as Exclude<typeof limaZone, null>];
    return zonePrice ?? 0;
  };
  
  // Calcular descuento por devolución de botellas
  const calculateBottleReturnDiscount = (): number => {
    if (!bottleReturns || bottleReturns.length === 0) return 0;

    let totalDiscount = 0;
    bottleReturns.forEach((returnItem) => {
      const cartItem = items.find(
        (item) => item.productoId === returnItem.productoId && item.volumen === returnItem.volumen
      );
      if (cartItem && returnItem.cantidad > 0) {
        // Descuento del 5% por botella devuelta sobre el precio unitario
        const unitPrice = cartItem.precio;
        const discountPerBottle = unitPrice * 0.05;
        totalDiscount += discountPerBottle * returnItem.cantidad;
      }
    });

    return Math.round(totalDiscount * 100) / 100; // Redondear a 2 decimales
  };

  const shippingCost = getShippingCost();
  const bottleReturnDiscount = calculateBottleReturnDiscount();
  const total = subtotal + shippingCost - bottleReturnDiscount;

  // Validar que si es envío regular, debe tener zona seleccionada
  const canProceed =
    shippingOption !== null &&
    items.length > 0 &&
    (shippingOption !== "regular" || (shippingOption === "regular" && limaZone !== null));

  return (
    <div className="space-y-6">
      {/* Lista de productos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alma-dorado-claro">Productos en tu carrito</h2>
        {items.map((item, index) => (
          <CartItem key={`${item.productoId}-${item.volumen}-${index}`} item={item} />
        ))}
      </div>

      {/* Devolución de botellas */}
      {onBottleReturnsChange && (
        <BottleReturn returns={bottleReturns} onReturnsChange={onBottleReturnsChange} />
      )}

      {/* Opciones de envío */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alma-dorado-claro">{CART_TEXTS.totals.shipping.label}</h2>
        <div 
          className="p-6 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg"
          style={{ backdropFilter: 'blur(12px) saturate(150%)' }}
        >
          <ShippingOptions
            selectedOption={shippingOption}
            onSelect={onShippingChange}
            selectedZone={limaZone}
            onZoneSelect={onZoneChange}
          />
        </div>
      </div>

      {/* Campo de cupón */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alma-dorado-claro">{CART_TEXTS.coupon.title}</h2>
        <div 
          className="p-6 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg"
          style={{ backdropFilter: 'blur(12px) saturate(150%)' }}
        >
          <CouponField value={couponCode} onChange={onCouponChange} />
        </div>
      </div>

      {/* Totales */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-alma-dorado-claro">{CART_TEXTS.totals.title}</h2>
        <div 
          className="p-6 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg"
          style={{ backdropFilter: 'blur(12px) saturate(150%)' }}
        >

        <div className="space-y-4">
          {/* Subtotal */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-alma-dorado-oscuro font-medium">{CART_TEXTS.totals.subtotal.label}</span>
              <span className="font-semibold text-alma-dorado-claro">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs text-alma-dorado-oscuro/70">{CART_TEXTS.totals.subtotal.description}</p>
          </div>

          {/* Envío */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-alma-dorado-oscuro font-medium">{CART_TEXTS.totals.shipping.label}</span>
              <span className="font-semibold text-alma-dorado-claro">
                {shippingOption === "regular" && limaZone && ZONE_PRICES[limaZone as Exclude<typeof limaZone, null>] === null
                  ? "Consultar"
                  : formatPrice(shippingCost)}
              </span>
            </div>
            <p className="text-xs text-alma-dorado-oscuro/70">
              {shippingOption === "regular" && limaZone
                ? `Zona seleccionada: ${limaZone === "provincias" ? "Provincias" : limaZone.toUpperCase()}`
                : CART_TEXTS.totals.shipping.description}
            </p>
          </div>

          {/* Descuento por devolución de botellas */}
          {bottleReturnDiscount > 0 && (
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-alma-dorado-oscuro font-medium">
                  Devolución de botellas (Beta)
                </span>
                <span className="font-semibold text-alma-dorado-claro">
                  – {formatPrice(bottleReturnDiscount)}
                </span>
              </div>
              <p className="text-xs text-alma-dorado-oscuro/70">
                Descuento aplicado por retorno de botellas vacías de Alma Mala
              </p>
            </div>
          )}

          {/* Total */}
          <div className="border-t border-alma-dorado-oscuro/30 pt-4 mt-4">
            <div className="flex justify-between mb-1">
              <span className="text-lg font-bold text-alma-dorado-oscuro">{CART_TEXTS.totals.total.label}</span>
              <span className="text-lg font-bold text-alma-dorado-claro">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-alma-dorado-oscuro/70">{CART_TEXTS.totals.total.description}</p>
          </div>
        </div>
        </div>
      </div>

      {/* Botón continuar */}
      <div className="fixed bottom-0 left-0 right-0 bg-alma-verde-profundo/95 backdrop-blur-sm border-t border-alma-dorado-oscuro/30 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onNext}
            disabled={!canProceed}
            className="w-full px-6 py-4 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold text-lg hover:bg-alma-dorado-claro hover:text-alma-verde-profundo disabled:bg-alma-verde-seco/50 disabled:text-alma-dorado-oscuro/50 disabled:cursor-not-allowed transition-colors"
          >
            Continuar - {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );
}

