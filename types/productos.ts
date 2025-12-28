export type Presentacion = {
  volumen: string;
  precio: string;
  imagen: string;
};

export type Producto = {
  categoria: string;
  tipoPisco: string;
  descripcion: string;
  disfrutaloEn: string;
  nose?: string;
  taste?: string;
  finish?: string;
  abv?: string;
  cocktails?: string;
  items: Presentacion[];
};

export type ProductosData = {
  productos: Producto[];
};

