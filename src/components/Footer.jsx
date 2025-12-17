import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Bata Club Section */}
      <div className="bata-club-section">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="club-title">BATA CLUB</h2>
              <h3 className="club-subtitle">TE SORPRENDERÁ</h3>
              <p className="club-description mt-4">
                ¡Te esperan muchos beneficios y sorpresas!<br />
                Regístrate, acumula puntos y úsalos en todas tus compras.
              </p>
              <button className="btn btn-club mt-3">Descubre más</button>
            </div>
            <div className="col-md-6 text-center">
              <img src="https://via.placeholder.com/300x200" alt="Bata Club" className="club-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <h5 className="footer-heading">CORPORATIVO</h5>
              <ul className="footer-list">
                <li><a href="#">¿Quiénes Somos?</a></li>
                <li><a href="#">The Bata Company</a></li>
                <li><a href="#">Bata en el Mundo</a></li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <h5 className="footer-heading">TÉRMINOS Y CONDICIONES</h5>
              <ul className="footer-list">
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Términos y Condiciones Bata Club</a></li>
                <li><a href="#">Términos y Condiciones beneficio cuotas sin intereses</a></li>
                <li><a href="#">Cambios y Devoluciones</a></li>
                <li><a href="#">Políticas de recojo en tiendas</a></li>
                <li><a href="#">Legal de promociones tiendas Físicas</a></li>
                <li><a href="#">Legales de promociones online</a></li>
                <li><a href="#">Legales de promociones tiendas especializadas</a></li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <h5 className="footer-heading">SERVICIO AL CLIENTE</h5>
              <ul className="footer-list">
                <li><a href="#">Contáctanos</a></li>
                <li><a href="#">Localiza tu pedido</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
              </ul>
            </div>

            <div className="col-md-3 col-sm-6 mb-4">
              <h5 className="footer-heading">LEGAL</h5>
              <ul className="footer-list">
                <li><a href="#">Comunicado pedidos con Modalidad Retiro en Tienda</a></li>
                <li><a href="#">Política de Privacidad y Seguridad</a></li>
                <li><a href="#">Comunicado Libro de Reclamaciones</a></li>
                <li><a href="#">Atención a tus derechos ARCO</a></li>
                <li><a href="#">Comprobantes Electrónicos</a></li>
                <li><a href="#">Comprobantes electrónicos - Región Loreto</a></li>
                <li><a href="#">Comunicado Tienda Falsa</a></li>
                <li><a href="#">Libro de reclamaciones</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3">
                <i className="fas fa-map-marker-alt"></i>
                <span>TIENDAS</span>
                <i className="fas fa-globe ms-3"></i>
                <span>PERU | ESPAÑOL</span>
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
              <p className="copyright mb-0">© 2025 BATA BRAND</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
