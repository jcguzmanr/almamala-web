import Link from "next/link";
import { getWhatsAppDisplayNumber, getWhatsAppNumber } from "@/lib/app-config";
import { brand, marcaHero } from "@/data/brand";
import BrandMark from "./BrandMark";
import GlassPanel from "./GlassPanel";

function whatsappHref() {
  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(brand.whatsappIntro)}`;
}

export default function MarcaHero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16">
      <div className="marca-hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl">
        <GlassPanel className="rounded-3xl px-6 py-10 text-center md:px-12 md:py-14">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.22em] text-alma-dorado-claro">
            {marcaHero.eyebrow}
          </p>
          <div className="mt-6 md:mt-8">
            <BrandMark size="hero" priority />
          </div>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-alma-blanco-hueso md:text-6xl md:leading-[1.1]">
            {marcaHero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-alma-blanco-hueso/90 md:text-lg">
            {marcaHero.lead}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-alma-dorado-oscuro px-6 py-2.5 text-sm font-semibold text-alma-verde-profundo transition hover:bg-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro sm:w-auto"
            >
              {marcaHero.primaryCta}
            </Link>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-alma-dorado-oscuro/50 bg-white/5 px-6 py-2.5 text-sm font-semibold text-alma-blanco-hueso transition hover:border-alma-dorado-claro hover:text-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro sm:w-auto"
            >
              {marcaHero.secondaryCta}
              <span className="sr-only">
                {` al ${getWhatsAppDisplayNumber()}`}
              </span>
            </a>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
