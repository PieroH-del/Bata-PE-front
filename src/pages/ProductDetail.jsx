import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    fetchProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProducto = async () => {
    setLoading(true);
    try {
      const productoRes = await productosAPI.getById(id);
      setProducto(productoRes.data);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      setMensaje('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setTimeout(() => {
        navigate('/login?redirect=/producto/' + id);
      }, 1500);
      return;
    }

    addToCart(producto, cantidad);
    setMensaje('¡Producto agregado al carrito!');
    
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const handleComprarAhora = () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setTimeout(() => {
        navigate('/login?redirect=/producto/' + id);
      }, 1500);
      return;
    }

    handleAddToCart();
    setTimeout(() => {
      navigate('/carrito');
    }, 500);
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(producto.id)) {
      removeFromWishlist(producto.id);
      setMensaje('Producto eliminado de favoritos');
    } else {
      addToWishlist(producto);
      setMensaje('¡Producto agregado a favoritos!');
    }

    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="loading">Cargando producto...</div>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="error">Producto no encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container py-4">
        {showLoginMessage && (
          <div className="alert alert-warning" role="alert">
            Debes iniciar sesión para agregar productos al carrito. Redirigiendo...
          </div>
        )}

        {mensaje && (
          <div className="alert alert-success" role="alert">
            {mensaje}
          </div>
        )}

        <div className="row">
          {/* Imagen del producto */}
          <div className="col-md-6">
            <div className="product-gallery">
              <div className="main-image">
                {producto.urlImg ? (
                  <img
                    src={producto.urlImg}
                    alt={producto.nombre}
                  />
                ) : (
                  <div className="no-image">Sin imagen</div>
                )}
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-6">
            <div className="product-details">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="product-title">{producto.nombre}</h1>
                <button
                  className={`btn-wishlist ${isInWishlist(producto.id) ? 'active' : ''}`}
                  onClick={handleToggleWishlist}
                  title={isInWishlist(producto.id) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                >
                  <i className={`${isInWishlist(producto.id) ? 'fas' : 'far'} fa-heart`}></i>
                </button>
              </div>

              <div className="product-meta">
                <span className="genero-badge">{producto.genero}</span>
                {producto.material && (
                  <span className="material-badge">{producto.material}</span>
                )}
              </div>

              <div className="product-price">
                <span className="price">S/ {producto.precioRegular.toFixed(2)}</span>
              </div>

              <div className="product-description">
                <p>{producto.descripcion}</p>
              </div>

              {/* Cantidad */}
              <div className="quantity-section">
                <label>Cantidad:</label>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="99"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => setCantidad(Math.min(99, cantidad + 1))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="action-buttons">
                <button
                  className="btn btn-primary btn-lg w-100 mb-2"
                  onClick={handleComprarAhora}
                >
                  Comprar Ahora
                </button>
                <button
                  className="btn btn-outline-primary btn-lg w-100"
                  onClick={handleAddToCart}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
