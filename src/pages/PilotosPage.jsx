import React, { useEffect, useState } from 'react';
import { getAllPilotos, borrarPiloto } from '../Servicios/apiPilotos';
import { getAllEscuderias } from '../Servicios/apiEscuderias'; // Importá esto
import TarjetaPiloto from '../componentes/TarjetaPiloto';
import Loader from '../componentes/Loader';
import { useLocation, Link } from 'wouter';

import '../Styles/PilotosPage.css';

const PilotosPage = () => {
  const [pilotos, setPilotos] = useState([]);
  const [escuderias, setEscuderias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [, navegar] = useLocation();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [dataPilotos, dataEscuderias] = await Promise.all([
          getAllPilotos(),
          getAllEscuderias(),
        ]);
        setPilotos(dataPilotos);
        setEscuderias(dataEscuderias);
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  // Crear un diccionario para buscar el nombre de escudería por id
  const escuderiasMap = escuderias.reduce((map, escuderia) => {
    map[escuderia.id] = escuderia.nombre;
    return map;
  }, {});

  const handleBorrar = async (id) => {
    console.log(`Intentando borrar piloto con ID: ${id}.`);
    try {
      await borrarPiloto(id);
      setPilotos(pilotos.filter(p => p.id !== id));
    } catch (err) {
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
        <div className="tarjeta-piloto tarjeta-crear">
          <div className="contenido-crear">
            <span className="icono-mas">＋</span>
            <p>Agregar nuevo piloto</p>
            <Link href="/pilotos/nuevo">
              <button>Crear</button>
            </Link>
          </div>
        </div>

        {pilotos.map((piloto) => (
          <div key={piloto.id} className="piloto-card-container">
            <TarjetaPiloto
              nombre={piloto.nombre}
              apellido={piloto.apellido || ''}
              numero={piloto.numero}
              urlImagen={piloto.imagenUrl}
              nacionalidad={piloto.pais || ''}
              edad={piloto.edad || ''}
              escuderiaNombre={escuderiasMap[piloto.escuderiaId] || ''}
            />
            <div>
  <button
    className="boton-base boton-secundario"
    onClick={() => navegar(`/pilotos/editar/${piloto.id}`)}
  >
    Editar
  </button>

  <button
    className="boton-base boton-eliminar boton-separado"
    onClick={() => handleBorrar(piloto.id)}
  >
    Borrar
  </button>
            </div>
          </div>
   
        ))}
      </div>
    </div>
  );
};

export default PilotosPage;
