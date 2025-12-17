import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosAPI } from '../services/api';
import './Products.css';

const Products = () => {
  const { categoriaId, marcaId, genero } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, [categoriaId, marcaId, genero]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      let response;

      if (genero) {
        response = await productosAPI.getByGenero(genero);
      } else if (categoriaId && categoriaId !== 'all') {
        response = await productosAPI.getByCategoria(categoriaId);
      } else if (marcaId && marcaId !== 'all') {
        response = await productosAPI.getByMarca(marcaId);
      } else {
        response = await productosAPI.getAll();
      }
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading">Cargando productos...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container py-4">
        <div className="products-header mb-4">
          <h2>Productos</h2>
          <p className="text-muted">{productos.length} productos encontrados</p>
        </div>

        {productos.length === 0 ? (
          <div className="no-products">
            <p>No se encontraron productos en esta categoría.</p>
          </div>
        ) : (
          <div className="row">
            {productos.map((producto) => (
              <div key={producto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div
                  className="product-card"
                  onClick={() => handleProductClick(producto.id)}
                >
                  <div className="product-image">
                    {producto.imagenPrincipal ? (
                      <img
                        src={producto.imagenPrincipal}
                        alt={producto.nombre}
                      />
                    ) : (
                      <div className="no-image">Sin imagen</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h5 className="product-name">{producto.nombre}</h5>
                    <p className="product-description">
                      {producto.descripcion}
                    </p>
                    <div className="product-price">
                      <span className="price">S/ {producto.precioRegular.toFixed(2)}</span>
                    </div>
                    <p className="product-genero text-muted">{producto.genero}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
