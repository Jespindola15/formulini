import React, { useEffect, useState } from 'react';
import { getAllPilotos, borrarPiloto } from '../Servicios/apiPilotos';
import TarjetaPiloto from '../componentes/TarjetaPiloto';
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
    if (!window.confirm('¿Estás seguro que querés borrar este piloto?')) return;
    try {
      await borrarPiloto(id);
      cargarPilotos();
    } catch (err) {
      alert('Error al borrar piloto');
      console.error(err);
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
              apellido={piloto.apellido}
              numero={piloto.numero}
              urlImagen={piloto.urlImagen}
              equipo={piloto.equipo}
              pais={piloto.pais}
              edad={piloto.edad}
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
