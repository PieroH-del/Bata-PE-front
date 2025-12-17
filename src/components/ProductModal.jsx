import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productosAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './ProductModal.css';

const ProductModal = ({ productId, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const fetchProducto = async () => {
    console.log('=== FETCH PRODUCTO ===');
    console.log('ProductId:', productId);
    console.log('URL que se llamará: /productos/' + productId);
    setLoading(true);
    setProducto(null);
    try {
      const response = await productosAPI.getById(productId);
      console.log('Respuesta del servidor:', response);
      console.log('Datos del producto:', response.data);
      setProducto(response.data);
    } catch (error) {
      console.error('Error al cargar producto:', error);
      console.error('Error completo:', error.response || error);
    } finally {
      setLoading(false);
      console.log('Loading establecido a false');
    }
  };

  useEffect(() => {
    if (productId) {
      console.log('ProductModal - productId:', productId);
      fetchProducto();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setShowLoginMessage(true);
      setTimeout(() => {
        navigate('/login?redirect=/cart');
        onClose();
      }, 1500);
      return;
    }

    if (producto) {
      addToCart(producto, 1);
      // Mostrar mensaje de éxito
      alert('Producto agregado al carrito');
    }
  };

  const handleAddToWishlist = () => {
    if (producto) {
      addToWishlist(producto);
    }
  };

  const handleViewDetails = () => {
    navigate(`/producto/${productId}`);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!productId) return null;

  const isInWishlist = wishlist ? wishlist.some(item => item.id === productId) : false;

  console.log('ProductModal render - loading:', loading, 'producto:', producto, 'productId:', productId);

  return (
    <div className="product-modal-overlay" onClick={handleOverlayClick}>
      <div className="product-modal">
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {showLoginMessage && (
          <div className="alert alert-warning" role="alert">
            Debes iniciar sesión para agregar productos al carrito. Redirigiendo...
          </div>
        )}

        {loading ? (
          <div className="modal-loading">
            <p>Cargando producto...</p>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : producto ? (
          <div className="modal-content">
            <div className="modal-image-section">
              {producto.urlImg ? (
                <img src={producto.urlImg} alt={producto.nombre} className="modal-product-image" />
              ) : (
                <div className="modal-no-image">Sin imagen</div>
              )}
            </div>

            <div className="modal-info-section">
              <h2 className="modal-product-title">{producto.nombre}</h2>
              
              <div className="modal-product-price">
                <span className="price-label">Precio:</span>
                <span className="price-value">S/ {producto.precioRegular.toFixed(2)}</span>
              </div>

              {producto.descripcion && (
                <div className="modal-product-description">
                  <h4>Descripción</h4>
                  <p>{producto.descripcion}</p>
                </div>
              )}

              <div className="modal-product-details">
                {producto.genero && (
                  <div className="detail-item">
                    <span className="detail-label">Género:</span>
                    <span className="detail-value">{producto.genero}</span>
                  </div>
                )}
                {producto.material && (
                  <div className="detail-item">
                    <span className="detail-label">Material:</span>
                    <span className="detail-value">{producto.material}</span>
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  className="btn btn-primary btn-add-cart"
                  onClick={handleAddToCart}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Agregar al Carrito
                </button>
                
                <button 
                  className={`btn btn-outline-danger btn-wishlist ${isInWishlist ? 'active' : ''}`}
                  onClick={handleAddToWishlist}
                  disabled={isInWishlist}
                >
                  <i className={`${isInWishlist ? 'fas' : 'far'} fa-heart me-2`}></i>
                  {isInWishlist ? 'En Favoritos' : 'Favoritos'}
                </button>

                <button 
                  className="btn btn-outline-secondary btn-view-details"
                  onClick={handleViewDetails}
                >
                  Ver Detalles Completos
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-error">
            <p>No se pudo cargar el producto</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
