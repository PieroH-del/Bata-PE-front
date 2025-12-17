import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pedidosAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll hacia arriba al cargar la página
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isAuthenticated) {
      navigate('/login?redirect=/mis-pedidos');
      return;
    }

    fetchPedidos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchPedidos = async () => {
    setLoading(true);
    try {
      const response = await pedidosAPI.getByUsuario(user.id);
      setPedidos(response.data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      PENDIENTE: 'badge bg-warning',
      ENVIADO: 'badge bg-info',
      ENTREGADO: 'badge bg-success',
      CANCELADO: 'badge bg-danger',
    };
    return badges[estado] || 'badge bg-secondary';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container py-4">
          <div className="loading">Cargando pedidos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container py-4">
        <h1 className="page-title">Mis Pedidos</h1>

        {pedidos.length === 0 ? (
          <div className="no-orders">
            <p>Aún no has realizado ningún pedido.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/productos')}
            >
              Comenzar a Comprar
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {pedidos.map((pedido) => (
              <div key={pedido.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h5>Pedido #{pedido.id}</h5>
                    <p className="order-date">{formatDate(pedido.fechaPedido)}</p>
                  </div>
                  <span className={getEstadoBadge(pedido.estado)}>
                    {pedido.estado}
                  </span>
                </div>

                <div className="order-body">
                  <div className="order-details">
                    <p>
                      <strong>Total:</strong> S/ {pedido.totalPagar.toFixed(2)}
                    </p>
                    <p>
                      <strong>Método de pago:</strong> {pedido.metodoPago}
                    </p>
                  </div>

                  <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate(`/pedido/${pedido.id}`)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
