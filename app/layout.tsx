import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Alma Mala | Desde Mala, Perú",
  description: "Alma Mala, desde Mala, Perú. Un destilado trabajado con respeto por la uva, el proceso y el territorio.",
  openGraph: {
    title: "Alma Mala | Desde Mala, Perú",
    description: "Alma Mala, desde Mala, Perú. Un destilado trabajado con respeto por la uva, el proceso y el territorio.",
    images: [
      {
        url: "/images/metatag.png",
        width: 1200,
        height: 630,
        alt: "Alma Mala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alma Mala | Desde Mala, Perú",
    description: "Alma Mala, desde Mala, Perú. Un destilado trabajado con respeto por la uva, el proceso y el territorio.",
    images: ["/images/metatag.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased text-alma-dorado-oscuro flex flex-col min-h-screen">
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

