import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productosAPI, marcasAPI } from '../services/api';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();

  // Estados
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredMarcas, setHoveredMarcas] = useState(false);
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [generoNombre, setGeneroNombre] = useState('');
  const [loadingProductos, setLoadingProductos] = useState(false);
  const [loadingMarcas, setLoadingMarcas] = useState(false);

  // Cargar marcas al montar el componente
  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    setLoadingMarcas(true);
    try {
      const response = await marcasAPI.getAll();
      if (response.data && response.data.length > 0) {
        setMarcas(response.data);
      } else {
        // Marcas por defecto si la API no devuelve datos
        setMarcas([
          { id: 1, nombre: 'Weinbrenner', imagen: 'https://dx23yqi1tewca.cloudfront.net/images/poiLogo/4fa55945-155d-485f-88a0-faa054cd061b.png' },
          { id: 2, nombre: 'North Star', imagen: 'https://images.squarespace-cdn.com/content/v1/60ff37b1a909e23e974d1f68/1627706453417-RB1FF3REAXVE4J4CV0YB/Artboard+6.png' },
          { id: 3, nombre: 'Power', imagen: 'https://cdn.freebiesupply.com/logos/large/2x/power-logo-png-transparent.png' },
          { id: 4, nombre: 'Bubble Gummers', imagen: 'https://www.unicentroyopal.com.co/wp-content/uploads/2024/05/bubblegummers_Mesa-de-trabajo-1.png' }
        ]);
      }
    } catch (error) {
      console.error('Error al cargar marcas:', error);
      // Marcas por defecto en caso de error
      setMarcas([
        { id: 1, nombre: 'Weinbrenner', imagen: 'https://dx23yqi1tewca.cloudfront.net/images/poiLogo/4fa55945-155d-485f-88a0-faa054cd061b.png' },
        { id: 2, nombre: 'North Star', imagen: 'https://images.squarespace-cdn.com/content/v1/60ff37b1a909e23e974d1f68/1627706453417-RB1FF3REAXVE4J4CV0YB/Artboard+6.png' },
        { id: 3, nombre: 'Power', imagen: 'https://cdn.freebiesupply.com/logos/large/2x/power-logo-png-transparent.png' },
        { id: 4, nombre: 'Bubble Gummers', imagen: 'https://www.unicentroyopal.com.co/wp-content/uploads/2024/05/bubblegummers_Mesa-de-trabajo-1.png' }
      ]);
    } finally {
      setLoadingMarcas(false);
    }
  };

  const handleGenderHover = async (genero) => {
    setHoveredCategory(genero);
    setGeneroNombre(genero);
    setLoadingProductos(true);
    try {
      const response = await productosAPI.getByGenero(genero);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos por género:', error);
      setProductos([]);
    } finally {
      setLoadingProductos(false);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setProductos([]);
    setGeneroNombre('');
    setHoveredMarcas(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <p className="mb-0">Paga seguro con Yape o Plin.</p>
      </div>

      {/* Brand Banner */}
      <div className="brand-banner">
        <div className="container-fluid">
          <div className="d-flex justify-content-around align-items-center py-2">
            <img src="https://dx23yqi1tewca.cloudfront.net/images/poiLogo/4fa55945-155d-485f-88a0-faa054cd061b.png" alt="Weinbrenner" className="brand-logo" />
            <img src="https://images.squarespace-cdn.com/content/v1/60ff37b1a909e23e974d1f68/1627706453417-RB1FF3REAXVE4J4CV0YB/Artboard+6.png" alt="North Star" className="brand-logo" />
            <img src="https://cdn.freebiesupply.com/logos/large/2x/power-logo-png-transparent.png" alt="Power" className="brand-logo" />
            <img src="https://www.unicentroyopal.com.co/wp-content/uploads/2024/05/bubblegummers_Mesa-de-trabajo-1.png" alt="Bubble Gummers" className="brand-logo" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container-fluid px-4">
          {/* Left Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li
                className="nav-item"
                onMouseEnter={() => {
                  handleGenderHover('MUJER');
                  setHoveredMarcas(false);
                }}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget;
                  if (!relatedTarget || !relatedTarget.closest('.mega-menu-panel')) {
                    setHoveredCategory(null);
                    setProductos([]);
                  }
                }}
              >
                <Link
                  className={`nav-link ${hoveredCategory === 'MUJER' ? 'active-category' : ''}`}
                  to="/productos/genero/MUJER"
                >
                  Mujer
                </Link>
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => {
                  handleGenderHover('HOMBRE');
                  setHoveredMarcas(false);
                }}
                onMouseLeave={(e) => {
                  const relatedTarget = e.relatedTarget;
                  if (!relatedTarget || !relatedTarget.closest('.mega-menu-panel')) {
                    setHoveredCategory(null);
                    setProductos([]);
                  }
                }}
              >
                <Link
                  className={`nav-link ${hoveredCategory === 'HOMBRE' ? 'active-category' : ''}`}
                  to="/productos/genero/HOMBRE"
                >
                  Hombre
                </Link>
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => {
                  setHoveredMarcas(true);
                  setHoveredCategory(null);
                }}
                onMouseLeave={(e) => {
                  // Solo cerrar si el mouse no está yendo hacia el mega menu
                  const relatedTarget = e.relatedTarget;
                  if (!relatedTarget || !relatedTarget.closest('.mega-menu-panel')) {
                    setHoveredMarcas(false);
                  }
                }}
              >
                <Link
                  className={`nav-link ${hoveredMarcas ? 'active-category' : ''}`}
                  to="/productos"
                >
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo Center */}
          <Link className="navbar-brand mx-auto position-absolute start-50 translate-middle-x" to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Bata.svg/2560px-Bata.svg.png" alt="Bata" className="logo" />
          </Link>

          {/* Right Icons */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/productos" className="text-decoration-none text-dark d-flex align-items-center">
              <i className="fas fa-search me-1"></i>
              <span className="d-none d-md-inline">Buscar</span>
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-link text-decoration-none text-dark dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-lg"></i>
                  <span className="d-none d-md-inline ms-1">{user?.nombres}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/perfil">
                      <i className="fas fa-user me-2"></i>Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/mis-pedidos">
                      <i className="fas fa-box me-2"></i>Mis Pedidos
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="text-decoration-none text-dark">
                <i className="fas fa-user fa-lg"></i>
              </Link>
            )}

            <Link to="/favoritos" className="text-decoration-none text-dark position-relative">
              <i className="fas fa-heart fa-lg"></i>
              {getWishlistCount() > 0 && (
                <span className="cart-badge">{getWishlistCount()}</span>
              )}
            </Link>
            
            {/* Cart with count */}
            <Link to="/carrito" className="text-decoration-none text-dark position-relative">
              <i className="fas fa-shopping-bag fa-lg"></i>
              {getCartCount() > 0 && (
                <span className="cart-badge">{getCartCount()}</span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Mega Menu - Panel completo de productos */}
      {hoveredCategory && hoveredCategory !== 'MARCAS' && !hoveredMarcas && (
        <div className="mega-menu-panel" onMouseLeave={handleMouseLeave}>
          <div className="container-fluid px-4 py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mega-menu-title">{generoNombre}</h3>
              <Link
                to={`/productos/genero/${hoveredCategory}`}
                className="btn btn-outline-danger"
                onClick={handleMouseLeave}
              >
                Ver todos los productos →
              </Link>
            </div>
            
            {loadingProductos ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : productos.length > 0 ? (
              <div className="row g-4">
                {productos.map((producto) => (
                  <div key={producto.id} className="col-6 col-md-3 col-lg-2">
                    <Link 
                      to={`/producto/${producto.id}`}
                      className="mega-menu-product"
                      onClick={handleMouseLeave}
                    >
                      <div className="mega-menu-product-image">
                        <img 
                          src={producto.imagenPrincipal} 
                          alt={producto.nombre}
                        />
                      </div>
                      <div className="mega-menu-product-info">
                        <p className="mega-menu-product-name">{producto.nombre}</p>
                        <p className="mega-menu-product-price">S/ {producto.precioBase?.toFixed(2)}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted">No hay productos disponibles en esta categoría</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mega Menu - Panel de Marcas */}
      {hoveredMarcas && (
        <div className="mega-menu-panel" onMouseLeave={handleMouseLeave}>
          <div className="container-fluid px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mega-menu-title">Nuestras Marcas</h3>
            </div>

            {loadingMarcas ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : marcas.length > 0 ? (
              <div className="row g-4 justify-content-center">
                {marcas.map((marca) => (
                  <div key={marca.id} className="col-6 col-md-3 col-lg-2">
                    <Link
                      to={`/productos/marca/${marca.id}`}
                      className="brand-card"
                      onClick={handleMouseLeave}
                    >
                      <div className="brand-card-image">
                        <img
                          src={marca.imagen || marca.logo}
                          alt={marca.nombre}
                        />
                      </div>
                      <div className="brand-card-name">
                        <p>{marca.nombre}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <p className="text-muted">No hay marcas disponibles</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
