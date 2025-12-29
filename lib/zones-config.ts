import zonesConfig from "@/data/zones-config.json";
import locationConfig from "@/data/location-config.json";
import type { LimaZone } from "@/types/checkout";

export type ZoneConfig = {
  id: LimaZone;
  name: string;
  description: string;
  radius: number | null;
  color: string;
  fillColor: string;
  price: number | null;
};

export type LocationConfig = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zoom: number;
};

// Validar y tipar la configuración
const zonesData = zonesConfig as { zones: ZoneConfig[] };
const locationData = locationConfig as LocationConfig;

/**
 * Obtiene la configuración de todas las zonas
 */
export function getZonesConfig(): ZoneConfig[] {
  return zonesData.zones;
}

/**
 * Obtiene la configuración de ubicación
 */
export function getLocationConfig(): LocationConfig {
  return locationData;
}

/**
 * Obtiene una zona específica por ID
 */
export function getZoneById(id: LimaZone): ZoneConfig | undefined {
  return getZonesConfig().find((zone) => zone.id === id);
}

