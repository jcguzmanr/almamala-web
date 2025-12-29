"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/cart";
import { CART_TEXTS } from "@/constants/texts";
import ShippingOptions from "./ShippingOptions";
import CouponField from "./CouponField";
import InfoMessages from "./InfoMessages";
import { processCheckout } from "@/lib/checkout-flow";
import type { ShippingOption, LimaZone } from "@/types/checkout";
import { ZONE_PRICES } from "@/types/checkout";
import { getWhatsAppNumber } from "@/lib/app-config";

interface CheckoutSummaryProps {
  shippingOption: ShippingOption | null;
  onShippingChange: (option: ShippingOption) => void;
  couponCode: string | null;
  onCouponChange: (code: string | null) => void;
  limaZone?: LimaZone;
  onZoneChange?: (zone: LimaZone) => void;
}

export default function CheckoutSummary({
  shippingOption,
  onShippingChange,
  couponCode,
  onCouponChange,
  limaZone,
  onZoneChange,
}: CheckoutSummaryProps) {
  const { items, getSubtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = getSubtotal();
  
  // Calcular costo de envío según la zona
  const getShippingCost = (): number => {
    if (shippingOption !== "regular" || !limaZone) {
      return 0;
    }
    const zonePrice = ZONE_PRICES[limaZone as Exclude<typeof limaZone, null>];
    return zonePrice ?? 0;
  };
  
  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  const handleCheckout = async () => {
    if (!shippingOption) {
      setError("Por favor selecciona una opción de envío");
      return;
    }

    if (shippingOption === "regular" && !limaZone) {
      setError("Por favor selecciona una zona de Lima para envío regular");
      return;
    }

    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError(null);

    // Obtener número de WhatsApp desde configuración
    const whatsappNumber = getWhatsAppNumber();

    if (!whatsappNumber) {
      setError("Número de WhatsApp no configurado");
      setLoading(false);
      return;
    }

    try {
      const result = await processCheckout(items, shippingOption, couponCode, whatsappNumber, limaZone);

      if (result.success) {
        // Limpiar carrito después de éxito
        clearCart();
        // El WhatsApp ya se abrió en processCheckout
      } else {
        setError(result.error || "Error al procesar el pedido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Totales */}
        <div className="p-6 bg-white rounded-md border border-gray-200">
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
                <span className="font-semibold text-gray-900">
                  {shippingOption === "regular" && limaZone && ZONE_PRICES[limaZone as Exclude<typeof limaZone, null>] === null
                    ? "Consultar"
                    : formatPrice(shippingCost)}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {shippingOption === "regular" && limaZone
                  ? `Zona seleccionada: ${limaZone === "provincias" ? "Provincias" : limaZone.toUpperCase()}`
                  : CART_TEXTS.totals.shipping.description}
              </p>
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

        {/* Opciones de envío */}
        <div className="p-6 bg-white rounded-md border border-gray-200">
          <ShippingOptions
            selectedOption={shippingOption}
            onSelect={onShippingChange}
            selectedZone={limaZone}
            onZoneSelect={onZoneChange}
          />
        </div>

        {/* Campo de cupón */}
        <div className="p-6 bg-white rounded-md border border-gray-200">
          <CouponField value={couponCode} onChange={onCouponChange} />
        </div>

        {/* Mensajes informativos */}
        <InfoMessages />

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Información antes del botón */}
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="font-semibold text-gray-900 mb-2">{CART_TEXTS.checkout.continueInfo.title}</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {CART_TEXTS.checkout.continueInfo.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón de finalización anclado en la parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleCheckout}
            disabled={!shippingOption || loading}
            className="w-full px-6 py-4 bg-green-700 text-white rounded-md font-semibold text-lg hover:bg-green-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Procesando...</span>
              </>
            ) : (
              <>
                {CART_TEXTS.checkout.button} - {formatPrice(total)}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

