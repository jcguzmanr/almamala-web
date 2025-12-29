"use client";

import Image from "next/image";
import { useState } from "react";
import { getYapeNumber, getYapeName } from "@/lib/app-config";

export default function InfoMessages() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className="p-6 bg-alma-dorado-claro/20 border border-alma-dorado-oscuro/30 rounded-md">
        <h2 className="text-xl font-bold text-alma-dorado-oscuro mb-6">Formas de pago</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Yape y Plin */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/images/Logos.png"
                alt="Yape y Plin"
                width={60}
                height={60}
                className="object-contain"
              />
              <h3 className="font-semibold text-alma-dorado-oscuro text-lg">Yape y Plin</h3>
            </div>
            <p className="text-sm text-alma-dorado-oscuro">
              Realiza tu pago al {getYapeNumber()}<br />
              Nombre: {getYapeName()}
            </p>
            <button
              onClick={() => setShowQR(true)}
              className="mt-3 px-4 py-2 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold hover:bg-alma-dorado-claro hover:text-alma-verde-profundo transition-colors"
            >
              Ver QR
            </button>
          </div>

          {/* Transferencia */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/images/ibk.png"
                alt="Interbank"
                width={60}
                height={60}
                className="object-contain"
              />
              <h3 className="font-semibold text-alma-dorado-oscuro text-lg">Transferencia</h3>
            </div>
            <p className="text-sm text-alma-dorado-oscuro">
              Interbank:<br />
              0563089133584<br />
              <br />
              Otros bancos:<br />
              CCI 00305601308913358491
            </p>
          </div>
        </div>
      </div>

      {/* Modal fullscreen para QR */}
      {showQR && (
        <div
          className="fixed inset-0 bg-alma-verde-profundo/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative max-w-3xl w-full my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 text-alma-dorado-claro hover:text-alma-dorado-oscuro text-4xl font-bold z-10 bg-alma-dorado-oscuro/80 hover:bg-alma-dorado-claro rounded-full w-12 h-12 flex items-center justify-center transition-colors shadow-lg"
              aria-label="Cerrar"
            >
              ×
            </button>
            
            <div className="bg-alma-dorado-claro/10 backdrop-blur-md border-2 border-alma-dorado-oscuro/30 rounded-lg shadow-2xl p-6 md:p-8">
              {/* Instrucciones */}
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-alma-dorado-claro mb-4 text-center">
                  SI REALIZASTE LA COMPRA DESDE TU CELULAR
                </h3>
                <div className="space-y-3 text-alma-dorado-oscuro">
                  <div className="flex gap-3 items-center">
                    <span className="font-bold text-alma-dorado-claro flex-shrink-0">1.</span>
                    <p className="text-sm md:text-base">Haz una captura de pantalla al QR.</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="font-bold text-alma-dorado-claro flex-shrink-0">2.</span>
                    <p className="text-sm md:text-base">
                      Ingresa a tu aplicativo &quot;YAPE&quot;, presionas donde dice &quot;ESCANEAR QR&quot; y luego &quot;SUBIR UNA IMAGEN CON QR&quot; (ahí subes la captura que guardaste).
                    </p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="font-bold text-alma-dorado-claro flex-shrink-0">3.</span>
                    <p className="text-sm md:text-base">
                      Realizas el YAPE a nombre de <span className="font-semibold">&quot;LUIS LOA*&quot;</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-md bg-white p-4 rounded-lg shadow-xl border-2 border-alma-dorado-oscuro/20">
                  <Image
                    src="/images/QR_yape.JPG"
                    alt="QR Code Yape"
                    width={800}
                    height={800}
                    className="w-full h-auto rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

