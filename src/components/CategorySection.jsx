import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriasAPI } from '../services/api';
import './CategorySection.css';

const CategorySection = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Imágenes predeterminadas por categoría
  const defaultImages = {
    'Zapatillas': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80',
    'Sandalias': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80',
    'Zapatos': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
    'Botines': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80',
    'Deportivos': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    'default': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80'
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      console.log('Fetching categorías...');
      const response = await categoriasAPI.getAll();
      console.log('Categorías recibidas:', response.data);
      
      setCategorias(response.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryImage = (categoria) => {
    // Normalizar el nombre de la categoría removiendo acentos y convirtiendo a minúsculas
    const normalizedName = categoria.nombre
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/ã/g, 'i'); // Fix para el encoding issue

    // Mapeo de nombres normalizados a claves de imágenes
    const imageMap = {
      'zapatillas': 'Zapatillas',
      'sandalias': 'Sandalias',
      'zapatos': 'Zapatos',
      'botines': 'Botines',
      'deportivos': 'Deportivos'
    };

    const imageKey = imageMap[normalizedName] || 'default';
    return defaultImages[imageKey];
  };

  const handleCategoryClick = (categoriaId) => {
    navigate(`/productos/categoria/${categoriaId}`);
  };

  if (loading) {
    return (
      <section className="category-section py-5">
        <div className="container-fluid px-4">
          <h2 className="section-title text-center mb-5">Descubre</h2>
          <div className="text-center">Cargando categorías...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category-section py-5">
        <div className="container-fluid px-4">
          <h2 className="section-title text-center mb-5">Descubre</h2>
          <div className="text-center text-danger">
            Error al cargar categorías: {error}
          </div>
        </div>
      </section>
    );
  }

  if (categorias.length === 0) {
    return (
      <section className="category-section py-5">
        <div className="container-fluid px-4">
          <h2 className="section-title text-center mb-5">Descubre</h2>
          <div className="text-center">No hay categorías disponibles</div>
        </div>
      </section>
    );
  }

  return (
    <section className="category-section py-5">
      <div className="container-fluid px-4">
        <h2 className="section-title text-center mb-5">Descubre</h2>
        
        <div className="category-scroll-container">
          <div className="category-scroll">
            {categorias.map((categoria) => (
              <div 
                className="category-item" 
                key={categoria.id}
                onClick={() => handleCategoryClick(categoria.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-card">
                  <img 
                    src={getCategoryImage(categoria)} 
                    alt={categoria.nombre} 
                    className="category-image" 
                  />
                  <div className="category-overlay">
                    <h3 className="category-name">{categoria.nombre.toUpperCase()}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
