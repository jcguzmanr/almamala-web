"use client";

import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <Link
      href="/carrito"
      className="relative inline-flex items-center justify-center p-2 text-alma-dorado-claro hover:text-alma-dorado-oscuro transition-colors"
      aria-label="Ver carrito"
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-alma-dorado-oscuro text-alma-verde-profundo text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}

