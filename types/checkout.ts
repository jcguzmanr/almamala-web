export type ShippingOption = "regular" | "gratuito" | "retiro";

export type CheckoutData = {
  shippingOption: ShippingOption | null;
  couponCode: string | null;
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
