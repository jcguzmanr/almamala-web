"use client";

import { useEffect, useRef, useState } from "react";
import { usePiscoTabs } from "./PiscoTabsContext";

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

interface PiscoTabsProps {
  onStickyChange?: (isSticky: boolean) => void;
  renderInHeader?: boolean;
}

export default function PiscoTabs({ onStickyChange, renderInHeader = false }: PiscoTabsProps) {
  const { activeTab, setActiveTab } = usePiscoTabs();
  const [isSticky, setIsSticky] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/PiscoTabs.tsx:25',message:'PiscoTabs useEffect starting',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    // Función para detectar cuando los tabs deben volverse sticky
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        // Cuando los tabs originales salen de la vista superior, activar sticky
        const newIsSticky = rect.top < 80;
        setIsSticky(newIsSticky);
        if (onStickyChange) {
          onStickyChange(newIsSticky);
        }
      }
    };

    // Función para configurar el observer de secciones
    const setupObserver = () => {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/PiscoTabs.tsx:34',message:'setupObserver called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      
      // Crear Intersection Observer para detectar qué sección está visible
      try {
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
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/PiscoTabs.tsx:57',message:'Looking for section element',data:{tabId:tab.id,elementFound:!!element},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
        
        if (element && observerRef.current) {
          observerRef.current.observe(element);
        }
      });
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/1f34f065-fcfa-4f25-b5ef-af2a8fc9c262',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/productos/PiscoTabs.tsx:62',message:'Error in setupObserver',data:{error:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
        // #endregion
      }
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

  const renderTabs = () => {
    // Si está en el header, usar contenedor centrado con efecto frosted
    if (renderInHeader) {
      return (
        <div className="w-full flex justify-center">
          <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-0.5 border border-white/20 shadow-lg overflow-x-auto scrollbar-hide max-w-full">
            <div className="flex min-w-max px-2 gap-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`
                      px-3 md:px-4 py-1.5 transition-all duration-200 ease-in-out
                      flex items-center gap-2 font-medium text-xs md:text-sm whitespace-nowrap flex-shrink-0
                      ${
                        isActive
                          ? "bg-white/20 text-alma-dorado-claro shadow-sm border border-alma-dorado-oscuro/60 rounded-full"
                          : "text-alma-dorado-oscuro/80 hover:text-alma-dorado-claro hover:bg-white/10 border-0"
                      }
                    `}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    
    // Tabs originales con fondo verde
    return (
      <div className="inline-flex bg-alma-verde-seco/20 backdrop-blur-sm rounded-full p-0.5 border border-alma-dorado-oscuro/40 shadow-sm">
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`
                  px-3 md:px-4 py-1.5 transition-all duration-200 ease-in-out
                  flex items-center gap-2 font-medium text-xs md:text-sm whitespace-nowrap flex-shrink-0
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
      </div>
    );
  };

  // Si se renderiza en el header, solo retornar los tabs sin contenedor
  if (renderInHeader) {
    return renderTabs();
  }

  return (
    <>
      {/* Tabs originales */}
      <div ref={tabsRef} className="flex justify-center mb-8">
        {renderTabs()}
      </div>
    </>
  );
}

