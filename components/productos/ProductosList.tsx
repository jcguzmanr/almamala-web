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
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/ProductosList.tsx:13',message:'ProductosList useEffect starting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    try {
      console.log("Loading productos...");
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/ProductosList.tsx:16',message:'Calling getProductos',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      const productosData = getProductos();
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/ProductosList.tsx:17',message:'getProductos returned',data:{count:productosData?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
      console.log("Productos loaded:", productosData);
      setProductos(productosData);
      setLoading(false);
    } catch (err) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/ProductosList.tsx:22',message:'Error in ProductosList useEffect',data:{error:String(err)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      
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

