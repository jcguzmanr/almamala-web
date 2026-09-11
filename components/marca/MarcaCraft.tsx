import Link from "next/link";
import { getProductos } from "@/lib/productos";
import { marcaCraft } from "@/data/brand";
import GlassPanel from "./GlassPanel";

export default function MarcaCraft() {
  const productos = getProductos();

  return (
    <section
      aria-labelledby="craft-heading"
      className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-20"
    >
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-alma-dorado-claro">
          {marcaCraft.kicker}
        </p>
        <h2
          id="craft-heading"
          className="mt-3 font-serif text-3xl font-semibold text-alma-blanco-hueso md:text-5xl"
        >
          {marcaCraft.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-alma-blanco-hueso/88">
          {marcaCraft.lead}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {productos.map((producto) => {
          const occasion = marcaCraft.occasions[producto.categoria];
          const hash = `${producto.categoria}-section`;

          return (
            <li key={producto.categoria}>
              <GlassPanel as="article" className="flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold text-alma-blanco-hueso">
                    {producto.tipoPisco}
                  </h3>
                  {producto.abv ? (
                    <span className="rounded-full border border-alma-dorado-oscuro/40 px-2.5 py-0.5 text-xs tabular-nums text-alma-dorado-claro">
                      {producto.abv} vol.
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-alma-blanco-hueso/85">
                  {producto.descripcion}
                </p>
                {occasion ? (
                  <p className="mt-3 text-sm italic text-alma-dorado-claro/95">
                    {occasion}
                  </p>
                ) : null}
                <Link
                  href={{ pathname: "/", hash }}
                  className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-semibold text-alma-dorado-claro underline-offset-4 transition hover:text-alma-blanco-hueso hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro"
                >
                  {marcaCraft.shopLabel}
                  <span aria-hidden="true"> →</span>
                  <span className="sr-only">{` ${producto.tipoPisco}`}</span>
                </Link>
              </GlassPanel>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
