import React from 'react';
import './ProductPromotion.css';

const ProductPromotion = () => {
  return (
    <section className="product-promotion py-5">
      <div className="container-fluid px-4">
        <div className="row g-4">
          {/* Zapatillas */}
          <div className="col-md-6">
            <div className="promotion-card">
              <img src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80" alt="Zapatillas" className="promotion-image" />
              <div className="promotion-overlay">
                <span className="promotion-badge">REGALA ZAPATILLAS</span>
                <h2 className="promotion-title">HASTA -60% OFF</h2>
                <div className="promotion-buttons">
                  <button className="btn btn-promotion">MUJER</button>
                  <button className="btn btn-promotion">HOMBRE</button>
                </div>
              </div>
            </div>
          </div>

          {/* Sandalias */}
          <div className="col-md-6">
            <div className="promotion-card">
              <img src="https://images.unsplash.com/photo-1603487742131-4160ec999306?w=800&q=80" alt="Sandalias" className="promotion-image" />
              <div className="promotion-overlay">
                <span className="promotion-badge">REGALA SANDALIAS</span>
                <h2 className="promotion-title">HASTA -50% OFF</h2>
                <div className="promotion-buttons">
                  <button className="btn btn-promotion">MUJER</button>
                  <button className="btn btn-promotion">HOMBRE</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPromotion;
