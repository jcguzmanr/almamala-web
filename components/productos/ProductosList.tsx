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
      console.log("Loading productos...");
      const productosData = getProductos();
      console.log("Productos loaded:", productosData);
      setProductos(productosData);
      setLoading(false);
    } catch (err) {
      console.error("Error loading productos:", err);
      setError("Error al cargar los productos");
      setLoading(false);
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

