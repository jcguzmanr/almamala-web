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
      <Link
        href="/"
        className="px-4 py-2 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md hover:bg-alma-dorado-claro transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

