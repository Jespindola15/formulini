// src/pages/PistasPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllPistas } from '../Servicios/apiPistas'; // Importa tu servicio de pistas
import { getAllPilotos } from '../Servicios/apiPilotos'; // Importa los pilotos
import '../Styles/PistasPage.css'; // Estilos CSS
import Loader from '../componentes/Loader'; // Loader animado
import { Link } from 'wouter'; // Para navegación entre páginas

const PistasPage = () => {
  const [pistas, setPistas] = useState([]);
  const [pilotos, setPilotos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Carga las pistas y pilotos al montar el componente
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [dataPistas, dataPilotos] = await Promise.all([
          getAllPistas(),     // Llama al servicio que obtiene todas las pistas
          getAllPilotos(),    // Llama al servicio que obtiene todos los pilotos
        ]);
        setPistas(dataPistas);
        setPilotos(dataPilotos);
      } catch (err) {
        setError(err); // Maneja el error
      } finally {
        setCargando(false); // Oculta loader
      }
    };
    fetchDatos();
  }, []);

  // Busca el nombre del piloto según su ID
  const obtenerNombrePiloto = (id) => {
    const piloto = pilotos.find((p) => p.id === id);
    return piloto ? piloto.nombre : 'Desconocido';
  };

  // Loader mientras carga
  if (cargando) return <Loader />;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (pistas.length === 0) return <div className="mensaje-sin-datos">No hay pistas disponibles.</div>;

  return (
    <div className="pistas-page-container">
      <h2>Circuitos de Fórmula 1</h2>
      <div className="grid-pistas">

        {/* Tarjeta especial para crear una nueva pista */}
        <div className="tarjeta-pista tarjeta-crear">
          <div className="contenido-crear">
            <span className="icono-mas">＋</span>
            <p>Agregar nueva pista</p>
            <Link href="/pistas/nueva"><button>Crear</button></Link>
          </div>
        </div>

        {/* Tarjetas para cada pista existente */}
        {pistas.map((pista) => (
          <div key={pista.id} className="tarjeta-pista tarjeta-existente">
            <img src={pista.urlImagen || '/imagenes/default.jpg'} alt={pista.nombre} className="imagen-pista" />
            <h3>{pista.nombre}</h3>
            <p>{pista.ubicacion}</p>
            <p>Tipo: {pista.tipo}</p>
            <p>Mejor Piloto: {obtenerNombrePiloto(pista.mejorPilotoId)}</p>
            <Link href={`/pistas/editar/${pista.id}`}><button>Actualizar</button></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PistasPage;
