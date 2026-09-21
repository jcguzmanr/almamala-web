"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import CartButton from "@/components/cart/CartButton";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  centerDesktop?: ReactNode;
  below?: ReactNode;
};

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro",
        current
          ? "bg-white/15 text-alma-dorado-claro shadow-sm ring-1 ring-alma-dorado-oscuro/50"
          : "text-alma-blanco-hueso/85 hover:bg-white/10 hover:text-alma-dorado-claro"
      )}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader({ centerDesktop, below }: SiteHeaderProps) {
  const pathname = usePathname();
  const isMarca = pathname === "/marca";
  const isComprar = pathname === "/" || pathname === "/carrito";

  return (
    <header className="sticky top-0 z-20 border-b border-alma-dorado-oscuro/20 bg-alma-verde-profundo/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-3 py-3 md:px-8 md:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro"
            >
              <Image
                src="/images/logo_am.svg"
                alt="Alma Mala — ir a comprar"
                width={145}
                height={36}
                className="h-7 w-auto md:h-9"
                priority
              />
            </Link>
            <nav aria-label="Principal" className="flex items-center gap-1">
              <NavLink href="/marca" current={isMarca}>
                <span className="sm:hidden">Marca</span>
                <span className="hidden sm:inline">La marca</span>
              </NavLink>
              <NavLink href="/" current={isComprar}>
                Comprar
              </NavLink>
            </nav>
          </div>

          {centerDesktop ? (
            <div className="mx-2 hidden flex-1 justify-center md:flex">
              {centerDesktop}
            </div>
          ) : null}

          <div className="flex-shrink-0">
            <CartButton />
          </div>
        </div>

        {below}
      </div>
    </header>
  );
}
