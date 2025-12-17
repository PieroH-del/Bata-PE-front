import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/perfil');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="container py-4">
        <h1 className="page-title">Mi Perfil</h1>

        <div className="row">
          <div className="col-md-4">
            <div className="profile-sidebar">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {user.nombres?.charAt(0)}{user.apellidos?.charAt(0)}
                </div>
                <h4>
                  {user.nombres} {user.apellidos}
                </h4>
                <p className="text-muted">{user.email}</p>
              </div>

              <nav className="profile-nav">
                <button
                  className="nav-item active"
                  onClick={() => navigate('/perfil')}
                >
                  Información Personal
                </button>
                <button
                  className="nav-item"
                  onClick={() => navigate('/mis-pedidos')}
                >
                  Mis Pedidos
                </button>
                <button className="nav-item" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </div>

          <div className="col-md-8">
            <div className="profile-content">
              <h3>Información Personal</h3>

              <div className="info-section">
                <div className="info-item">
                  <label>Nombres:</label>
                  <p>{user.nombres}</p>
                </div>

                <div className="info-item">
                  <label>Apellidos:</label>
                  <p>{user.apellidos}</p>
                </div>

                <div className="info-item">
                  <label>Email:</label>
                  <p>{user.email}</p>
                </div>

                <div className="info-item">
                  <label>Teléfono:</label>
                  <p>{user.telefono}</p>
                </div>

                {user.fechaRegistro && (
                  <div className="info-item">
                    <label>Miembro desde:</label>
                    <p>
                      {new Date(user.fechaRegistro).toLocaleDateString('es-PE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>

              <div className="info-message mt-4">
                <p>
                  <strong>Nota:</strong> Para actualizar tu información personal,
                  por favor contacta con soporte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
