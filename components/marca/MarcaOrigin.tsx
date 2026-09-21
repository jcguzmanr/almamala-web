import { marcaOrigin } from "@/data/brand";
import GlassPanel from "./GlassPanel";

export default function MarcaOrigin() {
  return (
    <section
      aria-labelledby="origen-heading"
      className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-alma-dorado-claro">
            {marcaOrigin.kicker}
          </p>
          <h2
            id="origen-heading"
            className="mt-3 font-serif text-3xl font-semibold text-alma-blanco-hueso md:text-5xl"
          >
            {marcaOrigin.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-alma-blanco-hueso/90 md:text-lg">
            {marcaOrigin.body}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-4">
          {marcaOrigin.proofs.map((proof) => (
            <GlassPanel
              key={proof.label}
              className="rounded-2xl px-5 py-4 md:px-6 md:py-5"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-alma-dorado-claro">
                {proof.label}
              </p>
              <p className="mt-1 font-serif text-xl text-alma-blanco-hueso md:text-2xl">
                {proof.value}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-alma-blanco-hueso/75">
                {proof.detail}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}
