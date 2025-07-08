// src/components/TarjetaPiloto.jsx
import React from 'react';
import '../Styles/TarjetaPiloto.css'; // <-- DESCOMENTADO

const TarjetaPiloto = ({ nombre, numero, urlImagen, equipo }) => {
  console.log("TarjetaPiloto: Renderizando para", nombre);
  return (
    // Eliminamos los estilos en línea temporales
    <div className="tarjeta-piloto"> {/* Usamos la clase CSS */}
      <img src={urlImagen} alt={nombre} className="imagen-piloto" /> {/* Usamos la clase CSS */}
      <span className="numero-piloto">{numero}</span> {/* Usamos la clase CSS */}
      <h3 className="nombre-piloto">{nombre}</h3> {/* Usamos la clase CSS */}
      <p className="equipo-piloto">{equipo}</p> {/* Usamos la clase CSS */}
    </div>
  );
};

export default TarjetaPiloto;