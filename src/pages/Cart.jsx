import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container py-5">
          <div className="empty-cart">
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos para comenzar tu compra</p>
            <button className="btn btn-primary" onClick={() => navigate('/productos')}>
              Ver Productos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container py-4">
        <h1 className="page-title">Carrito de Compras</h1>

        <div className="row">
          <div className="col-lg-8">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.varianteId} className="cart-item">
                  <div className="item-image">
                    {item.imagen ? (
                      <img src={item.imagen} alt={item.productoNombre} />
                    ) : (
                      <div className="no-image">Sin imagen</div>
                    )}
                  </div>

                  <div className="item-details">
                    <h5 className="item-name">{item.productoNombre}</h5>
                    <p className="item-variant">
                      Talla: {item.talla} | Color: {item.color}
                    </p>
                    <p className="item-price">S/ {item.precio.toFixed(2)}</p>
                  </div>

                  <div className="item-quantity">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.varianteId, item.cantidad - 1)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.cantidad}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.varianteId, item.cantidad + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <p className="total-price">
                      S/ {(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>

                  <button
                    className="btn-remove"
                    onClick={() => removeFromCart(item.varianteId)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <button className="btn btn-outline-danger mt-3" onClick={clearCart}>
              Vaciar Carrito
            </button>
          </div>

          <div className="col-lg-4">
            <div className="cart-summary">
              <h4>Resumen del Pedido</h4>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>S/ {getCartTotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Envío:</span>
                <span>Calculado en checkout</span>
              </div>

              <hr />

              <div className="summary-row total">
                <strong>Total:</strong>
                <strong>S/ {getCartTotal().toFixed(2)}</strong>
              </div>

              <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>
                Proceder al Checkout
              </button>

              <button
                className="btn btn-outline-secondary w-100 mt-2"
                onClick={() => navigate('/productos')}
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
