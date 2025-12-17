import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marcasAPI } from '../services/api';
import './BrandCarousel.css';

const BrandCarousel = () => {
  const navigate = useNavigate();
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarcas();
  }, []);

  const fetchMarcas = async () => {
    try {
      const response = await marcasAPI.getAll();
      console.log('Marcas recibidas:', response.data);
      // Filtrar solo marcas activas
      const marcasActivas = response.data.filter(marca => marca.activo);
      console.log('Marcas activas:', marcasActivas);
      setMarcas(marcasActivas);
    } catch (error) {
      console.error('Error al cargar marcas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandClick = (marcaId) => {
    navigate(`/productos/marca/${marcaId}`);
  };

  if (loading) {
    return (
      <section className="brand-carousel py-5">
        <div className="container-fluid px-4">
          <div className="text-center">Cargando marcas...</div>
        </div>
      </section>
    );
  }

  if (marcas.length === 0) {
    return null;
  }

  return (
    <section className="brand-carousel py-5">
      <div className="container-fluid px-4">
        <h2 className="section-title text-center mb-5">Marcas</h2>
        <div className="row g-3">
          {marcas.map((marca) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={marca.id}>
              <div 
                className="brand-card"
                onClick={() => handleBrandClick(marca.id)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={marca.logoUrl} 
                  alt={marca.nombre} 
                  className="brand-image" 
                />
                <div className="brand-overlay">
                  <h3 className="brand-name">{marca.nombre.toUpperCase()}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
