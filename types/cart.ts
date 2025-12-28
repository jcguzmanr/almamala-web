export type CartItem = {
  productoId: string; // Identificador único del producto
  tipoPisco: string;  // Italia, Quebranta, Mosto Verde, Damajuana
  categoria: string;  // Categoría del producto
  volumen: string;    // 500 ML, 750 ML, Italia, Mosto Verde, Quebranta (para damajuanas)
  precio: number;     // Precio numérico (extraído de "S/ XX")
  cantidad: number;   // Cantidad seleccionada
  imagen: string;     // Nombre de la imagen
};

export type Cart = {
  items: CartItem[];
};

