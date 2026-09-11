"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AgeVerification() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // No mostrar el pop-up en la página de menor-edad
    if (pathname === "/menor-edad") {
      return;
    }

    // Verificar si ya se verificó la edad anteriormente
    const ageVerified = localStorage.getItem("ageVerified");
    if (ageVerified !== "true") {
      setIsVisible(true);
    }
  }, [pathname]);

  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
    setIsVisible(false);
  };

  const handleDeny = () => {
    router.push("/menor-edad");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop con blur */}
      <div className="absolute inset-0 bg-alma-verde-profundo/40 backdrop-blur-md" />
      
      {/* Modal con efecto glassmorphism */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="bg-alma-dorado-claro/10 backdrop-blur-xl border-2 border-alma-dorado-oscuro/30 rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Contenido */}
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-alma-dorado-claro mb-2">
              Verificación de Edad
            </h2>
            
            <p className="text-lg text-alma-dorado-oscuro leading-relaxed">
              ¿Eres mayor de 18 años?
            </p>
            
            <p className="text-sm text-alma-dorado-oscuro/80">
              Para acceder a nuestro sitio, debes ser mayor de edad según la legislación peruana.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleConfirm}
                className="flex-1 px-6 py-3 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-lg font-semibold hover:bg-alma-dorado-claro transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sí, soy mayor de 18
              </button>
              
              <button
                onClick={handleDeny}
                className="flex-1 px-6 py-3 bg-alma-verde-seco/50 text-alma-dorado-claro border-2 border-alma-dorado-oscuro/30 rounded-lg font-semibold hover:bg-alma-verde-seco/70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

