import type { ShippingOption } from "./checkout";

export type OrderItem = {
  productoId: string;
  tipoPisco: string;
  categoria: string;
  volumen: string;
  precio: number;
  cantidad: number;
  subtotal: number;
};

export type OrderPayload = {
  orderId?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: {
    option: ShippingOption;
    cost: number;
  };
  total: number;
  coupon?: {
    code: string | null;
    discount: number;
  };
  metadata: {
    createdAt: string;
    userAgent?: string;
  };
};

export type OrderMetadata = {
  createdAt: string;
  userAgent?: string;
};

