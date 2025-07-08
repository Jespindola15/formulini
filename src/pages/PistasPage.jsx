// src/pages/PistasPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllPistas } from '../Servicios/apiPistas'; // Importa tu servicio de pistas
import '../Styles/PistasPage.css'; // ¡Ruta ajustada!

const PistasPage = () => {
  const [pistas, setPistas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPistas = async () => {
      try {
        const data = await getAllPistas(); // Llama a la función del servicio
        setPistas(data);
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };
    fetchPistas();
  }, []);

  if (cargando) return <div className="mensaje-carga">Cargando pistas...</div>;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (pistas.length === 0) return <div className="mensaje-sin-datos">No hay pistas disponibles.</div>;

  return (
    <div className="pistas-page-container">
      <h2>Circuitos de Fórmula 1</h2>
      <div className="grid-pistas">
        {pistas.map(pista => (
          <div key={pista.id} className="tarjeta-pista">
            <img src={pista.urlImagen} alt={pista.nombre} className="imagen-pista" />
            <h3>{pista.nombre}</h3>
            <p>{pista.ubicacion}</p>
            <p>Longitud: {pista.longitudKm} km</p> {/* Ajusta según tus datos de API */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PistasPage;