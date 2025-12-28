"use client";

import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/cart";
import { CART_TEXTS } from "@/constants/texts";
import InfoMessages from "./InfoMessages";
import { processCheckout } from "@/lib/checkout-flow";
import type { ShippingOption } from "@/types/checkout";
import type { ShippingInfo } from "@/types/checkout";
import { useState } from "react";

interface Step3OrderReviewProps {
  shippingOption: ShippingOption;
  couponCode: string | null;
  shippingInfo: ShippingInfo;
  onBack: () => void;
}

export default function Step3OrderReview({
  shippingOption,
  couponCode,
  shippingInfo,
  onBack,
}: Step3OrderReviewProps) {
  const { items, getSubtotal, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = getSubtotal();
  const total = getTotal();

  const getShippingOptionText = (option: ShippingOption): string => {
    const options: Record<ShippingOption, string> = {
      regular: CART_TEXTS.shipping.regular.title,
      gratuito: CART_TEXTS.shipping.gratuito.title,
      retiro: CART_TEXTS.shipping.retiro.title,
    };
    return options[option];
  };

  const handleFinalizeOrder = async () => {
    setLoading(true);
    setError(null);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

    if (!whatsappNumber) {
      setError("Número de WhatsApp no configurado");
      setLoading(false);
      return;
    }

    try {
      const result = await processCheckout(items, shippingOption, couponCode, whatsappNumber);

      if (result.success) {
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
    <div className="space-y-6">
      {/* Resumen de productos */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <h2 className="text-xl font-bold text-alma-dorado-oscuro mb-4">Productos</h2>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${item.productoId}-${item.volumen}-${index}`} className="flex justify-between">
              <div>
                <p className="font-medium text-alma-verde-profundo">
                  {item.tipoPisco} - {item.volumen}
                </p>
                <p className="text-sm text-alma-verde-profundo/70">Cantidad: {item.cantidad}</p>
              </div>
              <p className="font-semibold text-alma-dorado-oscuro">{formatPrice(item.precio * item.cantidad)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen de totales */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <h2 className="text-xl font-bold text-alma-dorado-oscuro mb-4">{CART_TEXTS.totals.title}</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-alma-verde-profundo">{CART_TEXTS.totals.subtotal.label}</span>
            <span className="font-semibold text-alma-dorado-oscuro">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-alma-verde-profundo">{CART_TEXTS.totals.shipping.label}</span>
            <span className="font-semibold text-alma-dorado-oscuro">{getShippingOptionText(shippingOption)}</span>
          </div>

          {couponCode && (
            <div className="flex justify-between">
              <span className="text-alma-verde-profundo">Código de cupón</span>
              <span className="font-semibold text-alma-dorado-oscuro">{couponCode}</span>
            </div>
          )}

          <div className="border-t border-alma-dorado-oscuro/30 pt-4 mt-4">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-alma-dorado-oscuro">{CART_TEXTS.totals.total.label}</span>
              <span className="text-lg font-bold text-alma-dorado-claro">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información de envío */}
      <div className="p-6 bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/20 shadow-lg">
        <h2 className="text-xl font-bold text-alma-dorado-oscuro mb-4">Información de envío</h2>
        <div className="space-y-2 text-sm">
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">Nombre:</span> {shippingInfo.nombre} {shippingInfo.apellidos}
          </p>
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">Email:</span> {shippingInfo.email}
          </p>
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">Celular:</span> {shippingInfo.celular}
          </p>
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">DNI/CE:</span> {shippingInfo.dni}
          </p>
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">Dirección:</span> {shippingInfo.direccion}
            {shippingInfo.referencia && ` - ${shippingInfo.referencia}`}
          </p>
          <p className="text-alma-verde-profundo">
            <span className="font-medium text-alma-dorado-oscuro">Ubicación:</span> {shippingInfo.distrito}, {shippingInfo.provincia}, {shippingInfo.departamento}
          </p>
        </div>
      </div>

      {/* Mensajes informativos */}
      <InfoMessages />

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Información antes del botón */}
      <div className="p-4 bg-alma-dorado-claro/20 border border-alma-dorado-oscuro/30 rounded-lg">
        <p className="font-semibold text-alma-dorado-oscuro mb-2">{CART_TEXTS.checkout.continueInfo.title}</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-alma-verde-profundo/90">
          {CART_TEXTS.checkout.continueInfo.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>

      {/* Botones de navegación */}
      <div className="fixed bottom-0 left-0 right-0 bg-alma-verde-profundo/95 backdrop-blur-sm border-t border-alma-dorado-oscuro/30 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="flex-1 px-6 py-4 border border-alma-dorado-oscuro text-alma-dorado-claro rounded-lg font-semibold hover:bg-alma-dorado-oscuro/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Volver
          </button>
          <button
            onClick={handleFinalizeOrder}
            disabled={loading}
            className="flex-1 px-6 py-4 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-lg font-semibold text-lg hover:bg-alma-dorado-claro hover:text-alma-verde-profundo disabled:bg-alma-verde-seco/50 disabled:text-alma-dorado-oscuro/50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
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
    </div>
  );
}

