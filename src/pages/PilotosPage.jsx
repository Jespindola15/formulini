import React, { useEffect, useState } from 'react';
import { getAllPilotos, borrarPiloto } from '../Servicios/apiPilotos';
import TarjetaPiloto from '../componentes/TarjetaPiloto'; // Asegúrate de que la ruta sea correcta
import '../Styles/PilotosPage.css';
import Loader from '../componentes/Loader';
import { useLocation, Link } from 'wouter'; // importá Link para el botón Crear

const PilotosPage = () => {
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [, navegar] = useLocation();

  useEffect(() => {
    cargarPilotos();
  }, []);

  const cargarPilotos = async () => {
    try {
      const data = await getAllPilotos();
      setPilotos(data);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  const handleBorrar = async (id) => {
    // Reemplazado window.confirm por console.log para depuración
    console.log(`Intentando borrar piloto con ID: ${id}. (Confirmación simulada)`);
    try {
      await borrarPiloto(id);
      console.log(`Piloto con ID ${id} borrado exitosamente.`);
      cargarPilotos(); // Recargar la lista de pilotos
    } catch (err) {
      // Reemplazado alert por console.error
      console.error('Error al borrar piloto:', err);
    }
  };

  if (cargando) return <Loader />;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (pilotos.length === 0) return <div className="mensaje-sin-datos">No hay pilotos disponibles.</div>;

  return (
    <div className="pilotos-page-container">
      <h2 className="page-title">F1 DRIVERS 2025</h2>
      <p className="page-subtitle">Meet the current Formula 1 drivers for the 2025 season</p>
      <div className="grid-pilotos">
        {/* Tarjeta para crear nuevo piloto */}
        <div className="tarjeta-piloto tarjeta-crear">
          <div className="contenido-crear">
            <span className="icono-mas">＋</span>
            <p>Agregar nuevo piloto</p>
            <Link href="/pilotos/nuevo">
              <button>Crear</button>
            </Link>
          </div>
        </div>

        {/* Listado de pilotos */}
        {pilotos.map((piloto) => (
          <div key={piloto.id} className="piloto-card-container">
            <TarjetaPiloto
              nombre={piloto.nombre}
              apellido={piloto.apellido || ''} // Asegúrate de que la API devuelva apellido o maneja como vacío
              numero={piloto.numero}
              urlImagen={piloto.imagenUrl} // ¡CORREGIDO AQUÍ! Usa piloto.imagenUrl
              // equipo={piloto.equipo} // Si tu API no devuelve 'equipo', coméntalo o maneja un fallback
              nacionalidad={piloto.pais || ''} // Tu API usa 'pais' para nacionalidad
              edad={piloto.edad || ''}
            />
            <button onClick={() => navegar(`/pilotos/editar/${piloto.id}`)}>Editar</button>
            <button
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              onClick={() => handleBorrar(piloto.id)}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PilotosPage;
