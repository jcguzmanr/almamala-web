"use client";

import Image from "next/image";
import { useState } from "react";
import ProductosList from "@/components/productos/ProductosList";
import CartButton from "@/components/cart/CartButton";
import PiscoTabs from "@/components/productos/PiscoTabs";
import { PiscoTabsProvider } from "@/components/productos/PiscoTabsContext";

export default function Home() {
  const [isTabsSticky, setIsTabsSticky] = useState(false);

  return (
    <PiscoTabsProvider>
      <main className="flex-1">
        {/* Header con carrito */}
        <header className="bg-alma-verde-profundo/90 backdrop-blur-sm border-b border-alma-dorado-oscuro/20 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-2 md:px-4 lg:px-8 py-3 md:py-4">
            {/* Primera fila: Logo y Carrito */}
            <div className="flex justify-between items-center gap-2 mb-2 md:mb-0">
              <a href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/images/logo_am.svg"
                  alt="Alma Mala"
                  width={145}
                  height={36}
                  className="h-7 md:h-9 w-auto"
                  priority
                />
              </a>
              {/* Tabs sticky en desktop - misma fila */}
              {isTabsSticky && (
                <div className="hidden md:flex flex-1 justify-center mx-4">
                  <PiscoTabs renderInHeader={true} />
                </div>
              )}
              <div className="flex-shrink-0">
                <CartButton />
              </div>
            </div>
            {/* Segunda fila en mobile: Tabs sticky */}
            {isTabsSticky && (
              <div className="md:hidden">
                <PiscoTabs renderInHeader={true} />
              </div>
            )}
          </div>
        </header>

        <div className="max-w-6xl mx-auto py-8 px-4 md:px-8">
          {/* Logo grande */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo_am.svg"
              alt="Alma Mala"
              width={200}
              height={50}
              className="w-32 md:w-40 h-auto"
              priority
            />
          </div>

          {/* Tabs de navegación */}
          <PiscoTabs onStickyChange={setIsTabsSticky} />

          {/* Catálogo */}
          <ProductosList />
        </div>
      </main>
    </PiscoTabsProvider>
  );
}
