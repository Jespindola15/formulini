// src/components/DisplayCocheEscuderia.jsx
import React from 'react';
import '../Styles/DisplayCocheEscuderia.css'; // ¡Ruta ajustada!

const DisplayCocheEscuderia = ({ nombreModeloCoche, urlImagenCoche }) => {
  return (
    <div className="display-coche-escuderia">
      <img src={urlImagenCoche} alt={nombreModeloCoche} className="imagen-coche" />
      {/* Puedes agregar el nombre del modelo aquí si quieres */}
    </div>
  );
};

export default DisplayCocheEscuderia;