// src/components/TarjetaPiloto.jsx
import React from 'react';
import '../Styles/TarjetaPiloto.css';

// Añadimos apellido, nacionalidad y edad a las props
const TarjetaPiloto = ({ nombre, apellido, numero, urlImagen, equipo, nacionalidad, edad }) => {
  return (
    <div className="tarjeta-piloto">
      <span className="numero-piloto">{numero}</span>
      <img src={urlImagen} alt={`Foto de ${nombre} ${apellido}`} className="imagen-piloto" />
      <h3 className="nombre-piloto">{nombre} {apellido}</h3>
      {/* El equipo no se pasa desde EscuderiaDetail.jsx, por eso lo comento aquí */}
      {/* <p className="equipo-piloto">{equipo}</p> */}
      {/* NUEVO: Mostrar nacionalidad y edad */}
      {nacionalidad && <p className="nacionalidad-piloto">Nacionalidad: {nacionalidad}</p>}
      {edad && <p className="edad-piloto">Edad: {edad} años</p>}
    </div>
  );
};

export default TarjetaPiloto;
