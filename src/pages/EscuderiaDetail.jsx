// src/pages/EscuderiaDetail.jsx
import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import TarjetaPiloto from '../componentes/TarjetaPiloto'; // Importado para mostrar pilotos
import DisplayCocheEscuderia from '../componentes/DisplayCocheEscuderia'; // Importado para mostrar el coche
import { getEscuderiaById } from '../Servicios/apiEscuderias';
import { getAllPilotos } from '../Servicios/apiPilotos';
import '../Styles/EscuderiaDetail.css';

const EscuderiaDetail = () => {
  const [datosEscuderia, setDatosEscuderia] = useState(null);
  const [pilotosApi, setPilotosApi] = useState([]);
  const [cargandoEscuderia, setCargandoEscuderia] = useState(true);
  const [cargandoPilotos, setCargandoPilotos] = useState(true);
  const [errorEscuderia, setErrorEscuderia] = useState(null);
  const [errorPilotos, setErrorPilotos] = useState(null);

  // Datos mock para backgroundUrl, coche y AHORA colorPrincipal
  const mockDetails = {
    1: { // Alpine
      backgroundUrl: '/imagenes/backgrounds/alpine-bg.jpg',
      nombreModeloCoche: 'Alpine A525',
      urlImagenCoche: '/imagenes/alpine-auto-removebg-preview.png',
      colorPrincipal: '#0090FF', // Alpine Blue
    },
    2: { // McLaren
      backgroundUrl: '/imagenes/backgrounds/mclaren-bg.jpg',
      nombreModeloCoche: 'McLaren MCL39',
      urlImagenCoche: '/imagenes/mclaren-auto-removebg-preview.png',
      colorPrincipal: '#FF8000', // McLaren Orange
    },
    3: { // Ferrari
      backgroundUrl: '/imagenes/backgrounds/ferrari-bg.jpg',
      nombreModeloCoche: 'Ferrari SF-24',
      urlImagenCoche: '/imagenes/ferrari-auto-removebg-preview.png',
      colorPrincipal: '#DC0000', // Ferrari Red
    },
    4: { // Red Bull
      backgroundUrl: '/imagenes/backgrounds/redbull-bg.jpg',
      nombreModeloCoche: 'Red Bull RB21',
      urlImagenCoche: '/imagenes/redbull-auto-removebg-preview.png',
      colorPrincipal: '#3671C6', // Red Bull Blue
    },
    5: { // Mercedes
      backgroundUrl: '/imagenes/backgrounds/mercedes-bg.jpg',
      nombreModeloCoche: 'Mercedes-AMG F1 W16',
      urlImagenCoche: '/imagenes/mercedes-auto-removebg-preview.png',
      colorPrincipal: '#00D2BE', // Mercedes Cyan
    },
    6: { // Aston Martin
      backgroundUrl: '/imagenes/backgrounds/astonmartin-bg.jpg',
      nombreModeloCoche: 'Aston Martin AMR25',
      urlImagenCoche: '/imagenes/astonmartin-auto-removebg-preview.png',
      colorPrincipal: '#006F62', // Aston Martin Green
    },
    7: { // Haas
      backgroundUrl: '/imagenes/backgrounds/haas-bg.jpg',
      nombreModeloCoche: 'Haas VF-25',
      urlImagenCoche: '/imagenes/hass-auto-removebg-preview.png',
      colorPrincipal: '#B6B6B6', // Haas Gray
    },
    8: { // Racing Bulls
      backgroundUrl: '/imagenes/backgrounds/racingbulls-bg.jpg',
      nombreModeloCoche: 'RB VCARB 02',
      urlImagenCoche: '/imagenes/rbracing-auto-removebg-preview.png',
      colorPrincipal: '#6692FF', // Racing Bulls Blue
    },
    9: { // Williams
      backgroundUrl: '/imagenes/backgrounds/williams-bg.jpg',
      nombreModeloCoche: 'Williams FW47',
      urlImagenCoche: '/imagenes/wiliams-auto-removebg-preview.png',
      colorPrincipal: '#005A9C', // Williams Blue
    },
    10: { // Kick Sauber
      backgroundUrl: '/imagenes/backgrounds/kicksauber-bg.jpg',
      nombreModeloCoche: 'Sauber C45',
      urlImagenCoche: '/imagenes/kick-auto-removebg-preview.png',
      colorPrincipal: '#5b9e00', // Kick Sauber Green
    },
  };

  // Obtener el ID de la escudería de la URL
  const [match, params] = useRoute("/escuderias/:id");
  const escuderiaId = params ? parseInt(params.id) : null; // Convertir a número

  // Efecto para cargar los datos de la escudería
  useEffect(() => {
    const fetchEscuderiaData = async () => {
      if (!escuderiaId) {
        setCargandoEscuderia(false);
        setErrorEscuderia(new Error("No se proporcionó ID de escudería en la URL."));
        return;
      }
      try {
        const apiData = await getEscuderiaById(escuderiaId);
        // Fusionar datos de la API con los detalles mock (fondo, coche y color)
        const mergedData = {
          ...apiData,
          backgroundUrl: mockDetails[escuderiaId]?.backgroundUrl || '',
          nombreModeloCoche: mockDetails[escuderiaId]?.nombreModeloCoche || 'Coche del Equipo',
          urlImagenCoche: mockDetails[escuderiaId]?.urlImagenCoche || 'https://placehold.co/250x80/cccccc/000000?text=CAR',
          colorPrincipal: mockDetails[escuderiaId]?.colorPrincipal || '#FFFFFF', // Fallback a blanco
          nombre: apiData.nombre,
          imagenUrl: apiData.imagenUrl,
        };
        setDatosEscuderia(mergedData);
      } catch (err) {
        setErrorEscuderia(err);
      } finally {
        setCargandoEscuderia(false);
      }
    };

    fetchEscuderiaData();
  }, [escuderiaId]);

  // Efecto para cargar los datos de los pilotos
  useEffect(() => {
    const fetchPilotosData = async () => {
      setCargandoPilotos(true);
      try {
        const allPilotos = await getAllPilotos();
        const pilotosFiltrados = allPilotos.filter(piloto => piloto.escuderiaId === escuderiaId);
        setPilotosApi(pilotosFiltrados);
      } catch (err) {
        setErrorPilotos(err);
      } finally {
        setCargandoPilotos(false);
      }
    };

    if (escuderiaId) {
      fetchPilotosData();
    }
  }, [escuderiaId]);

  if (cargandoEscuderia || cargandoPilotos) return <div className="mensaje-carga">Cargando datos...</div>;
  if (errorEscuderia) return <div className="mensaje-error">Error al cargar la escudería: {errorEscuderia.message}</div>;
  if (errorPilotos) return <div className="mensaje-error">Error al cargar los pilotos: {errorPilotos.message}</div>;
  if (!datosEscuderia) return <div className="mensaje-sin-datos">No hay datos de la escudería disponibles para {escuderiaId}.</div>;

  const {
    nombre,
    imagenUrl,
    pais,
    anoFundacion,
    backgroundUrl,
    nombreModeloCoche,
    urlImagenCoche,
    colorPrincipal, // Desestructuramos el color principal
    jefeEquipo,
    jefeTecnico,
  } = datosEscuderia;

  return (
    <div
      className="contenedor-pagina-escuderia"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        '--team-main-color': colorPrincipal // Pasamos el color principal como variable CSS
      }}
    >
      {/* Sección Superior - Logo, Nombre de Equipo, País y Año de Fundación */}
      <div className="encabezado-escuderia">
        <img src={imagenUrl} alt={`Logo de ${nombre}`} className="logo-escuderia" />
        <h1 className="nombre-escuderia">{nombre}</h1>
        <p className="detalle-escuderia">País: {pais}</p>
        <p className="detalle-escuderia">Año de Fundación: {anoFundacion}</p>
        {jefeEquipo && <p className="detalle-escuderia">Jefe de Equipo: {jefeEquipo}</p>}
        {jefeTecnico && <p className="detalle-escuderia">Jefe Técnico: {jefeTecnico}</p>}
      </div>

      {/* Main Car Display */}
      <DisplayCocheEscuderia nombreModeloCoche={nombreModeloCoche} urlImagenCoche={urlImagenCoche} />

      {/* Drivers Section - Usa los pilotos de la API */}
      <div className="seccion-pilotos-escuderia">
        {pilotosApi && pilotosApi.length > 0 ? (
          pilotosApi.map(piloto => (
            <TarjetaPiloto
              key={piloto.id}
              nombre={piloto.nombre}
              apellido={piloto.apellido || ''}
              numero={piloto.numero}
              urlImagen={piloto.imagenUrl}
              nacionalidad={piloto.pais || ''}
              edad={piloto.edad || ''}
            />
          ))
        ) : (
          <p className="mensaje-sin-datos">No hay pilotos disponibles para esta escudería (desde la API).</p>
        )}
      </div>
    </div>
  );
};

export default EscuderiaDetail;
