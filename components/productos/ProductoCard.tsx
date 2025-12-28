import type { Producto } from "@/types/productos";
import PresentacionItem from "./PresentacionItem";

interface ProductoCardProps {
  producto: Producto;
}

export default function ProductoCard({ producto }: ProductoCardProps) {
  return (
    <div className="bg-alma-blanco-hueso/95 backdrop-blur-sm rounded-lg shadow-lg border border-alma-dorado-oscuro/20 p-6 space-y-4">
      {/* Header */}
      <div className="border-b border-alma-dorado-oscuro/30 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-alma-dorado-oscuro mb-2">
          {producto.tipoPisco}
        </h2>
        <p className="text-sm md:text-base text-alma-verde-profundo/80 mb-2">{producto.descripcion}</p>
        <p className="text-sm md:text-base text-alma-dorado-oscuro/70 italic">
          {producto.disfrutaloEn}
        </p>
      </div>

      {/* Presentaciones */}
      <div>
        <h3 className="text-lg font-semibold text-alma-dorado-oscuro mb-3">Presentaciones disponibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {producto.items.map((presentacion, index) => (
            <PresentacionItem
              key={`${presentacion.volumen}-${index}`}
              presentacion={presentacion}
              producto={producto}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

