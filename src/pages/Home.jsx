// src/pages/Home.jsx
import React from 'react';
import '../Styles/HomePage.css'; // Vamos a crear este CSS para Home

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <img src="/imagenes/formulini-logo.png" alt="Fórmula 1 Logo" className="hero-logo" />
        <h1>Bienvenido al Mundo de la Fórmula 1</h1>
        <p>Tu destino para estadísticas, pilotos y escuderías de la F1.</p>
        {/* Aquí podrías añadir un botón para explorar más */}
      </section>

      <section className="featured-section">
        <h2>Lo más destacado</h2>
        <div className="featured-grid">
          <div className="featured-item">
            <h3>Última Carrera</h3>
            <p>Gran Premio de España 2025</p>
            <img src="/imagenes/circuito-monaco.png" alt="Circuito Mónaco" className="featured-image" />
            {/* Usa una imagen de circuito que tengas */}
            <p>Ganador: Max Verstappen</p>
          </div>
          <div className="featured-item">
            <h3>Piloto del Mes</h3>
            <p>Lewis Hamilton</p>
            <img src="/imagenes/lewis-hamilton.png" alt="Lewis Hamilton" className="featured-image" />
            <p>Equipo: Mercedes-AMG Petronas F1 Team</p>
          </div>
          <div className="featured-item">
            <h3>Escudería Destacada</h3>
            <p>Mercedes-AMG Petronas F1 Team</p>
            <img src="/imagenes/mercedes-logo.png" alt="Mercedes Logo" className="featured-image" />
            <p>Dominio y elegancia en la pista.</p>
          </div>
        </div>
      </section>

      {/* Puedes añadir más secciones aquí, como noticias, calendario, etc. */}
    </div>
  );
};

export default Home;