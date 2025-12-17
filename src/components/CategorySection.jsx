import React from 'react';
import './CategorySection.css';

const CategorySection = () => {
  const categories = [
    { name: 'SANDALIAS', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80' },
    { name: 'ACCESORIOS', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
    { name: 'SNEAKERS', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&q=80' },
    { name: 'DEPORTIVOS', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' }
  ];

  return (
    <section className="category-section py-5">
      <div className="container-fluid px-4">
        <h2 className="section-title text-center mb-5">Descubre</h2>
        
        <div className="category-scroll-container">
          <button className="scroll-arrow scroll-arrow-left">
            <i className="fas fa-chevron-left"></i>
          </button>
          
          <div className="category-scroll">
            {categories.map((category, index) => (
              <div className="category-item" key={index}>
                <div className="category-card">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="scroll-arrow scroll-arrow-right">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
