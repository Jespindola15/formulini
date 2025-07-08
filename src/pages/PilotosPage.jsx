// src/pages/PilotosPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllPilotos } from '../Servicios/apiPilotos'; // Importa tu servicio de pilotos
import TarjetaPiloto from '../componentes/TarjetaPiloto'; // Reutilizamos el componente
import '../Styles/PilotosPage.css'; // ¡Ruta ajustada!

const PilotosPage = () => {
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        const data = await getAllPilotos(); // Llama a la función del servicio
        setPilotos(data);
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };
    fetchPilotos();
  }, []);

  if (cargando) return <div className="mensaje-carga">Cargando pilotos...</div>;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (pilotos.length === 0) return <div className="mensaje-sin-datos">No hay pilotos disponibles.</div>;

  return (
    <div className="pilotos-page-container">
      <h2>Pilotos de Fórmula 1</h2>
      <div className="grid-pilotos">
        {pilotos.map(piloto => (
          <TarjetaPiloto
            key={piloto.id}
            nombre={piloto.nombre}
            numero={piloto.numero}
            urlImagen={piloto.urlImagen}
            equipo={piloto.equipoActual} // Asegúrate que el nombre de la propiedad coincida con tu API
          />
        ))}
      </div>
    </div>
  );
};

export default PilotosPage;