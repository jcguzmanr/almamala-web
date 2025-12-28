import Cart from "@/components/cart/Cart";
import CartButton from "@/components/cart/CartButton";

export default function CarritoPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-alma-verde-profundo/90 backdrop-blur-sm border-b border-alma-dorado-oscuro/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl md:text-3xl font-bold text-alma-dorado-oscuro">
            Alma Mala
          </a>
          <CartButton />
        </div>
      </header>

      <Cart />
    </main>
  );
}

