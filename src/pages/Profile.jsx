import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombres: user?.nombres || '',
    apellidos: user?.apellidos || '',
    telefono: user?.telefono || '',
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/perfil');
    }
  }, [isAuthenticated, navigate]);

  React.useEffect(() => {
    if (user) {
      setFormData({
        nombres: user.nombres || '',
        apellidos: user.apellidos || '',
        telefono: user.telefono || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMensaje('');

    try {
      // Aquí deberías llamar a la API para actualizar el usuario
      // Por ahora solo actualizamos el contexto local
      const updatedUser = {
        ...user,
        ...formData
      };

      updateUser(updatedUser);
      setMensaje('Perfil actualizado exitosamente');
      setIsEditing(false);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al actualizar el perfil. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombres: user?.nombres || '',
      apellidos: user?.apellidos || '',
      telefono: user?.telefono || '',
    });
    setIsEditing(false);
    setError('');
    setMensaje('');
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
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Información Personal</h3>
                {!isEditing && (
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fas fa-edit me-2"></i>
                    Editar Perfil
                  </button>
                )}
              </div>

              {mensaje && (
                <div className="alert alert-success" role="alert">
                  {mensaje}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nombres" className="form-label">
                        Nombres *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nombres"
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="apellidos" className="form-label">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={user.email}
                      disabled
                      readOnly
                    />
                    <small className="text-muted">El correo electrónico no puede ser modificado</small>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
