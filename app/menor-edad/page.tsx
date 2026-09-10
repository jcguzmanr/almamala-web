"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MenorEdadPage() {
  const router = useRouter();

  useEffect(() => {
    // Limpiar la verificación de edad si están en esta página
    localStorage.removeItem("ageVerified");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo_am.svg"
            alt="Alma Mala"
            width={200}
            height={50}
            className="w-32 md:w-40 h-auto opacity-80"
          />
        </div>

        {/* Mensaje principal */}
        <div className="bg-alma-dorado-claro/10 backdrop-blur-xl border-2 border-alma-dorado-oscuro/30 rounded-2xl shadow-2xl p-8 md:p-12 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-alma-dorado-claro mb-4">
            Acceso Restringido
          </h1>
          
          <p className="text-xl md:text-2xl text-alma-dorado-oscuro leading-relaxed">
            Debes ser mayor de 18 años para acceder a este sitio.
          </p>
          
          <p className="text-lg text-alma-dorado-oscuro/80 leading-relaxed">
            Según la legislación peruana, el consumo de bebidas alcohólicas está restringido a mayores de edad.
          </p>

          <div className="pt-6">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-lg font-semibold hover:bg-alma-dorado-claro transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Volver al inicio
            </button>
          </div>
        </div>

        {/* Información adicional */}
        <p className="text-sm text-alma-dorado-oscuro/60">
          Si crees que esto es un error, por favor contacta con nuestro equipo.
        </p>
      </div>
    </div>
  );
}

