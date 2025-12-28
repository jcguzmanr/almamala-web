"use client";

import { useState } from "react";
import { CART_TEXTS } from "@/constants/texts";

interface CouponFieldProps {
  value: string | null;
  onChange: (code: string | null) => void;
}

export default function CouponField({ value, onChange }: CouponFieldProps) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleApply = () => {
    if (inputValue.trim()) {
      onChange(inputValue.trim());
    } else {
      onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <h3 className="text-lg font-semibold text-alma-dorado-oscuro mb-2">{CART_TEXTS.coupon.title}</h3>
        <p className="text-sm text-alma-verde-profundo/80 mb-4">{CART_TEXTS.coupon.description}</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={CART_TEXTS.coupon.label}
          className="flex-1 px-4 py-2 border border-alma-dorado-oscuro/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-alma-dorado-oscuro bg-white text-alma-verde-profundo"
        />
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-alma-verde-seco text-alma-dorado-claro rounded-lg hover:bg-alma-verde-profundo transition-colors font-medium"
        >
          {CART_TEXTS.coupon.button}
        </button>
      </div>

      <p className="text-xs text-alma-dorado-oscuro/70 italic">{CART_TEXTS.coupon.note}</p>
    </div>
  );
}

