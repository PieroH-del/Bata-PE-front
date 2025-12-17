import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product) => {
    addToCart({
      productoId: product.id,
      nombre: product.nombre,
      precio: product.precioRegular,
      cantidad: 1,
      imagen: product.imagenPrincipal
    });
  };

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="wishlist-page">
        <div className="container py-5">
          <div className="wishlist-empty">
            <i className="fas fa-heart fa-3x mb-3 text-muted"></i>
            <h2>¡Tus favoritos se guardarán por un tiempo limitado!</h2>
            <p className="mb-4">
              <Link to="/login" className="text-danger">Inicia sesión</Link> o{' '}
              <Link to="/register" className="text-danger">regístrate</Link> y guardaremos tus favoritos
              para que puedas verlos desde diferentes dispositivos.
            </p>
            <Link to="/" className="btn btn-outline-dark">PÁGINA DE INICIO</Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container py-5">
          <div className="wishlist-empty">
            <i className="fas fa-heart fa-3x mb-3 text-muted"></i>
            <h2>Lista de favoritos vacía</h2>
            <p className="mb-4">
              Agrega tus productos favoritos en tu Wishlist así podrás encontrarlos la próxima vez que
              ingreses a tu cuenta.¡Haz clic en el ícono de corazón!
            </p>
            <Link to="/productos" className="btn btn-danger me-3">SEGUIR COMPRANDO</Link>
            <Link to="/" className="btn btn-outline-dark">PÁGINA DE INICIO</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container py-5">
        <div className="wishlist-header mb-4">
          <h1 className="wishlist-title">Mis Favoritos</h1>
          <p className="wishlist-count">{wishlistItems.length} producto{wishlistItems.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="row">
          {wishlistItems.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="wishlist-product-card">
                <button
                  className="remove-wishlist-btn"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  title="Eliminar de favoritos"
                >
                  <i className="fas fa-times"></i>
                </button>

                <div
                  className="wishlist-product-image"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {product.imagenPrincipal ? (
                    <img src={product.imagenPrincipal} alt={product.nombre} />
                  ) : (
                    <div className="no-image">Sin imagen</div>
                  )}
                </div>

                <div className="wishlist-product-info">
                  <h5
                    className="wishlist-product-name"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.nombre}
                  </h5>

                  {product.descripcion && (
                    <p className="wishlist-product-description">{product.descripcion}</p>
                  )}

                  <div className="wishlist-product-price">
                    <span className="price">S/ {product.precioRegular?.toFixed(2)}</span>
                  </div>

                  <button
                    className="btn btn-add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-shopping-bag me-2"></i>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-actions mt-5">
          <Link to="/productos" className="btn btn-danger btn-lg">
            SEGUIR COMPRANDO
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
