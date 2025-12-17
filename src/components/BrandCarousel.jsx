import React from 'react';
import './BrandCarousel.css';

const BrandCarousel = () => {
  const brands = [
    { name: 'NORTH STAR', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxTivgTtN5DTzTfoYRHEGEJKFTgKu4Grv-qg&s' },
    { name: 'POWER', image: 'https://via.placeholder.com/400x300' },
    { name: 'WEINBRENNER', image: 'https://via.placeholder.com/400x300' }
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
