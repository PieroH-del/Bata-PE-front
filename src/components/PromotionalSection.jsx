import React from 'react';
import './PromotionalSection.css';

const PromotionalSection = () => {
  return (
    <section className="promotional-section py-5">
      <div className="container-fluid px-4">
        <div className="row g-0">
          {/* Mujer */}
          <div className="col-md-4">
            <div className="promo-card">
              <img src="https://via.placeholder.com/600x800" alt="Mujer" className="promo-image" />
              <div className="promo-overlay">
                <span className="promo-badge">GRATI DAYS</span>
                <h2 className="promo-title">MUJER HASTA 50%</h2>
                <div className="promo-buttons">
                  <button className="btn btn-promo">ZAPATILLAS</button>
                  <button className="btn btn-promo">SANDALIAS</button>
                </div>
                <button className="btn btn-promo-secondary mt-3">VER TODO</button>
              </div>
            </div>
          </div>

          {/* Hombre */}
          <div className="col-md-4">
            <div className="promo-card">
              <img src="https://via.placeholder.com/600x800" alt="Hombre" className="promo-image" />
              <div className="promo-overlay">
                <span className="promo-badge">GRATI DAYS</span>
                <h2 className="promo-title">HOMBRE HASTA 50%</h2>
                <div className="promo-buttons">
                  <button className="btn btn-promo">ZAPATILLAS</button>
                  <button className="btn btn-promo">CASUAL & VESTIR</button>
                </div>
                <button className="btn btn-promo-secondary mt-3">VER TODO</button>
              </div>
            </div>
          </div>

          {/* Infantil */}
          <div className="col-md-4">
            <div className="promo-card">
              <img src="https://via.placeholder.com/600x800" alt="Infantil" className="promo-image" />
              <div className="promo-overlay">
                <span className="promo-badge">GRATI DAYS</span>
                <h2 className="promo-title">INFANTIL HASTA 50%</h2>
                <div className="promo-buttons">
                  <button className="btn btn-promo">NIÑOS</button>
                  <button className="btn btn-promo">NIÑAS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalSection;
