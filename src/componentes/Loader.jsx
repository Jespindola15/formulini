// src/componentes/Loader.jsx
import React from 'react';
import '../Styles/Loader.css'; // Asegurate de que este archivo exista en esa ruta

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="traffic-light">
          <div className="light-row">
            <div className="light red-light" />
          </div>
          <div className="light-row">
            <div className="light yellow-light" />
          </div>
          <div className="light-row">
            <div className="light green-light" />
          </div>
        </div>
        <div className="loading-status" />
      </div>
    </div>
  );
};

export default Loader;
