"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCount, setPrevCount] = useState(itemCount);

  useEffect(() => {
    if (itemCount > prevCount && itemCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
    setPrevCount(itemCount);
  }, [itemCount, prevCount]);

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center justify-center p-2 text-alma-dorado-claro hover:text-alma-dorado-oscuro transition-all duration-300 hover:bg-alma-dorado-oscuro/20 rounded-full hover:scale-110"
      aria-label="Ver carrito"
    >
      <ShoppingCart size={24} className="transition-transform duration-300" />
      {itemCount > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-alma-dorado-oscuro text-alma-verde-profundo text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all duration-300 ${
            isAnimating
              ? "animate-[pop_0.6s_ease-out] scale-125"
              : "scale-100"
          }`}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}

