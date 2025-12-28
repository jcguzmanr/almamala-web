"use client";

import { useState } from "react";
import Image from "next/image";
import type { Presentacion } from "@/types/productos";
import type { Producto } from "@/types/productos";
import { getImagenPath } from "@/lib/productos";
import { useCart } from "@/contexts/CartContext";
import { parsePrice } from "@/lib/cart";
import { Plus, Check, Minus } from "lucide-react";

interface PresentacionItemProps {
  presentacion: Presentacion;
  producto: Producto;
}

export default function PresentacionItem({ presentacion, producto }: PresentacionItemProps) {
  const { addItem } = useCart();
  const imagenPath = getImagenPath(presentacion.imagen);

  const [adding, setAdding] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const handleDecrease = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const handleIncrease = () => {
    setCantidad(cantidad + 1);
  };

  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setCantidad(value);
    } else if (e.target.value === "") {
      setCantidad(1);
    }
  };

  const handleAddToCart = () => {
    setAdding(true);
    // Crear ID único para el producto
    const productoId = `${producto.categoria}-${producto.tipoPisco}`;

    addItem({
      productoId,
      tipoPisco: producto.tipoPisco,
      categoria: producto.categoria,
      volumen: presentacion.volumen,
      precio: parsePrice(presentacion.precio),
      cantidad: cantidad,
      imagen: presentacion.imagen,
    });

    // Feedback visual y reset cantidad
    setTimeout(() => {
      setAdding(false);
      setCantidad(1);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-4 border border-alma-dorado-oscuro/30 rounded-lg bg-white/90 backdrop-blur-sm hover:shadow-lg hover:border-alma-dorado-claro/50 transition-all">
      <div className="relative w-24 h-32 md:w-32 md:h-40">
        <Image
          src={imagenPath}
          alt={`${presentacion.volumen} - ${presentacion.precio}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>
      <div className="text-center w-full">
        <p className="font-semibold text-sm md:text-base mb-1 text-alma-verde-profundo">{presentacion.volumen}</p>
        <p className="text-lg md:text-xl font-bold text-alma-dorado-oscuro mb-3">{presentacion.precio}</p>
        
        {/* Control de cantidad */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            onClick={handleDecrease}
            disabled={cantidad <= 1 || adding}
            className="p-1 rounded-full border border-alma-dorado-oscuro/40 hover:bg-alma-dorado-claro/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-alma-dorado-oscuro"
            aria-label="Disminuir cantidad"
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={handleCantidadChange}
            disabled={adding}
            className="w-16 text-center border border-alma-dorado-oscuro/40 rounded-lg px-2 py-1 text-sm md:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-alma-dorado-oscuro disabled:opacity-50 text-alma-verde-profundo bg-white"
            aria-label="Cantidad"
          />
          <button
            onClick={handleIncrease}
            disabled={adding}
            className="p-1 rounded-full border border-alma-dorado-oscuro/40 hover:bg-alma-dorado-claro/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-alma-dorado-oscuro"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAddToCart}
          disabled={adding}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
            adding
              ? "bg-alma-dorado-oscuro/80 text-alma-verde-profundo cursor-not-allowed"
              : "bg-alma-dorado-oscuro text-alma-verde-profundo hover:bg-alma-dorado-claro hover:text-alma-verde-profundo font-semibold"
          }`}
        >
          {adding ? (
            <>
              <Check size={16} />
              Agregado
            </>
          ) : (
            <>
              <Plus size={16} />
              Agregar {cantidad > 1 && `(${cantidad})`}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

