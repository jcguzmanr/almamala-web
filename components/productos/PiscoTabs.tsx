"use client";

import { useEffect, useState, useRef } from "react";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "Italia", label: "Italia" },
  { id: "Quebranta", label: "Quebranta" },
  { id: "Mosto Verde", label: "Mosto Verde" },
  { id: "Damajuanas 4L", label: "Damajuanas" },
];

export default function PiscoTabs() {
  const [activeTab, setActiveTab] = useState<string>("Italia");
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Función para detectar cuando los tabs deben volverse sticky
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        // Cuando los tabs originales salen de la vista superior, activar sticky
        setIsSticky(rect.top < 80);
      }
    };

    // Función para configurar el observer de secciones
    const setupObserver = () => {
      // Crear Intersection Observer para detectar qué sección está visible
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              const sectionId = entry.target.id;
              // Normalizar el ID para que coincida con los tabs
              const normalizedId = sectionId.replace(/-section$/, "");
              if (tabs.some((tab) => tab.id === normalizedId)) {
                setActiveTab(normalizedId);
              }
            }
          });
        },
        {
          threshold: [0.3, 0.5, 0.7],
          rootMargin: "-100px 0px -50% 0px",
        }
      );

      // Observar todas las secciones de productos
      tabs.forEach((tab) => {
        const element = document.getElementById(`${tab.id}-section`);
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
    };

    // Esperar a que el DOM esté listo y las secciones se hayan renderizado
    const timeoutId = setTimeout(() => {
      setupObserver();
    }, 500); // Aumentar el tiempo para asegurar que los productos se hayan renderizado

    // Agregar listener de scroll
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Verificar estado inicial

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(`${tabId}-section`);
    if (element) {
      const headerOffset = 100; // Offset para el header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const renderTabs = () => (
    <div className="inline-flex bg-alma-verde-seco/20 backdrop-blur-sm rounded-full p-1 border border-alma-dorado-oscuro/40 shadow-sm">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              px-6 py-3 transition-all duration-200 ease-in-out
              flex items-center gap-2 font-medium text-sm md:text-base
              ${
                isActive
                  ? "bg-alma-verde-seco/40 text-alma-dorado-claro shadow-sm border border-alma-dorado-oscuro/60 rounded-full"
                  : "text-alma-dorado-oscuro/80 hover:text-alma-dorado-claro hover:bg-alma-verde-seco/10 border-0"
              }
            `}
          >
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Tabs originales */}
      <div ref={tabsRef} className="flex justify-center mb-8">
        {renderTabs()}
      </div>

      {/* Tabs sticky en el header */}
      {isSticky && (
        <div className="fixed top-[72px] left-0 right-0 z-20 bg-alma-verde-profundo/95 backdrop-blur-sm border-b border-alma-dorado-oscuro/20 py-3 shadow-md">
          <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-center">
            {renderTabs()}
          </div>
        </div>
      )}
    </>
  );
}

