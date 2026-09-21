import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

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
    <html lang="es" className={`${outfit.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col font-sans text-alma-dorado-oscuro antialiased">
        <CartProvider>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

