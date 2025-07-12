import React, { useEffect, useState } from 'react';
import { getAllPistas, borrarPista } from '../Servicios/apiPistas'; // Importá borrarPista también
import { getAllPilotos } from '../Servicios/apiPilotos';
import '../Styles/PistasPage.css';
import Loader from '../componentes/Loader';
import { Link } from 'wouter';

const PistasPage = () => {
  const [pistas, setPistas] = useState([]);
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [dataPistas, dataPilotos] = await Promise.all([
        getAllPistas(),
        getAllPilotos(),
      ]);
      setPistas(dataPistas);
      setPilotos(dataPilotos);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  const obtenerNombrePiloto = (id) => {
    const piloto = pilotos.find((p) => p.id === id);
    return piloto ? piloto.nombre : 'Desconocido';
  };

  const handleBorrar = async (id) => {
    if (!window.confirm('¿Estás seguro que quieres borrar esta pista?')) return;
    try {
      await borrarPista(id);
      // Recargamos las pistas después de borrar
      cargarDatos();
    } catch (err) {
      alert('Error al borrar la pista.');
      console.error(err);
    }
  };

  if (cargando) return <Loader />;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (pistas.length === 0) return <div className="mensaje-sin-datos">No hay pistas disponibles.</div>;

  return (
    <div className="pistas-page-container">
      <h2>Circuitos de Fórmula 1</h2>
      <div className="grid-pistas">
        <div className="tarjeta-pista tarjeta-crear">
          <div className="contenido-crear">
            <span className="icono-mas">＋</span>
            <p>Agregar nueva pista</p>
            <Link href="/pistas/nueva"><button>Crear</button></Link>
          </div>
        </div>

        {pistas.map((pista) => (
          <div key={pista.id} className="tarjeta-pista tarjeta-existente">
            <img src={pista.urlImagen || '/imagenes/default.jpg'} alt={pista.nombre} className="imagen-pista" />
            <h3>{pista.nombre}</h3>
            <p>{pista.ubicacion}</p>
            <p>Tipo: {pista.tipo}</p>
            <p>Mejor Piloto: {obtenerNombrePiloto(pista.mejorPilotoId)}</p>

            <Link href={`/pistas/editar/${pista.id}`}>
              <button>Actualizar</button>
            </Link>

            <button
              onClick={() => handleBorrar(pista.id)}
              style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
            >
              Borrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PistasPage;
