import Image from "next/image";
import CartButton from "@/components/cart/CartButton";
import BetaTag from "@/components/BetaTag";
import { getPageContent } from "@/lib/pages-content";
import { notFound } from "next/navigation";

export default function PreguntasFrecuentesPage() {
  const pageContent = getPageContent("preguntas-frecuentes");

  if (!pageContent) {
    notFound();
  }

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="bg-alma-verde-profundo/90 backdrop-blur-sm border-b border-alma-dorado-oscuro/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <Image
              src="/images/logo_am.svg"
              alt="Alma Mala"
              width={145}
              height={36}
              className="h-8 md:h-9 w-auto"
              priority
            />
          </a>
          <CartButton />
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
        <BetaTag />
        <h1 className="text-3xl md:text-4xl font-bold text-alma-dorado-claro mb-6">
          {pageContent.title}
        </h1>
        <div className="prose prose-invert max-w-none">
          <div className="text-alma-dorado-oscuro/90 whitespace-pre-line leading-relaxed">
            {pageContent.content}
          </div>
        </div>
      </div>
    </main>
  );
}

