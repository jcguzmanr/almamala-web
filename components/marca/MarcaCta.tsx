import Link from "next/link";
import { getWhatsAppDisplayNumber, getWhatsAppNumber } from "@/lib/app-config";
import { brand, marcaCta } from "@/data/brand";
import GlassPanel from "./GlassPanel";

export default function MarcaCta() {
  const href = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(brand.whatsappIntro)}`;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-4 md:px-8 md:pb-28">
      <GlassPanel className="rounded-3xl px-6 py-10 text-center md:px-16 md:py-14">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-alma-dorado-claro">
          {marcaCta.kicker}
        </p>
        <h2 className="mt-3 font-serif text-3xl font-semibold text-alma-blanco-hueso md:text-5xl">
          {marcaCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-alma-blanco-hueso/90">
          {marcaCta.body}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-alma-dorado-oscuro px-6 py-2.5 text-sm font-semibold text-alma-verde-profundo transition hover:bg-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro sm:w-auto"
          >
            {marcaCta.primary}
          </Link>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-alma-dorado-oscuro/50 bg-white/5 px-6 py-2.5 text-sm font-semibold text-alma-blanco-hueso transition hover:border-alma-dorado-claro hover:text-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro sm:w-auto"
          >
            {marcaCta.secondary}
            <span className="sr-only">{` ${getWhatsAppDisplayNumber()}`}</span>
          </a>
        </div>
        <p className="mt-6 text-xs text-alma-blanco-hueso/65">{marcaCta.ageNote}</p>
      </GlassPanel>
    </section>
  );
}
