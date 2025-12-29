"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/types/cart";
import type { BottleReturn } from "@/types/checkout";
import BetaTag from "@/components/BetaTag";

interface BottleReturnProps {
  returns: BottleReturn[];
  onReturnsChange: (returns: BottleReturn[]) => void;
}

export default function BottleReturn({ returns, onReturnsChange }: BottleReturnProps) {
  const { items } = useCart();
  const [localReturns, setLocalReturns] = useState<BottleReturn[]>(returns);
  const [isExpanded, setIsExpanded] = useState(false);
  const itemsKeyRef = useRef<string>("");

  // Sincronizar returns iniciales desde props
  useEffect(() => {
    setLocalReturns(returns);
  }, [returns]);

  // Sincronizar cuando cambian los items del carrito (solo estructura, no valores)
  useEffect(() => {
    const itemsKey = items.map((i) => `${i.productoId}-${i.volumen}`).sort().join(",");
    
    // Solo sincronizar si cambió la estructura de items
    if (itemsKey !== itemsKeyRef.current && itemsKey !== "") {
      itemsKeyRef.current = itemsKey;

      if (items.length === 0) {
        setLocalReturns([]);
        onReturnsChange([]);
        return;
      }

      // Crear mapa de returns existentes por productoId-volumen (usar returns de props)
      const existingReturnsMap = new Map(
        returns.map((r) => [`${r.productoId}-${r.volumen}`, r])
      );

      // Crear nuevos returns basados en items actuales
      const updatedReturns: BottleReturn[] = items.map((item) => {
        const key = `${item.productoId}-${item.volumen}`;
        const existing = existingReturnsMap.get(key);
        return (
          existing || {
            productoId: item.productoId,
            volumen: item.volumen,
            cantidad: 0,
          }
        );
      });

      setLocalReturns(updatedReturns);
      onReturnsChange(updatedReturns);
    }
  }, [items, returns, onReturnsChange]);

  const handleReturnChange = (productoId: string, volumen: string, cantidad: number) => {
    const item = items.find((i) => i.productoId === productoId && i.volumen === volumen);
    if (!item) return;

    // Validar que no exceda la cantidad comprada
    const maxReturn = item.cantidad;
    const validCantidad = Math.max(0, Math.min(cantidad, maxReturn));

    const updated = localReturns.map((r) =>
      r.productoId === productoId && r.volumen === volumen
        ? { ...r, cantidad: validCantidad }
        : r
    );

    setLocalReturns(updated);
    onReturnsChange(updated);
  };

  const getProductName = (item: CartItem): string => {
    return `${item.tipoPisco} ${item.volumen}`;
  };

  if (items.length === 0) {
    return null;
  }

  // Verificar si hay botellas devueltas para mantener expandido
  const hasReturns = localReturns.some((r) => r.cantidad > 0);
  const shouldBeExpanded = isExpanded || hasReturns;

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-md border border-alma-dorado-oscuro/20 shadow-lg">
      {/* Botón expandible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left transition-colors hover:bg-white/5 rounded-md p-2 -m-2"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-alma-dorado-claro">Devolución de botellas</h2>
          <BetaTag />
        </div>
        <span className="text-alma-dorado-oscuro text-sm">
          {shouldBeExpanded ? "−" : "+"}
        </span>
      </button>

      {/* Contenido expandible */}
      {shouldBeExpanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <p className="text-sm text-alma-dorado-oscuro/80">
            ¿Tienes botellas vacías de Alma Mala? Indica cuántas devolverás y recibe un beneficio por cada una.
          </p>

          <div className="space-y-4">
            {items.map((item) => {
              const returnItem = localReturns.find(
                (r) => r.productoId === item.productoId && r.volumen === item.volumen
              );
              const returnCount = returnItem?.cantidad || 0;

              return (
                <div key={`${item.productoId}-${item.volumen}`} className="space-y-2">
                  <label className="block text-sm font-medium text-alma-dorado-oscuro">
                    {getProductName(item)}
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-alma-dorado-oscuro/70 whitespace-nowrap">
                      Botellas que devolverás:
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={item.cantidad}
                      value={returnCount}
                      onChange={(e) =>
                        handleReturnChange(item.productoId, item.volumen, parseInt(e.target.value) || 0)
                      }
                      className="flex-1 px-3 py-2 bg-white/10 border border-alma-dorado-oscuro/30 rounded-md text-alma-dorado-oscuro focus:outline-none focus:border-alma-dorado-oscuro focus:ring-1 focus:ring-alma-dorado-oscuro"
                    />
                    <span className="text-xs text-alma-dorado-oscuro/60 whitespace-nowrap">
                      (máx. {item.cantidad})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3">
            <p className="text-xs text-alma-dorado-oscuro/50">
              La devolución de botellas está sujeta a validación física al momento de la entrega o coordinación posterior. Alma Mala se reserva el derecho de ajustar el beneficio si las botellas no cumplen condiciones mínimas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

