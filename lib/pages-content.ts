import pagesContent from "@/data/pages-content.json";

export type PageContent = {
  title: string;
  content: string;
};

export function getPageContent(slug: string): PageContent | null {
  const content = (pagesContent as Record<string, PageContent>)[slug];
  return content || null;
}

export function getAllPageSlugs(): string[] {
  return Object.keys(pagesContent);
}


