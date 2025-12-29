"use client";

import { CART_TEXTS } from "@/constants/texts";
import { getLocationConfig } from "@/lib/zones-config";
import type { ShippingOption, LimaZone } from "@/types/checkout";
import ZoneSelector from "./ZoneSelector";

const LOCATION = getLocationConfig();

interface ShippingOptionsProps {
  selectedOption: ShippingOption | null;
  onSelect: (option: ShippingOption) => void;
  selectedZone?: LimaZone;
  onZoneSelect?: (zone: LimaZone) => void;
}

export default function ShippingOptions({
  selectedOption,
  onSelect,
  selectedZone,
  onZoneSelect,
}: ShippingOptionsProps) {
  const options: Array<{ value: ShippingOption; title: string; description: string }> = [
    {
      value: "regular",
      title: CART_TEXTS.shipping.regular.title,
      description: CART_TEXTS.shipping.regular.description,
    },
    {
      value: "retiro",
      title: CART_TEXTS.shipping.retiro.title,
      description: CART_TEXTS.shipping.retiro.description,
    },
  ];

  // Expandir automáticamente cuando se selecciona "regular"
  const shouldShowZoneSelector = selectedOption === "regular" && onZoneSelect !== undefined;

  return (
    <div className="space-y-4">
      <p className="text-sm text-alma-dorado-oscuro/80 mb-4">{CART_TEXTS.totals.shipping.description}</p>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value}>
            <label
              className={`flex items-start gap-3 p-4 border-2 rounded-md cursor-pointer transition-colors ${
                selectedOption === option.value
                  ? "border-alma-dorado-oscuro bg-alma-dorado-claro/20"
                  : "border-alma-dorado-oscuro/30 hover:border-alma-dorado-oscuro/50 bg-white/10 backdrop-blur-sm"
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
                <p className="font-semibold text-alma-dorado-oscuro mb-1">{option.title}</p>
                <p className="text-sm text-alma-dorado-oscuro/70">{option.description}</p>
                {option.value === "retiro" && (
                  <p className="text-sm text-alma-dorado-oscuro/80 mt-2 font-medium">
                    Dirección: {LOCATION.address}
                  </p>
                )}
              </div>
            </label>

            {/* Mostrar selector de zonas cuando se selecciona "regular" */}
            {option.value === "regular" && shouldShowZoneSelector && onZoneSelect && (
              <div key={`zone-selector-${selectedOption}`} className="mt-1 ml-7 pr-4">
                <ZoneSelector selectedZone={selectedZone || null} onZoneSelect={onZoneSelect} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

