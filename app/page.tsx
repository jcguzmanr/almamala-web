import ProductosList from "@/components/productos/ProductosList";
import CartButton from "@/components/cart/CartButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header con carrito */}
      <header className="bg-alma-verde-profundo/90 backdrop-blur-sm border-b border-alma-dorado-oscuro/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-alma-dorado-oscuro">Alma Mala</h1>
          <CartButton />
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-8 px-4 md:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-alma-dorado-claro mb-4">
            Catálogo de productos
          </h2>
          <p className="text-lg md:text-xl text-alma-dorado-oscuro/90">
            Descubre nuestra selección de piscos premium
          </p>
        </div>

        {/* Catálogo */}
        <ProductosList />
      </div>
    </main>
  );
}
