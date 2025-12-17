import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();

  useEffect(() => {
    // Limpiar el carrito del localStorage si aún existe
    localStorage.removeItem('cart');
  }, []);

  return (
    <div className="order-confirmation-page">
      <div className="container py-5">
        <div className="confirmation-card">
          <div className="success-icon">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#28a745" />
              <path
                d="M8 12L11 15L16 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1>¡Pedido Confirmado!</h1>
          <p className="order-number">
            Número de pedido: <strong>#{orderId}</strong>
          </p>

          <div className="confirmation-message">
            <p>
              Tu pedido ha sido procesado exitosamente. Recibirás un correo de
              confirmación con los detalles de tu compra.
            </p>
            <p>
              Puedes hacer seguimiento de tu pedido desde tu perfil.
            </p>
          </div>

          <div className="action-buttons">
            <Link to={`/mis-pedidos`} className="btn btn-primary">
              Ver Mis Pedidos
            </Link>
            <Link to="/productos" className="btn btn-outline-primary">
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
