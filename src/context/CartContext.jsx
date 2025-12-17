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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Cargar carrito del localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar carrito en localStorage cada vez que cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, variante, cantidad = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.varianteId === variante.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.varianteId === variante.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      return [
        ...prevCart,
        {
          productoId: producto.id,
          productoNombre: producto.nombre,
          varianteId: variante.id,
          talla: variante.talla,
          color: variante.color,
          precio: variante.precioFinal || producto.precioRegular,
          cantidad,
          imagen: producto.imagenPrincipal || '',
        },
      ];
    });
  };

  const removeFromCart = (varianteId) => {
    setCart((prevCart) => prevCart.filter((item) => item.varianteId !== varianteId));
  };

  const updateQuantity = (varianteId, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(varianteId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.varianteId === varianteId ? { ...item, cantidad } : item
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
