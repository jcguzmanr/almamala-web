"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, LoadScript, Circle, Marker } from "@react-google-maps/api";
import type { LimaZone } from "@/types/checkout";
import { formatPrice } from "@/lib/cart";
import { getZonesConfig, getLocationConfig, type ZoneConfig } from "@/lib/zones-config";

interface ZoneSelectorProps {
  selectedZone: LimaZone;
  onZoneSelect: (zone: LimaZone) => void;
}

// Obtener configuración de zonas y ubicación
const ZONES = getZonesConfig();
const LOCATION = getLocationConfig();

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    { elementType: "geometry", stylers: [{ color: "#1F4E4A" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#062F3C" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#D6AA4C" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#FFD77A" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D6AA4C" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#1F4E4A" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#062F3C" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1F4E4A" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D6AA4C" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#062F3C" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#1F4E4A" }],
    },
  ],
};

export default function ZoneSelector({ selectedZone, onZoneSelect }: ZoneSelectorProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [showLabel, setShowLabel] = useState(false);
  const [selectedZoneInfo, setSelectedZoneInfo] = useState<ZoneConfig | null>(null);
  const [pulseOpacity, setPulseOpacity] = useState<number>(0.5);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Efecto para animar cuando se selecciona una zona
  useEffect(() => {
    if (!map) return;

    if (selectedZone) {
      const zone = ZONES.find((z) => z.id === selectedZone);
      if (zone) {
        setSelectedZoneInfo(zone);
        setShowLabel(true);
        setPulseOpacity(0.5);
        
        // Animar el mapa para mostrar la zona seleccionada
        if (zone.radius !== null) {
          // Crear un círculo temporal para calcular los bounds
          const circle = new google.maps.Circle({
            center: LOCATION.coordinates,
            radius: zone.radius,
          });
          
          const bounds = circle.getBounds();
          
          if (bounds) {
            // Usar fitBounds con padding para mostrar bien la zona
            map.fitBounds(bounds, {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            });
          }
        } else if (zone.id === "provincias") {
          // Para "Otras zonas y provincias", hacer zoom adicional (más alejado)
          // Mostrar un área más amplia de Lima y alrededores
          const extendedRadius = 30000; // 30km para mostrar área más amplia
          const circle = new google.maps.Circle({
            center: LOCATION.coordinates,
            radius: extendedRadius,
          });
          
          const bounds = circle.getBounds();
          
          if (bounds) {
            map.fitBounds(bounds, {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            });
          }
        }
      }
    } else {
      setShowLabel(false);
      setPulseOpacity(0.5);
      // Volver al zoom inicial cuando se deselecciona
      map.panTo(LOCATION.coordinates);
      map.setZoom(LOCATION.zoom);
      setTimeout(() => setSelectedZoneInfo(null), 300);
    }
  }, [selectedZone, map]);

  // Animación de pulso sutil con opacidad
  useEffect(() => {
    if (!selectedZone) return;

    const interval = setInterval(() => {
      setPulseOpacity((prev) => {
        if (prev >= 0.8) {
          return 0.3;
        }
        return prev + 0.02;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [selectedZone]);

  const handleZoneClick = (zoneId: LimaZone) => {
    if (zoneId && selectedZone === zoneId) {
      // Si se hace clic en la zona ya seleccionada, deseleccionar
      onZoneSelect(null);
    } else {
      onZoneSelect(zoneId);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <div>
        <h3 className="text-lg font-semibold text-alma-dorado-oscuro mb-4">
          Selecciona tu zona de entrega en Lima
        </h3>
      </div>

      {/* Selector de zonas tipo tabs */}
      <div className="flex border-b-2 border-alma-dorado-oscuro/30 mb-0">
        {ZONES.map((zone, index) => (
          <button
            key={zone.id}
            onClick={() => handleZoneClick(zone.id)}
            className={`flex-1 px-4 py-3 text-sm font-medium relative transition-all duration-300 ${
              selectedZone === zone.id
                ? "text-alma-dorado-oscuro border-b-2 border-alma-dorado-oscuro bg-alma-dorado-claro/10"
                : "text-alma-dorado-oscuro/70 hover:text-alma-dorado-oscuro hover:bg-white/5"
            }`}
            style={{
              borderBottomColor: selectedZone === zone.id ? zone.color : undefined,
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="font-semibold">{zone.name}</span>
              {zone.price !== null && (
                <span className="text-xs font-bold text-alma-dorado-oscuro/80">
                  {formatPrice(zone.price)}
                </span>
              )}
            </div>
            {/* Indicador de selección */}
            {selectedZone === zone.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: zone.color }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Panel de confirmación - Movido después de los tabs */}
      {selectedZone && selectedZoneInfo && (
        <div
          className={`p-4 border-t-2 transition-all duration-500 animate-fade-in mb-4 ${
            showLabel ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            borderTopColor: selectedZoneInfo.color,
          }}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-3 flex-1">
                <div
                  className="w-3 h-3 rounded-full animate-pulse mt-1"
                  style={{ backgroundColor: selectedZoneInfo.color }}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-alma-dorado-oscuro mb-2">
                    {selectedZoneInfo.name}
                  </p>
                  <p className="text-sm text-alma-dorado-oscuro/80">
                    {selectedZoneInfo.description}
                  </p>
                  {selectedZoneInfo.id === "provincias" && (
                    <p className="text-xs text-alma-dorado-oscuro/70 mt-2 italic">
                      Costo se coordinará al momento del pago
                    </p>
                  )}
                  <p className="text-xs text-alma-dorado-oscuro/70 mt-2">
                    <span className="font-medium">Dirección de origen:</span> {LOCATION.address}
                  </p>
                </div>
              </div>
              {selectedZoneInfo.price !== null && (
                <div className="text-right ml-4">
                  <p className="text-lg font-bold" style={{ color: selectedZoneInfo.color }}>
                    {formatPrice(selectedZoneInfo.price)}
                  </p>
                  <p className="text-xs text-alma-dorado-oscuro/70">Envío</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mapa de Google Maps */}
      <div className="rounded-lg overflow-hidden border border-alma-dorado-oscuro/20">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={LOCATION.coordinates}
              zoom={LOCATION.zoom}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={defaultMapOptions}
            >
              {/* Marcador central */}
              <Marker position={LOCATION.coordinates} />

              {/* Círculos de las zonas (solo las que tienen radio) */}
              {ZONES.filter((zone) => zone.radius !== null).map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <Circle
                    key={zone.id}
                    center={LOCATION.coordinates}
                    radius={zone.radius!}
                    options={{
                      strokeColor: zone.color,
                      strokeOpacity: isSelected ? pulseOpacity : 0.5,
                      strokeWeight: isSelected ? 4 : 2,
                      fillColor: zone.fillColor,
                      fillOpacity: isSelected ? pulseOpacity * 0.4 : 0.1,
                      clickable: true,
                      zIndex: isSelected ? 1000 : 1,
                    }}
                    onClick={() => handleZoneClick(zone.id)}
                  />
                );
              })}

            </GoogleMap>
          </LoadScript>
        ) : (
          <div className="h-[400px] flex items-center justify-center bg-gray-100 text-gray-500">
            <p className="text-sm">Google Maps API key no configurada. Por favor configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</p>
          </div>
        )}
      </div>

    </div>
  );
}

