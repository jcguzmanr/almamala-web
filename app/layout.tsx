import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "Alma Mala - Pisco Premium",
  description: "Catálogo de productos Alma Mala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased text-alma-dorado-oscuro">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}

