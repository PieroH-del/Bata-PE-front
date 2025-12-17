/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Inicializar el estado del carrito desde localStorage usando lazy initialization
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    // Guardar carrito en localStorage cada vez que cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, cantidad = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productoId === producto.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.productoId === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [
        ...prevCart,
        {
          productoId: producto.id,
          productoNombre: producto.nombre,
          precio: producto.precioRegular,
          cantidad,
          imagen: producto.urlImg || '',
          genero: producto.genero || '',
          material: producto.material || '',
        },
      ];
    });
  };

  const removeFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productoId !== productoId));
  };

  const updateQuantity = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(productoId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productoId === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.cantidad, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
