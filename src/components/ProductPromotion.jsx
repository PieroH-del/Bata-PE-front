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
              <img src="https://via.placeholder.com/800x600" alt="Zapatillas" className="promotion-image" />
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
              <img src="https://via.placeholder.com/800x600" alt="Sandalias" className="promotion-image" />
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
