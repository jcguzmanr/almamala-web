export type ShippingOption = "regular" | "gratuito" | "retiro";

export type LimaZone = "zona1" | "zona2" | "zona3" | "provincias" | null;

type LimaZoneKey = Exclude<LimaZone, null>;

export const ZONE_PRICES: Record<LimaZoneKey, number | null> = {
  zona1: 15,
  zona2: 25,
  zona3: 35,
  provincias: null, // Consultar
};

export type BottleReturn = {
  productoId: string;
  volumen: string;
  cantidad: number; // Cantidad de botellas devueltas
};

export type CheckoutData = {
  shippingOption: ShippingOption | null;
  couponCode: string | null;
  limaZone?: LimaZone;
  bottleReturns?: BottleReturn[];
};

export type ShippingInfo = {
  email: string;
  nombre: string;
  apellidos: string;
  dni: string;
  celular: string;
  direccion: string;
  referencia?: string;
  departamento: string;
  provincia: string;
  distrito: string;
};

export type CheckoutFormData = {
  step1: CheckoutData;
  step2: ShippingInfo | null;
};
