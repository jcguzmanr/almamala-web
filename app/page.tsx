"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductosList from "@/components/productos/ProductosList";
import PiscoTabs from "@/components/productos/PiscoTabs";
import { PiscoTabsProvider } from "@/components/productos/PiscoTabsContext";
import SiteHeader from "@/components/layout/SiteHeader";

export default function Home() {
  const [isTabsSticky, setIsTabsSticky] = useState(false);

  return (
    <PiscoTabsProvider>
      <main className="flex-1">
        <SiteHeader
          centerDesktop={isTabsSticky ? <PiscoTabs renderInHeader={true} /> : null}
          below={
            isTabsSticky ? (
              <div className="mt-2 md:hidden">
                <PiscoTabs renderInHeader={true} />
              </div>
            ) : null
          }
        />

        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo_am.svg"
              alt="Alma Mala"
              width={200}
              height={50}
              className="h-auto w-32 md:w-40"
              priority
            />
          </div>

          <div className="mb-8 flex justify-center">
            <Link
              href="/marca"
              className="inline-flex max-w-full items-center gap-2 rounded-full border border-alma-dorado-oscuro/30 bg-white/10 px-4 py-2 text-sm text-alma-blanco-hueso/90 backdrop-blur-md transition hover:border-alma-dorado-claro/60 hover:text-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro"
            >
              <span className="font-semibold text-alma-dorado-claro">La marca</span>
              <span className="hidden sm:inline text-alma-blanco-hueso/75">
                Valle de Mala · pisco craft
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <PiscoTabs onStickyChange={setIsTabsSticky} />

          <ProductosList />
        </div>
      </main>
    </PiscoTabsProvider>
  );
}
