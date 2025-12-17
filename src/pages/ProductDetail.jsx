import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosAPI, variantesAPI, imagenesAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [producto, setProducto] = useState(null);
  const [variantes, setVariantes] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [selectedVariante, setSelectedVariante] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    fetchProducto();
  }, [id]);

  const fetchProducto = async () => {
    setLoading(true);
    try {
      const [productoRes, variantesRes, imagenesRes] = await Promise.all([
        productosAPI.getById(id),
        variantesAPI.getByProducto(id),
        imagenesAPI.getByProducto(id),
      ]);

      setProducto(productoRes.data);
      setVariantes(variantesRes.data);
      setImagenes(imagenesRes.data);

      if (variantesRes.data.length > 0) {
        setSelectedVariante(variantesRes.data[0]);
      }
    } catch (error) {
      console.error('Error al cargar producto:', error);
      setMensaje('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariante) {
      setMensaje('Por favor selecciona una variante');
      return;
    }

    if (selectedVariante.stock < cantidad) {
      setMensaje('No hay suficiente stock disponible');
      return;
    }

    const productoData = {
      ...producto,
      imagenPrincipal: imagenes[0]?.urlImagen || '',
    };

    addToCart(productoData, selectedVariante, cantidad);
    setMensaje('¡Producto agregado al carrito!');
    
    setTimeout(() => {
      setMensaje('');
    }, 3000);
  };

  const handleComprarAhora = () => {
    handleAddToCart();
    setTimeout(() => {
      navigate('/carrito');
    }, 500);
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
        {mensaje && (
          <div className="alert alert-success" role="alert">
            {mensaje}
          </div>
        )}

        <div className="row">
          {/* Galería de imágenes */}
          <div className="col-md-6">
            <div className="product-gallery">
              <div className="main-image">
                {imagenes.length > 0 ? (
                  <img
                    src={imagenes[selectedImage]?.urlImagen}
                    alt={producto.nombre}
                  />
                ) : (
                  <div className="no-image">Sin imagen</div>
                )}
              </div>
              
              {imagenes.length > 1 && (
                <div className="image-thumbnails">
                  {imagenes.map((img, index) => (
                    <div
                      key={img.id}
                      className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={img.urlImagen} alt={`Vista ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información del producto */}
          <div className="col-md-6">
            <div className="product-details">
              <h1 className="product-title">{producto.nombre}</h1>
              
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

              {/* Selector de variantes */}
              {variantes.length > 0 && (
                <div className="variants-section">
                  <h5>Selecciona talla y color:</h5>
                  <div className="variants-grid">
                    {variantes.map((variante) => (
                      <button
                        key={variante.id}
                        className={`variant-btn ${
                          selectedVariante?.id === variante.id ? 'active' : ''
                        } ${variante.stock === 0 ? 'out-of-stock' : ''}`}
                        onClick={() => setSelectedVariante(variante)}
                        disabled={variante.stock === 0}
                      >
                        <div className="variant-info">
                          <span className="talla">{variante.talla}</span>
                          <span className="color">{variante.color}</span>
                        </div>
                        {variante.stock === 0 ? (
                          <small>Agotado</small>
                        ) : (
                          <small>Stock: {variante.stock}</small>
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedVariante && (
                    <div className="selected-variant-info mt-3">
                      <p>
                        <strong>Seleccionado:</strong> Talla {selectedVariante.talla} - {selectedVariante.color}
                      </p>
                      {selectedVariante.precioFinal && selectedVariante.precioFinal !== producto.precioRegular && (
                        <p className="variant-price">
                          Precio: <strong>S/ {selectedVariante.precioFinal.toFixed(2)}</strong>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

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
                    max={selectedVariante?.stock || 99}
                  />
                  <button
                    className="qty-btn"
                    onClick={() => setCantidad(Math.min(selectedVariante?.stock || 99, cantidad + 1))}
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
                  disabled={!selectedVariante || selectedVariante.stock === 0}
                >
                  Comprar Ahora
                </button>
                <button
                  className="btn btn-outline-primary btn-lg w-100"
                  onClick={handleAddToCart}
                  disabled={!selectedVariante || selectedVariante.stock === 0}
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
