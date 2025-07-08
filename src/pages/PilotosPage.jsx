// src/pages/PilotosPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import TarjetaPiloto from '../componentes/TarjetaPiloto';
import { getAllPilotos } from '../Servicios/apiPilotos'; // Importa la función del servicio
import '../Styles/PilotosPage.css'; // Estilos para esta página

const PilotosPage = () => {
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        const data = await getAllPilotos();
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
      <h2 className="page-title">F1 DRIVERS 2025</h2>
      <p className="page-subtitle">Meet the current Formula 1 drivers for the 2025 season</p>
      <div className="grid-pilotos">
        {pilotos.map(piloto => (
          <Link key={piloto.id} to={`/pilotos/${piloto.id}`}> {/* Enlace a la página de detalle del piloto */}
            {/* El componente TarjetaPiloto ahora recibe todas las props necesarias */}
            <TarjetaPiloto
              nombre={piloto.nombre}
              apellido={piloto.apellido}
              numero={piloto.numero}
              urlImagen={piloto.urlImagen}
              equipo={piloto.equipo}
              nacionalidad={piloto.nacionalidad}
              edad={piloto.edad}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PilotosPage;
