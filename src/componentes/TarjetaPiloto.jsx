// src/components/TarjetaPiloto.jsx
import React from 'react';
import '../Styles/TarjetaPiloto.css';

// Añadimos apellido, nacionalidad, edad y escuderiaNombre a las props
const TarjetaPiloto = ({ nombre, apellido, numero, urlImagen, equipo, nacionalidad, edad, escuderiaNombre }) => {
  return (
    <div className="tarjeta-piloto">
      <span className="numero-piloto">{numero}</span>
      <img src={urlImagen} alt={`Foto de ${nombre} ${apellido}`} className="imagen-piloto" />
      <h3 className="nombre-piloto">{nombre} {apellido}</h3>
      {/* <p className="equipo-piloto">{equipo}</p> */}
      {nacionalidad && <p className="nacionalidad-piloto">Nacionalidad: {nacionalidad}</p>}
      {edad && <p className="edad-piloto">Edad: {edad} años</p>}
      {escuderiaNombre && <p className="escuderia-piloto">Escudería: {escuderiaNombre}</p>}
    </div>
  );
};

export default TarjetaPiloto;
