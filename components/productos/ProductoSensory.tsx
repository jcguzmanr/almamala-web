"use client";

import { Grape, Wine, Sparkles, Percent, GlassWater } from "lucide-react";
import type { Producto } from "@/types/productos";

interface ProductoSensoryProps {
  producto: Producto;
}

export default function ProductoSensory({ producto }: ProductoSensoryProps) {
  if (!producto.nose && !producto.taste && !producto.finish && !producto.abv && !producto.cocktails) {
    return null;
  }

  return (
    <div className="mt-6 pt-6 border-t border-alma-dorado-oscuro/30">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NOSE */}
        {producto.nose && (
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-alma-dorado-oscuro/20 flex items-center justify-center border-2 border-alma-dorado-oscuro/50">
                <Grape className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-alma-dorado-oscuro font-bold text-base mb-1.5">NOSE</h4>
              <p className="text-alma-verde-profundo/90 italic text-sm leading-relaxed">
                {producto.nose}
              </p>
            </div>
          </div>
        )}

        {/* TASTE */}
        {producto.taste && (
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-alma-dorado-oscuro/20 flex items-center justify-center border-2 border-alma-dorado-oscuro/50">
                <Wine className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-alma-dorado-oscuro font-bold text-base mb-1.5">TASTE</h4>
              <p className="text-alma-verde-profundo/90 italic text-sm leading-relaxed">
                {producto.taste}
              </p>
            </div>
          </div>
        )}

        {/* FINISH */}
        {producto.finish && (
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-alma-dorado-oscuro/20 flex items-center justify-center border-2 border-alma-dorado-oscuro/50">
                <Sparkles className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-alma-dorado-oscuro font-bold text-base mb-1.5">FINISH</h4>
              <p className="text-alma-verde-profundo/90 italic text-sm leading-relaxed">
                {producto.finish}
              </p>
            </div>
          </div>
        )}

        {/* ABV y COCKTAILS en la misma fila */}
        <div className="flex flex-wrap gap-6 md:col-span-2 pt-2">
          {/* ABV */}
          {producto.abv && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-alma-dorado-oscuro/20 flex items-center justify-center border-2 border-alma-dorado-oscuro/50">
                  <Percent className="w-4 h-4 text-alma-dorado-oscuro" />
                </div>
              </div>
              <div>
                <h4 className="text-alma-dorado-oscuro font-bold text-base mb-1">ABV</h4>
                <p className="text-alma-verde-profundo/90 font-semibold text-sm">
                  {producto.abv}
                </p>
              </div>
            </div>
          )}

          {/* COCKTAILS */}
          {producto.cocktails && (
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-alma-dorado-oscuro/20 flex items-center justify-center border-2 border-alma-dorado-oscuro/50">
                  <GlassWater className="w-4 h-4 text-alma-dorado-oscuro" />
                </div>
              </div>
              <div>
                <h4 className="text-alma-dorado-oscuro font-bold text-base mb-1">COCKTAILS</h4>
                <p className="text-alma-verde-profundo/90 text-sm">
                  {producto.cocktails}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

