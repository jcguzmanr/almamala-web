import Cart from "@/components/cart/Cart";
import SiteHeader from "@/components/layout/SiteHeader";

export default function CarritoPage() {
  return (
    <main className="flex-1">
      <SiteHeader />
      <Cart />
    </main>
  );
}
