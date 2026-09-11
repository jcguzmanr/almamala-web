import type { Metadata } from "next";
import SiteHeader from "@/components/layout/SiteHeader";
import MarcaCraft from "@/components/marca/MarcaCraft";
import MarcaCta from "@/components/marca/MarcaCta";
import MarcaHero from "@/components/marca/MarcaHero";
import MarcaOrigin from "@/components/marca/MarcaOrigin";
import MarcaPillars from "@/components/marca/MarcaPillars";
import { marcaHero } from "@/data/brand";

export const metadata: Metadata = {
  title: "La marca | Alma Mala",
  description:
    "Alma Mala, pisco craft del Valle de Mala. Mesa contemporánea, uva precisa, prueba de lugar. Lima y Países Bajos.",
  openGraph: {
    title: "La marca | Alma Mala",
    description:
      "Alma Mala, pisco craft del Valle de Mala. Mesa contemporánea, uva precisa, prueba de lugar.",
    images: [
      {
        url: "/images/metatag.png",
        width: 1200,
        height: 630,
        alt: "Alma Mala",
      },
    ],
  },
};

export default function MarcaPage() {
  return (
    <main className="flex-1">
      <a href="#marca-contenido" className="skip-link">
        {marcaHero.skip}
      </a>
      <SiteHeader />
      <div id="marca-contenido">
        <MarcaHero />
        <MarcaOrigin />
        <MarcaPillars />
        <MarcaCraft />
        <MarcaCta />
      </div>
    </main>
  );
}
