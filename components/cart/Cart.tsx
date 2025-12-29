"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import Step1CartReview from "@/components/checkout/Step1CartReview";
import Step2ShippingInfo from "@/components/checkout/Step2ShippingInfo";
import Step3OrderReview from "@/components/checkout/Step3OrderReview";
import type { ShippingOption, LimaZone, BottleReturn } from "@/types/checkout";
import type { ShippingInfo } from "@/types/checkout";

export default function Cart() {
  const { items } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingOption, setShippingOption] = useState<ShippingOption | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [limaZone, setLimaZone] = useState<LimaZone>(null);
  const [bottleReturns, setBottleReturns] = useState<BottleReturn[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <p className="text-xl text-alma-dorado-claro mb-4">Tu carrito está vacío</p>
        <a
          href="/"
          className="px-6 py-3 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md hover:bg-alma-dorado-claro hover:text-alma-verde-profundo transition-colors font-semibold"
        >
          Ver catálogo
        </a>
      </div>
    );
  }

  const handleStep1Next = () => {
    if (shippingOption) {
      setCurrentStep(2);
    }
  };

  const handleStep2Next = () => {
    setCurrentStep(3);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-6 pb-32">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-alma-dorado-claro">Carrito de compras</h1>
        <a
          href="/"
          className="px-4 py-2 text-alma-dorado-oscuro border border-alma-dorado-oscuro rounded-md hover:bg-alma-dorado-claro/20 transition-colors font-medium"
        >
          ← Seguir comprando
        </a>
      </div>

      {/* Indicador de pasos */}
      <CheckoutSteps currentStep={currentStep} />

      {/* Contenido según el paso actual */}
      {currentStep === 1 && (
        <Step1CartReview
          shippingOption={shippingOption}
          onShippingChange={setShippingOption}
          couponCode={couponCode}
          onCouponChange={setCouponCode}
          limaZone={limaZone}
          onZoneChange={setLimaZone}
          bottleReturns={bottleReturns}
          onBottleReturnsChange={setBottleReturns}
          onNext={handleStep1Next}
        />
      )}

      {currentStep === 2 && (
        <Step2ShippingInfo
          shippingInfo={shippingInfo}
          onShippingInfoChange={setShippingInfo}
          onBack={handleBack}
          onNext={handleStep2Next}
        />
      )}

      {currentStep === 3 && shippingInfo && shippingOption && (
        <Step3OrderReview
          shippingOption={shippingOption}
          couponCode={couponCode}
          shippingInfo={shippingInfo}
          limaZone={limaZone}
          bottleReturns={bottleReturns}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

