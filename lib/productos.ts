import type { ProductosData, Producto } from "@/types/productos";
import productosData from "@/productos.json";

// Validar que el JSON tiene la estructura correcta
const productosDataTyped = productosData as ProductosData;

// Cache en memoria para evitar re-lecturas
let productosCache: Producto[] | null = null;

/**
 * Obtiene todos los productos del catálogo
 * @returns Array de productos tipados
 */
export function getProductos(): Producto[] {
  // Retornar cache si existe
  if (productosCache) {
    return productosCache;
  }

  // Validar estructura básica
  if (!productosDataTyped?.productos || !Array.isArray(productosDataTyped.productos)) {
    console.error("Error: productos.json no tiene la estructura esperada", productosDataTyped);
    return [];
  }

  // Validar que cada producto tiene la estructura mínima
  const productosValidos = productosDataTyped.productos.filter((producto) => {
    return (
      producto.categoria &&
      producto.tipoPisco &&
      producto.descripcion &&
      producto.items &&
      Array.isArray(producto.items) &&
      producto.items.length > 0
    );
  });

  console.log("Productos válidos encontrados:", productosValidos.length);

  // Guardar en cache
  productosCache = productosValidos;

  return productosValidos;
}

/**
 * Obtiene la ruta de una imagen basada en el nombre
 * @param nombreImagen - Nombre de la imagen (ej: "500ML", "750ML", "DAMAJUANA")
 * @returns Ruta completa de la imagen
 */
export function getImagenPath(nombreImagen: string): string {
  // Mapear nombre a ruta de imagen
  const imagenMap: Record<string, string> = {
    "500ML": "/images/500ML.png",
    "750ML": "/images/750ML.png",
    "DAMAJUANA": "/images/DAMAJUANA.png",
  };

  return imagenMap[nombreImagen] || "/images/500ML.png"; // Fallback
}

