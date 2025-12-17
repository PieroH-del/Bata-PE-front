import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { pedidosAPI } from '../services/api';
import './OrderDetail.css';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll hacia arriba al cargar la página
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetchPedido();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated]);

  const fetchPedido = async () => {
    setLoading(true);
    try {
      const response = await pedidosAPI.getById(id);
      setPedido(response.data);
    } catch (error) {
      console.error('Error al cargar pedido:', error);
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
      <div className="order-detail-page">
        <div className="container py-4">
          <div className="loading">Cargando detalles del pedido...</div>
        </div>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="order-detail-page">
        <div className="container py-4">
          <div className="error">Pedido no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="container py-4">
        <button className="btn btn-link mb-3" onClick={() => navigate('/mis-pedidos')}>
          ← Volver a Mis Pedidos
        </button>

        <div className="order-detail-card">
          <div className="order-header">
            <div>
              <h1>Pedido #{pedido.id}</h1>
              <p className="order-date">{formatDate(pedido.fechaPedido)}</p>
            </div>
            <span className={getEstadoBadge(pedido.estado)}>{pedido.estado}</span>
          </div>

          <div className="row mt-4">
            <div className="col-md-8">
              <h4>Detalles del Pedido</h4>
              <div className="order-info-section">
                <p>
                  <strong>Método de pago:</strong> {pedido.metodoPago}
                </p>
                <p>
                  <strong>Total:</strong> S/ {pedido.totalPagar.toFixed(2)}
                </p>
              </div>

              {/* Aquí podrías mostrar los productos si los incluyes en la respuesta */}
              <div className="info-message">
                <p>
                  Los detalles completos de los productos se encuentran en el sistema.
                  Para más información, contacta con soporte.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="status-timeline">
                <h5>Estado del Pedido</h5>
                <div className="timeline">
                  <div className={`timeline-item ${pedido.estado === 'PENDIENTE' || pedido.estado === 'ENVIADO' || pedido.estado === 'ENTREGADO' ? 'active' : ''}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <strong>Pendiente</strong>
                      <small>Pedido recibido</small>
                    </div>
                  </div>
                  <div className={`timeline-item ${pedido.estado === 'ENVIADO' || pedido.estado === 'ENTREGADO' ? 'active' : ''}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <strong>Enviado</strong>
                      <small>En camino</small>
                    </div>
                  </div>
                  <div className={`timeline-item ${pedido.estado === 'ENTREGADO' ? 'active' : ''}`}>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <strong>Entregado</strong>
                      <small>Pedido completado</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
