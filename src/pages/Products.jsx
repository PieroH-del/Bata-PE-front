import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productosAPI, categoriasAPI } from '../services/api';
import './Products.css';

const Products = () => {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoria, setSelectedCategoria] = useState(categoriaId || 'all');

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [selectedCategoria, categoriaId]);

  const fetchCategorias = async () => {
    try {
      const response = await categoriasAPI.getAll();
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const fetchProductos = async () => {
    setLoading(true);
    try {
      let response;
      const catId = categoriaId || selectedCategoria;
      
      if (catId && catId !== 'all') {
        response = await productosAPI.getByCategoria(catId);
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

  const handleCategoriaChange = (catId) => {
    setSelectedCategoria(catId);
    if (catId === 'all') {
      navigate('/productos');
    } else {
      navigate(`/productos/categoria/${catId}`);
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
        <div className="row">
          {/* Sidebar de filtros */}
          <div className="col-md-3">
            <div className="filters-sidebar">
              <h5>Categorías</h5>
              <ul className="category-list">
                <li>
                  <button
                    className={selectedCategoria === 'all' ? 'active' : ''}
                    onClick={() => handleCategoriaChange('all')}
                  >
                    Todos los productos
                  </button>
                </li>
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    <button
                      className={selectedCategoria === cat.id.toString() ? 'active' : ''}
                      onClick={() => handleCategoriaChange(cat.id)}
                    >
                      {cat.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="col-md-9">
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
                  <div key={producto.id} className="col-md-4 col-sm-6 mb-4">
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
      </div>
    </div>
  );
};

export default Products;
