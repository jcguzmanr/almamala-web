import SiteHeader from "@/components/layout/SiteHeader";
import BetaTag from "@/components/BetaTag";
import { getPageContent } from "@/lib/pages-content";
import { notFound } from "next/navigation";

export default function ContentPage({ slug }: { slug: string }) {
  const pageContent = getPageContent(slug);

  if (!pageContent) {
    notFound();
  }

  return (
    <main className="flex-1">
      <SiteHeader />
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <BetaTag />
        <h1 className="mb-6 font-serif text-3xl font-semibold text-alma-dorado-claro md:text-4xl">
          {pageContent.title}
        </h1>
        <div className="prose prose-invert max-w-none">
          <div className="whitespace-pre-line leading-relaxed text-alma-dorado-oscuro/90">
            {pageContent.content}
          </div>
        </div>
      </div>
    </main>
  );
}
