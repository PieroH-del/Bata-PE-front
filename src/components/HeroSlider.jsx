import React from 'react';
import './HeroSlider.css';

const HeroSlider = () => {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
      </div>

      <div className="carousel-inner">
        {/* Slide 1 - Power */}
        <div className="carousel-item active">
          <div className="hero-slide hero-slide-1">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                  
                  <h2 className="hero-title" style={{color: 'white'}}>REGALA MOVIMIENTO, REGALA POWER.</h2>
                  <button className="btn btn-hero mt-3">COMPRA AHORA</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Placeholder for other slides */}
        <div className="carousel-item">
          <div className="hero-slide hero-slide-2">
            <div className="container h-100">
              <div className="row h-100 align-items-center">
                <div className="col-12 text-center">
                  <h2 className="hero-title" style={{color: 'white'}}>Nueva Colección</h2>
                  <button className="btn btn-hero mt-3">DESCUBRE MÁS</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default HeroSlider;
