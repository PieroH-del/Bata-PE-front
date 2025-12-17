import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();

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
            <img src="https://via.placeholder.com/120x40?text=WEINBRENNER" alt="Weinbrenner" className="brand-logo" />
            <img src="https://via.placeholder.com/120x40?text=NORTH+STAR" alt="North Star" className="brand-logo" />
            <img src="https://via.placeholder.com/120x40?text=POWER" alt="Power" className="brand-logo" />
            <img src="https://via.placeholder.com/120x40?text=BUBBLE+GUMMERS" alt="Bubble Gummers" className="brand-logo" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container-fluid px-4">
          {/* Left Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/productos">
                  Productos 🎁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Mujer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Hombre</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Infantil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Marcas</Link>
              </li>
            </ul>
          </div>

          {/* Logo Center */}
          <Link className="navbar-brand mx-auto position-absolute start-50 translate-middle-x" to="/">
            <img src="https://via.placeholder.com/120x50?text=Bata" alt="Bata" className="logo" />
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

            <Link to="/productos" className="text-decoration-none text-dark">
              <i className="fas fa-heart fa-lg"></i>
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
    </>
  );
};

export default Header;
