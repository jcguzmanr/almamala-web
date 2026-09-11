import { cn } from "@/lib/utils";
import { marcaPillars } from "@/data/brand";
import GlassPanel from "./GlassPanel";

export default function MarcaPillars() {
  return (
    <section
      aria-labelledby="pilares-heading"
      className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-alma-dorado-claro">
          Pilares
        </p>
        <h2
          id="pilares-heading"
          className="mt-3 font-serif text-3xl font-semibold text-alma-blanco-hueso md:text-5xl"
        >
          Cómo se sostiene la marca
        </h2>
        <p className="mt-4 text-base leading-relaxed text-alma-blanco-hueso/90">
          Cinco acentos, con peso distinto. La sostenibilidad aparece al final — y
          solo con prueba concreta.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-6">
        {marcaPillars.map((pillar) => (
          <GlassPanel
            key={pillar.id}
            as="article"
            className={cn(
              "rounded-2xl p-5 md:p-6",
              pillar.emphasis === "primary" && "md:col-span-6 md:p-8",
              pillar.emphasis === "secondary" && "md:col-span-3",
              pillar.emphasis === "quiet" && "md:col-span-3"
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3
                className={cn(
                  "font-serif font-semibold text-alma-blanco-hueso",
                  pillar.emphasis === "primary"
                    ? "text-2xl md:text-3xl"
                    : "text-xl md:text-2xl"
                )}
              >
                {pillar.name}
              </h3>
              <span className="font-sans text-xs tabular-nums text-alma-dorado-claro/90">
                {pillar.weight}%
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-alma-dorado-claro">
              {pillar.kicker}
            </p>
            <p
              className={cn(
                "mt-3 leading-relaxed text-alma-blanco-hueso/85",
                pillar.emphasis === "primary" ? "text-base md:text-lg" : "text-sm md:text-base",
                pillar.emphasis === "quiet" && "text-sm"
              )}
            >
              {pillar.body}
            </p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
}
