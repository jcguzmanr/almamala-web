"use client";

import { useState } from "react";
import type { ShippingInfo } from "@/types/checkout";

interface Step2ShippingInfoProps {
  shippingInfo: ShippingInfo | null;
  onShippingInfoChange: (info: ShippingInfo) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function Step2ShippingInfo({
  shippingInfo,
  onShippingInfoChange,
  onBack,
  onNext,
}: Step2ShippingInfoProps) {
  const [formData, setFormData] = useState<ShippingInfo>(
    shippingInfo || {
      email: "",
      nombre: "",
      apellidos: "",
      dni: "",
      celular: "",
      direccion: "",
      referencia: "",
      departamento: "",
      provincia: "",
      distrito: "",
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShippingInfo, string>> = {};

    if (!formData.email.trim()) newErrors.email = "El correo electrónico es requerido";
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.apellidos.trim()) newErrors.apellidos = "Los apellidos son requeridos";
    if (!formData.dni.trim()) newErrors.dni = "El DNI/CE es requerido";
    if (!formData.celular.trim()) newErrors.celular = "El celular es requerido";
    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es requerida";
    if (!formData.departamento.trim()) newErrors.departamento = "El departamento es requerido";
    if (!formData.provincia.trim()) newErrors.provincia = "La provincia/distrito es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onShippingInfoChange(formData);
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div 
        className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-alma-dorado-oscuro/20 shadow-lg"
        style={{ backdropFilter: 'blur(12px) saturate(150%)' }}
      >
        <h2 className="text-xl font-bold text-alma-dorado-claro mb-4">Facturación y envío</h2>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
              Correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="ejemplo@correo.com"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
              }`}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Nombre y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                placeholder="Juan"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                  errors.nombre ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                }`}
              />
              {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => handleChange("apellidos", e.target.value)}
                placeholder="Pérez García"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                  errors.apellidos ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                }`}
              />
              {errors.apellidos && <p className="text-xs text-red-500 mt-1">{errors.apellidos}</p>}
            </div>
          </div>

          {/* DNI y Celular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                DNI / CE <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={(e) => handleChange("dni", e.target.value)}
                placeholder="12345678"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                  errors.dni ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                }`}
              />
              {errors.dni && <p className="text-xs text-red-500 mt-1">{errors.dni}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                Celular <span className="text-red-500">*</span>
                <span className="text-xs text-alma-dorado-oscuro/70 font-normal ml-2">(Sin espacios ni +51)</span>
              </label>
              <input
                type="tel"
                value={formData.celular}
                onChange={(e) => handleChange("celular", e.target.value.replace(/\s+/g, ""))}
                placeholder="999888777"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                  errors.celular ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                }`}
              />
              {errors.celular && <p className="text-xs text-red-500 mt-1">{errors.celular}</p>}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <h3 className="text-lg font-semibold text-alma-dorado-claro mb-3">
              Dirección de envío
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => handleChange("direccion", e.target.value)}
                  placeholder="Av. Principal 123"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                    errors.direccion ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                  }`}
                />
                {errors.direccion && <p className="text-xs text-red-500 mt-1">{errors.direccion}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                  Referencia <span className="text-xs text-alma-dorado-oscuro/70 font-normal">(opcional)</span>
                </label>
                <p className="text-xs text-alma-dorado-oscuro/70 mb-2">
                  Puedes agregar una descripción o un enlace de Google Maps para facilitar la ubicación
                </p>
                <input
                  type="text"
                  value={formData.referencia}
                  onChange={(e) => handleChange("referencia", e.target.value)}
                  placeholder="Ej: Cerca a Plaza Vea, a 1 cuadra del parque. O pega aquí el link de Google Maps"
                  className="w-full px-4 py-2 border border-alma-dorado-oscuro/30 rounded-md focus:outline-none focus:ring-2 focus:ring-alma-dorado-oscuro bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                    Departamento <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.departamento}
                    onChange={(e) => handleChange("departamento", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro ${
                      errors.departamento ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                    }`}
                  >
                    <option value="" className="text-alma-dorado-oscuro/50">Selecciona un departamento</option>
                    <option value="Lima">Lima</option>
                    <option value="Lima Provincias">Lima Provincias</option>
                    {/* Agregar más departamentos según necesidad */}
                  </select>
                  {errors.departamento && (
                    <p className="text-xs text-red-500 mt-1">{errors.departamento}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                    Provincia <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.provincia}
                    onChange={(e) => handleChange("provincia", e.target.value)}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro ${
                      errors.provincia ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                    }`}
                    disabled={!formData.departamento}
                  >
                    <option value="" className="text-alma-dorado-oscuro/50">Selecciona una provincia</option>
                    {formData.departamento === "Lima" && (
                      <>
                        <option value="Lima">Lima</option>
                        <option value="Miraflores">Miraflores</option>
                        <option value="San Isidro">San Isidro</option>
                        <option value="La Molina">La Molina</option>
                      </>
                    )}
                    {formData.departamento === "Lima Provincias" && (
                      <>
                        <option value="Callao">Callao</option>
                        <option value="Huacho">Huacho</option>
                      </>
                    )}
                  </select>
                  {errors.provincia && <p className="text-xs text-red-500 mt-1">{errors.provincia}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-alma-dorado-oscuro mb-1">
                    Distrito <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.distrito}
                    onChange={(e) => handleChange("distrito", e.target.value)}
                    placeholder="Miraflores"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white/10 backdrop-blur-sm text-alma-dorado-oscuro placeholder:text-alma-dorado-oscuro/50 ${
                      errors.distrito ? "border-red-500 focus:ring-red-500" : "border-alma-dorado-oscuro/30 focus:ring-alma-dorado-oscuro"
                    }`}
                  />
                  {errors.distrito && <p className="text-xs text-red-500 mt-1">{errors.distrito}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="fixed bottom-0 left-0 right-0 bg-alma-verde-profundo/95 backdrop-blur-sm border-t border-alma-dorado-oscuro/30 shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-[0.2] px-6 py-4 border border-alma-dorado-oscuro text-alma-dorado-claro rounded-md font-semibold hover:bg-alma-dorado-oscuro/20 transition-colors"
          >
            Volver
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-4 bg-alma-dorado-oscuro text-alma-verde-profundo rounded-md font-semibold text-lg hover:bg-alma-dorado-claro hover:text-alma-verde-profundo transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </form>
  );
}

