"use client";

import { Check, MessageCircle } from "lucide-react";

interface CheckoutStepsProps {
  currentStep: number;
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const steps = [
    { number: 1, label: "Carrito", showWhatsApp: false },
    { number: 2, label: "Info de Envío", showWhatsApp: false },
    { number: 3, label: "Revisa y paga", showWhatsApp: true },
  ];

  return (
    <div className="w-full mb-12 py-6">
      <div className="flex items-center justify-center max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const isInactive = currentStep < step.number;

          return (
            <div key={step.number} className="flex items-center flex-1">
              {/* Círculo del paso */}
              <div className="flex flex-col items-center relative z-10">
                {/* Círculo con estados - centrado con las líneas */}
                <div
                  className={`
                    relative w-9 h-9 rounded-full flex items-center justify-center mb-3
                    transition-all duration-300 ease-in-out
                    ${
                      isActive
                        ? "bg-alma-dorado-oscuro border-2 border-alma-dorado-oscuro shadow-lg shadow-alma-dorado-oscuro/30 scale-105"
                        : isCompleted
                        ? "bg-transparent border-2 border-alma-dorado-claro"
                        : "bg-transparent border-2 border-alma-dorado-oscuro/20"
                    }
                  `}
                >
                  {/* Contenido del círculo */}
                  {isCompleted ? (
                    <Check 
                      className={`w-4 h-4 text-alma-dorado-claro transition-all duration-300`}
                      strokeWidth={3}
                    />
                  ) : (
                    <span
                      className={`
                        text-[10px] font-semibold transition-all duration-300
                        ${
                          isActive
                            ? "text-alma-verde-profundo"
                            : "text-alma-dorado-oscuro/40"
                        }
                      `}
                    >
                      {step.number}
                    </span>
                  )}
                </div>

                {/* Etiqueta del paso - más cerca del círculo */}
                <span
                  className={`
                    text-sm text-center transition-all duration-300
                    ${
                      isActive
                        ? "text-alma-dorado-claro font-medium"
                        : isCompleted
                        ? "text-alma-dorado-claro/70 font-normal"
                        : "text-alma-dorado-oscuro/40 font-normal"
                    }
                  `}
                >
                  {step.label}
                  {step.showWhatsApp && (
                    <MessageCircle 
                      className="inline-block w-3 h-3 ml-0.5 align-sub"
                      style={{ verticalAlign: 'sub' }}
                    />
                  )}
                </span>
              </div>

              {/* Línea conectora */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative overflow-hidden">
                  {/* Línea de fondo (siempre visible pero sutil) */}
                  <div className="absolute inset-0 bg-alma-dorado-oscuro/10" />
                  
                  {/* Línea de progreso (se llena cuando el paso está completado) */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-r from-alma-dorado-claro to-alma-dorado-oscuro
                      transition-all duration-500 ease-in-out origin-left
                      ${
                        isCompleted
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0"
                      }
                    `}
                    style={{
                      transform: isCompleted ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

