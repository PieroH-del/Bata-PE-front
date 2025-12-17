import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { direccionesAPI } from '../services/api';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    contrasenaHash: '',
    confirmPassword: '',
    nombres: '',
    apellidos: '',
    telefono: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (formData.contrasenaHash !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.contrasenaHash.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      // Separar datos de usuario y dirección
      const { confirmPassword: _, direccionCalle, ciudad, provincia, codigoPostal, pais, ...registerData } = formData;

      // Registrar usuario
      const result = await register(registerData);

      if (result.success && result.user) {
        // Crear dirección para el usuario
        try {
          await direccionesAPI.create({
            usuarioId: result.user.id,
            direccionCalle,
            ciudad,
            provincia,
            codigoPostal,
            pais,
            esPrincipal: true
          });
        } catch (dirError) {
          console.error('Error al crear dirección:', dirError);
          // Continuar aunque falle la creación de dirección
        }

        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear la cuenta. Por favor intenta de nuevo.');
    }

    setLoading(false);
  };

  return (
    <div className="register-page">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="register-card">
              <h2 className="text-center mb-4">Crear Cuenta</h2>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

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
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
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

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contrasenaHash" className="form-label">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="contrasenaHash"
                      name="contrasenaHash"
                      value={formData.contrasenaHash}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Contraseña *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                  </div>
                </div>

                <hr className="my-4" />
                <h5 className="mb-3">Dirección de Envío</h5>

                <div className="mb-3">
                  <label htmlFor="direccionCalle" className="form-label">
                    Dirección (Calle y Número) *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccionCalle"
                    name="direccionCalle"
                    placeholder="Ej: Av. Larco 123, Dpto 301"
                    value={formData.direccionCalle}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="ciudad" className="form-label">
                      Ciudad/Distrito *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ciudad"
                      name="ciudad"
                      placeholder="Ej: Miraflores"
                      value={formData.ciudad}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="provincia" className="form-label">
                      Provincia/Departamento *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="provincia"
                      name="provincia"
                      placeholder="Ej: Lima"
                      value={formData.provincia}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="codigoPostal" className="form-label">
                      Código Postal *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="codigoPostal"
                      name="codigoPostal"
                      placeholder="Ej: 15074"
                      value={formData.codigoPostal}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="pais" className="form-label">
                      País *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="mb-0">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" className="link-primary">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
