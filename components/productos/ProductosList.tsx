"use client";

import { useEffect, useState } from "react";
import type { Producto } from "@/types/productos";
import { getProductos } from "@/lib/productos";
import ProductoCard from "./ProductoCard";

export default function ProductosList() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const productosData = getProductos();
      setProductos(productosData);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los productos");
      setLoading(false);
      console.error("Error loading productos:", err);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-alma-dorado-oscuro"></div>
        <p className="text-alma-dorado-claro">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-alma-dorado-claro">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {productos.map((producto, index) => (
        <ProductoCard key={`${producto.categoria}-${index}`} producto={producto} />
      ))}
    </div>
  );
}

