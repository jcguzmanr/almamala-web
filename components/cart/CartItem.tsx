"use client";

import type { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/cart";
import Image from "next/image";
import { getImagenPath } from "@/lib/productos";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const imagenPath = getImagenPath(item.imagen);
  const subtotal = item.precio * item.cantidad;

  const handleDecrease = () => {
    if (item.cantidad > 1) {
      updateQuantity(item.productoId, item.volumen, item.cantidad - 1);
    } else {
      removeItem(item.productoId, item.volumen);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.productoId, item.volumen, item.cantidad + 1);
  };

  return (
    <div className="flex gap-4 p-4 border border-alma-dorado-oscuro/30 rounded-lg bg-alma-blanco-hueso/95 backdrop-blur-sm shadow-md">
      {/* Imagen */}
      <div className="relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0">
        <Image
          src={imagenPath}
          alt={`${item.tipoPisco} - ${item.volumen}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 80px, 96px"
        />
      </div>

      {/* Información */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base md:text-lg text-alma-dorado-oscuro mb-1">
          {item.tipoPisco}
        </h3>
        <p className="text-sm text-alma-verde-profundo/80 mb-2">{item.volumen}</p>
        <p className="text-lg font-bold text-alma-dorado-claro">{formatPrice(item.precio)}</p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex flex-col items-center justify-between">
        <button
          onClick={() => removeItem(item.productoId, item.volumen)}
          className="p-1 text-alma-dorado-oscuro/50 hover:text-red-500 transition-colors"
          aria-label="Eliminar producto"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="p-1 rounded-full border border-alma-dorado-oscuro/40 hover:bg-alma-dorado-claro/20 transition-colors text-alma-dorado-oscuro"
            aria-label="Disminuir cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold text-alma-verde-profundo">{item.cantidad}</span>
          <button
            onClick={handleIncrease}
            className="p-1 rounded-full border border-alma-dorado-oscuro/40 hover:bg-alma-dorado-claro/20 transition-colors text-alma-dorado-oscuro"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>

        <p className="text-sm font-semibold text-alma-dorado-claro mt-2">
          {formatPrice(subtotal)}
        </p>
      </div>
    </div>
  );
}

