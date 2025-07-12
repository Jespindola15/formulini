// src/pages/EscuderiaDetail.jsx
import React, { useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import TarjetaPiloto from '../componentes/TarjetaPiloto'; // Importado para mostrar pilotos
import DisplayCocheEscuderia from '../componentes/DisplayCocheEscuderia'; // Importado para mostrar el coche
import { getEscuderiaById } from '../Servicios/apiEscuderias';
import { getAllPilotos } from '../Servicios/apiPilotos'; // ¡NUEVO! Importa el servicio de pilotos
import '../Styles/EscuderiaDetail.css';

const EscuderiaDetail = () => {
  const [datosEscuderia, setDatosEscuderia] = useState(null);
  const [pilotosApi, setPilotosApi] = useState([]); // Nuevo estado para los pilotos de la API
  const [cargandoEscuderia, setCargandoEscuderia] = useState(true);
  const [cargandoPilotos, setCargandoPilotos] = useState(true);
  const [errorEscuderia, setErrorEscuderia] = useState(null);
  const [errorPilotos, setErrorPilotos] = useState(null);

  // Datos mock para backgroundUrl y coche (ya que la API principal no los trae)
  const mockDetails = {
    1: { // Alpine
      backgroundUrl: '/imagenes/backgrounds/alpine-bg.jpg',
      nombreModeloCoche: 'Alpine A525',
      urlImagenCoche: '/imagenes/alpine-auto-removebg-preview.png',
    },
    2: { // McLaren
      backgroundUrl: '/imagenes/backgrounds/mclaren-bg.jpg',
      nombreModeloCoche: 'McLaren MCL39',
      urlImagenCoche: '/imagenes/mclaren-auto-removebg-preview.png',
    },
    3: { // Ferrari
      backgroundUrl: '/imagenes/backgrounds/ferrari-bg.jpg',
      nombreModeloCoche: 'Ferrari SF-24',
      urlImagenCoche: '/imagenes/ferrari-auto-removebg-preview.png',
    },
    4: { // Red Bull
      backgroundUrl: '/imagenes/backgrounds/redbull-bg.jpg',
      nombreModeloCoche: 'Red Bull RB21',
      urlImagenCoche: '/imagenes/redbull-auto-removebg-preview.png',
    },
    5: { // Mercedes
      backgroundUrl: '/imagenes/backgrounds/mercedes-bg.jpg',
      nombreModeloCoche: 'Mercedes-AMG F1 W16',
      urlImagenCoche: '/imagenes/mercedes-auto-removebg-preview.png',
    },
    6: { // Aston Martin
      backgroundUrl: '/imagenes/backgrounds/astonmartin-bg.jpg',
      nombreModeloCoche: 'Aston Martin AMR25',
      urlImagenCoche: '/imagenes/astonmartin-auto-removebg-preview.png',
    },
    7: { // Haas
      backgroundUrl: '/imagenes/backgrounds/haas-bg.jpg',
      nombreModeloCoche: 'Haas VF-25',
      urlImagenCoche: '/imagenes/hass-auto-removebg-preview.png',
    },
    8: { // Racing Bulls
      backgroundUrl: '/imagenes/backgrounds/racingbulls-bg.jpg',
      nombreModeloCoche: 'RB VCARB 02',
      urlImagenCoche: '/imagenes/rbracing-auto-removebg-preview.png',
    },
    9: { // Williams
      backgroundUrl: '/imagenes/backgrounds/williams-bg.jpg',
      nombreModeloCoche: 'Williams FW47',
      urlImagenCoche: '/imagenes/wiliams-auto-removebg-preview.png',
    },
    10: { // Kick Sauber
      backgroundUrl: '/imagenes/backgrounds/kicksauber-bg.jpg',
      nombreModeloCoche: 'Sauber C45',
      urlImagenCoche: '/imagenes/kick-auto-removebg-preview.png',
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
        // Fusionar datos de la API con los detalles mock (fondo y coche)
        const mergedData = {
          ...apiData,
          backgroundUrl: mockDetails[escuderiaId]?.backgroundUrl || '',
          nombreModeloCoche: mockDetails[escuderiaId]?.nombreModeloCoche || 'Coche del Equipo',
          urlImagenCoche: mockDetails[escuderiaId]?.urlImagenCoche || 'https://placehold.co/250x80/cccccc/000000?text=CAR',
          nombre: apiData.nombre, // Asegurarse de que el nombre de la API prevalezca
          imagenUrl: apiData.imagenUrl, // Asegurarse de que el logo de la API prevalezca
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
        console.log('Intentando cargar pilotos para escudería ID:', escuderiaId);
        const allPilotos = await getAllPilotos();
        console.log('Todos los pilotos de la API:', allPilotos);

        // Filtra los pilotos por el ID de la escudería actual
        const pilotosFiltrados = allPilotos.filter(piloto => {
          console.log(`Comparando piloto ${piloto.nombre} (escuderiaId: ${piloto.escuderiaId}) con escuderiaId actual: ${escuderiaId}`);
          return piloto.escuderiaId === escuderiaId;
        });
        console.log('Pilotos filtrados para esta escudería:', pilotosFiltrados);
        setPilotosApi(pilotosFiltrados);
      } catch (err) {
        console.error('Error al cargar o filtrar pilotos:', err); // Error más específico
        setErrorPilotos(err);
      } finally {
        setCargandoPilotos(false);
      }
    };

    if (escuderiaId) { // Solo carga pilotos si tenemos un ID de escudería válido
      fetchPilotosData();
    }
  }, [escuderiaId]); // Vuelve a cargar pilotos si el ID de la escudería cambia

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
  } = datosEscuderia;

  return (
    <div
      className="contenedor-pagina-escuderia"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Sección Superior - Logo, Nombre de Equipo, País y Año de Fundación */}
      <div className="encabezado-escuderia">
        <img src={imagenUrl} alt={`Logo de ${nombre}`} className="logo-escuderia" />
        <h1 className="nombre-escuderia">{nombre}</h1>
        <p className="detalle-escuderia">País: {pais}</p>
        <p className="detalle-escuderia">Año de Fundación: {anoFundacion}</p>
      </div>

      {/* Main Car Display */}
      <DisplayCocheEscuderia nombreModeloCoche={nombreModeloCoche} urlImagenCoche={urlImagenCoche} />

      {/* Drivers Section - Ahora usa los pilotos de la API */}
      <div className="seccion-pilotos-escuderia">
        {pilotosApi && pilotosApi.length > 0 ? (
          pilotosApi.map(piloto => (
            <TarjetaPiloto
              key={piloto.id}
              nombre={piloto.nombre}
              apellido={piloto.apellido || ''} // Asegúrate de que la API devuelva apellido o maneja como vacío
              numero={piloto.numero}
              urlImagen={piloto.urlImagen || `/imagenes/pilotos/${piloto.id}.png`} // Fallback si la API no tiene urlImagen
              nacionalidad={piloto.pais || ''} // Pasa la nacionalidad desde la API (tu API usa 'pais')
              edad={piloto.edad || ''} // Pasa la edad desde la API
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
