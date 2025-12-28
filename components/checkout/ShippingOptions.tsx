"use client";

import { CART_TEXTS } from "@/constants/texts";
import type { ShippingOption } from "@/types/checkout";

interface ShippingOptionsProps {
  selectedOption: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
}

export default function ShippingOptions({ selectedOption, onSelect }: ShippingOptionsProps) {
  const options: Array<{ value: ShippingOption; title: string; description: string }> = [
    {
      value: "regular",
      title: CART_TEXTS.shipping.regular.title,
      description: CART_TEXTS.shipping.regular.description,
    },
    {
      value: "gratuito",
      title: CART_TEXTS.shipping.gratuito.title,
      description: CART_TEXTS.shipping.gratuito.description,
    },
    {
      value: "retiro",
      title: CART_TEXTS.shipping.retiro.title,
      description: CART_TEXTS.shipping.retiro.description,
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-alma-dorado-oscuro mb-2">
          {CART_TEXTS.totals.shipping.label}
        </h3>
        <p className="text-sm text-alma-verde-profundo/80 mb-4">{CART_TEXTS.totals.shipping.description}</p>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedOption === option.value
                ? "border-alma-dorado-oscuro bg-alma-dorado-claro/20"
                : "border-alma-dorado-oscuro/30 hover:border-alma-dorado-oscuro/50 bg-white/50"
            }`}
          >
            <input
              type="radio"
              name="shipping"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onSelect(option.value)}
              className="mt-1 accent-alma-dorado-oscuro"
            />
            <div className="flex-1">
              <p className="font-semibold text-alma-verde-profundo mb-1">{option.title}</p>
              <p className="text-sm text-alma-verde-profundo/70">{option.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

