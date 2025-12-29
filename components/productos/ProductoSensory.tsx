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
    <div className="mt-6 pt-6">
      {/* Nutrition Facts Style Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-alma-dorado-oscuro mb-3">
          Perfil sensorial
        </h3>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 min-w-max pb-2">
        {/* NOSE */}
        {producto.nose && (
          <div className="flex flex-col gap-3 w-[280px] h-auto flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/30 justify-start items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Grape className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
              <h4 className="text-alma-dorado-oscuro font-bold text-base">NOSE</h4>
            </div>
            <p className="text-alma-dorado-oscuro/90 italic text-xs leading-relaxed line-clamp-2 pl-[15px] pr-[15px]">
              {producto.nose}
            </p>
          </div>
        )}

        {/* TASTE */}
        {producto.taste && (
          <div className="flex flex-col gap-3 w-[280px] h-auto flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/30 justify-start items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Wine className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
              <h4 className="text-alma-dorado-oscuro font-bold text-base">TASTE</h4>
            </div>
            <p className="text-alma-dorado-oscuro/90 italic text-xs leading-relaxed line-clamp-2 pl-[15px] pr-[15px]">
              {producto.taste}
            </p>
          </div>
        )}

        {/* FINISH */}
        {producto.finish && (
          <div className="flex flex-col gap-3 w-[280px] h-auto flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/30 justify-start items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
              <h4 className="text-alma-dorado-oscuro font-bold text-base">FINISH</h4>
            </div>
            <p className="text-alma-dorado-oscuro/90 italic text-xs leading-relaxed line-clamp-2 pl-[15px] pr-[15px]">
              {producto.finish}
            </p>
          </div>
        )}

        {/* ABV */}
        {producto.abv && (
          <div className="flex flex-col gap-3 w-[200px] h-auto flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/30 justify-center items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Percent className="w-4 h-4 text-alma-dorado-oscuro" />
            </div>
            <h4 className="text-alma-dorado-oscuro font-bold text-base">ABV</h4>
            <p className="text-alma-dorado-oscuro/90 font-semibold text-lg">
              {producto.abv}
            </p>
          </div>
        )}

        {/* COCKTAILS */}
        {producto.cocktails && (
          <div className="flex flex-col gap-3 w-[280px] h-auto flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-lg border border-alma-dorado-oscuro/30 justify-start items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                <GlassWater className="w-4 h-4 text-alma-dorado-oscuro" />
              </div>
              <h4 className="text-alma-dorado-oscuro font-bold text-base">COCKTAILS</h4>
            </div>
            <p className="text-alma-dorado-oscuro/90 text-xs leading-relaxed line-clamp-2 pl-[15px] pr-[15px]">
              {producto.cocktails}
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

