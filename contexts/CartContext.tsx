"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { CartItem } from "@/types/cart";
import {
  saveCartToStorage,
  loadCartFromStorage,
  calculateSubtotal,
  calculateTotal,
} from "@/lib/cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productoId: string, volumen: string) => void;
  updateQuantity: (productoId: string, volumen: string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const stored = loadCartFromStorage();
    if (stored) {
      setItems(stored);
    }
    setIsLoaded(true);
  }, []);

  // Guardar en localStorage cuando cambian los items
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage(items);
    }
  }, [items, isLoaded]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      // Buscar si ya existe el mismo producto con la misma presentación
      const existingIndex = prevItems.findIndex(
        (item) => item.productoId === newItem.productoId && item.volumen === newItem.volumen
      );

      if (existingIndex >= 0) {
        // Incrementar cantidad
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: updated[existingIndex].cantidad + newItem.cantidad,
        };
        return updated;
      } else {
        // Agregar nuevo item
        return [...prevItems, newItem];
      }
    });
  }, []);

  const removeItem = useCallback((productoId: string, volumen: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => !(item.productoId === productoId && item.volumen === volumen))
    );
  }, []);

  const updateQuantity = useCallback((productoId: string, volumen: string, cantidad: number) => {
    if (cantidad <= 0) {
      removeItem(productoId, volumen);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productoId === productoId && item.volumen === volumen
          ? { ...item, cantidad }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getSubtotal = useCallback(() => {
    return calculateSubtotal(items);
  }, [items]);

  const getTotal = useCallback(() => {
    return calculateTotal(getSubtotal(), 0); // Envío será 0 en PR3
  }, [getSubtotal]);

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.cantidad, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        getSubtotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

