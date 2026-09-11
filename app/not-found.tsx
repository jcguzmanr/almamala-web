import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold text-alma-dorado-claro mb-4">
        Página no encontrada
      </h2>
      <p className="text-alma-dorado-oscuro mb-4">
        La página que buscas no existe.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-alma-dorado-oscuro px-4 py-2 text-alma-verde-profundo transition-colors hover:bg-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro"
        >
          Ir a comprar
        </Link>
        <Link
          href="/marca"
          className="rounded-full border border-alma-dorado-oscuro/50 px-4 py-2 text-alma-blanco-hueso transition-colors hover:border-alma-dorado-claro hover:text-alma-dorado-claro focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-alma-dorado-claro"
        >
          La marca
        </Link>
      </div>
    </div>
  );
}

