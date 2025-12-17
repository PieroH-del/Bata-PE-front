import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { pedidosAPI, direccionesAPI } from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [direcciones, setDirecciones] = useState([]);
  const [selectedDireccion, setSelectedDireccion] = useState(null);
  const [metodoPago, setMetodoPago] = useState('TARJETA_CREDITO');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newAddress, setNewAddress] = useState({
    direccionCalle: '',
    ciudad: '',
    provincia: '',
    codigoPostal: '',
    pais: 'Perú',
    esPrincipal: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/checkout');
      return;
    }

    if (cart.length === 0) {
      navigate('/carrito');
      return;
    }

    fetchDirecciones();
  }, [isAuthenticated, cart]);

  const fetchDirecciones = async () => {
    try {
      const response = await direccionesAPI.getByUsuario(user.id);
      setDirecciones(response.data);
      
      // Seleccionar dirección principal por defecto
      const principal = response.data.find((dir) => dir.esPrincipal);
      if (principal) {
        setSelectedDireccion(principal.id);
      } else if (response.data.length > 0) {
        setSelectedDireccion(response.data[0].id);
      }
    } catch (error) {
      console.error('Error al cargar direcciones:', error);
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const addressData = {
        ...newAddress,
        usuarioId: user.id,
      };
      const response = await direccionesAPI.create(addressData);
      setDirecciones([...direcciones, response.data]);
      setSelectedDireccion(response.data.id);
      setShowAddressForm(false);
      setNewAddress({
        direccionCalle: '',
        ciudad: '',
        provincia: '',
        codigoPostal: '',
        pais: 'Perú',
        esPrincipal: false,
      });
    } catch (error) {
      setError('Error al agregar dirección');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!selectedDireccion) {
      setError('Por favor selecciona una dirección de envío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const detalles = cart.map((item) => ({
        varianteProductoId: item.varianteId,
        cantidad: item.cantidad,
      }));

      const pedidoData = {
        usuarioId: user.id,
        direccionEnvioId: selectedDireccion,
        metodoPago: metodoPago,
        detalles: detalles,
      };

      const response = await pedidosAPI.create(pedidoData);
      clearCart();
      navigate(`/pedido-confirmado/${response.data.id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Error al procesar el pedido. Verifica el stock disponible.'
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = getCartTotal();
  const envio = 15.0; // Costo fijo de envío
  const total = subtotal + envio;

  return (
    <div className="checkout-page">
      <div className="container py-4">
        <h1 className="page-title">Finalizar Compra</h1>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row">
          <div className="col-lg-8">
            {/* Dirección de envío */}
            <div className="checkout-section">
              <h3>Dirección de Envío</h3>

              {direcciones.length > 0 && !showAddressForm ? (
                <div className="addresses-list">
                  {direcciones.map((dir) => (
                    <div key={dir.id} className="address-item">
                      <input
                        type="radio"
                        id={`dir-${dir.id}`}
                        name="direccion"
                        value={dir.id}
                        checked={selectedDireccion === dir.id}
                        onChange={(e) => setSelectedDireccion(parseInt(e.target.value))}
                      />
                      <label htmlFor={`dir-${dir.id}`}>
                        <strong>{dir.direccionCalle}</strong>
                        <br />
                        {dir.ciudad}, {dir.provincia} - {dir.codigoPostal}
                        <br />
                        {dir.pais}
                        {dir.esPrincipal && <span className="badge bg-primary ms-2">Principal</span>}
                      </label>
                    </div>
                  ))}
                  
                  <button
                    className="btn btn-outline-primary mt-2"
                    onClick={() => setShowAddressForm(true)}
                  >
                    + Agregar Nueva Dirección
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAddAddress} className="address-form">
                  <div className="mb-3">
                    <label className="form-label">Dirección *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="direccionCalle"
                      value={newAddress.direccionCalle}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ciudad *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="ciudad"
                        value={newAddress.ciudad}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Provincia *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="provincia"
                        value={newAddress.provincia}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Código Postal *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="codigoPostal"
                        value={newAddress.codigoPostal}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">País *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pais"
                        value={newAddress.pais}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="esPrincipal"
                      checked={newAddress.esPrincipal}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, esPrincipal: e.target.checked })
                      }
                    />
                    <label className="form-check-label" htmlFor="esPrincipal">
                      Establecer como dirección principal
                    </label>
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      Guardar Dirección
                    </button>
                    {direcciones.length > 0 && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Método de pago */}
            <div className="checkout-section">
              <h3>Método de Pago</h3>
              <div className="payment-methods">
                <div className="payment-item">
                  <input
                    type="radio"
                    id="tarjeta"
                    name="metodoPago"
                    value="TARJETA_CREDITO"
                    checked={metodoPago === 'TARJETA_CREDITO'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <label htmlFor="tarjeta">Tarjeta de Crédito/Débito</label>
                </div>
                <div className="payment-item">
                  <input
                    type="radio"
                    id="efectivo"
                    name="metodoPago"
                    value="EFECTIVO"
                    checked={metodoPago === 'EFECTIVO'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <label htmlFor="efectivo">Pago Contra Entrega</label>
                </div>
                <div className="payment-item">
                  <input
                    type="radio"
                    id="transferencia"
                    name="metodoPago"
                    value="TRANSFERENCIA"
                    checked={metodoPago === 'TRANSFERENCIA'}
                    onChange={(e) => setMetodoPago(e.target.value)}
                  />
                  <label htmlFor="transferencia">Transferencia Bancaria</label>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="col-lg-4">
            <div className="order-summary">
              <h3>Resumen del Pedido</h3>

              <div className="summary-items">
                {cart.map((item) => (
                  <div key={item.varianteId} className="summary-item">
                    <span>
                      {item.productoNombre} (x{item.cantidad})
                    </span>
                    <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <hr />

              <div className="summary-row">
                <span>Subtotal:</span>
                <span>S/ {subtotal.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Envío:</span>
                <span>S/ {envio.toFixed(2)}</span>
              </div>

              <hr />

              <div className="summary-row total">
                <strong>Total:</strong>
                <strong>S/ {total.toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handleSubmitOrder}
                disabled={loading || !selectedDireccion}
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
