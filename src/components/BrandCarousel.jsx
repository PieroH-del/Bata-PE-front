import React from 'react';
import './BrandCarousel.css';

const BrandCarousel = () => {
  const brands = [
    { name: 'NORTH STAR', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80' },
    { name: 'POWER', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&q=80' },
    { name: 'WEINBRENNER', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80' }
  ];

  return (
    <section className="brand-carousel py-5">
      <div className="container-fluid px-4">
        <div className="row g-0">
          {brands.map((brand, index) => (
            <div className="col-md-4" key={index}>
              <div className="brand-card">
                <img src={brand.image} alt={brand.name} className="brand-image" />
                <div className="brand-overlay">
                  <h3 className="brand-name">{brand.name}</h3>
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
