/**
 * Contexto: CartContext.js
 * Maneja carrito: Agregar producto, Eliminar producto, total, cantidad
 * Requerido en la consigna de clase
 */
import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{ product, qty }]

  // Agregar producto
  const addToCart = (product) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx !== -1) {
        // Ya existe -> incrementar cantidad
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  // Eliminar producto (reduce qty o elimina)
  const removeFromCart = (productId) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === productId);
      if (idx === -1) return prev;
      const copy = [...prev];
      if (copy[idx].qty > 1) {
        copy[idx] = { ...copy[idx], qty: copy[idx].qty - 1 };
        return copy;
      }
      copy.splice(idx, 1);
      return copy;
    });
  };

  // Eliminar completamente del carrito
  const removeCompletely = (productId) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearCart = () => setItems([]);

  // Cálculos
  const totalItems = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((acc, i) => acc + (i.product.price * i.qty), 0), [items]);

  const value = {
    items,
    addToCart,
    removeFromCart,
    removeCompletely,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook helper
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
};
