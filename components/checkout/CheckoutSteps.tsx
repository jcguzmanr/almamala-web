"use client";

interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, label: "Carrito y envío" },
    { number: 2, label: "Información de envío" },
    { number: 3, label: "Revisar pedido" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Círculo del paso */}
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                  currentStep === step.number
                    ? "bg-alma-dorado-oscuro text-alma-verde-profundo border-alma-dorado-oscuro"
                    : currentStep > step.number
                    ? "bg-alma-dorado-claro text-alma-verde-profundo border-alma-dorado-claro"
                    : "bg-white/20 text-alma-dorado-oscuro/50 border-alma-dorado-oscuro/30"
                }`}
              >
                {currentStep > step.number ? "✓" : step.number}
              </div>
              <span
                className={`text-xs mt-2 text-center hidden sm:block ${
                  currentStep >= step.number ? "text-alma-dorado-claro font-medium" : "text-alma-dorado-oscuro/50"
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Línea conectora */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  currentStep > step.number ? "bg-alma-dorado-claro" : "bg-alma-dorado-oscuro/30"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

