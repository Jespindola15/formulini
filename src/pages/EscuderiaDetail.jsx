// src/pages/EscuderiaDetail.jsx
import React, { useEffect, useState } from 'react';
import DisplayCocheEscuderia from '../componentes/DisplayCocheEscuderia';
import EstadisticasEscuderia from '../componentes/EstadisticasEscuderia';
import TarjetaPiloto from '../componentes/TarjetaPiloto';
import { getEscuderiaPorNombre } from '../Servicios/apiEscuderias'; // Importa tu función de servicio
import '../Styles/EscuderiaDetail.css';

// Ahora EscuderiaDetail recibe 'escuderiaId' como una prop
const EscuderiaDetail = ({ escuderiaId }) => {
  const [datosEscuderia, setDatosEscuderia] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatosEscuderia = async () => {
      if (!escuderiaId) { // Si no hay ID, no intentes cargar
        setCargando(false);
        setError(new Error("No se proporcionó ID de escudería."));
        return;
      }
      try {
        // Llama a tu función de servicio con el ID de la URL
        const data = await getEscuderiaPorNombre(escuderiaId);
        setDatosEscuderia(data);
      } catch (err) {
        setError(err);
      } finally {
        setCargando(false);
      }
    };

    fetchDatosEscuderia();
  }, [escuderiaId]); // Vuelve a ejecutar el efecto si el ID de la escudería cambia

  if (cargando) return <div className="mensaje-carga">Cargando datos de la escudería {escuderiaId}...</div>;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (!datosEscuderia) return <div className="mensaje-sin-datos">No hay datos de la escudería disponibles para {escuderiaId}.</div>;

  const {
    nombre,
    urlLogo,
    jefeEquipo,
    jefeTecnico,
    nombreModeloCoche,
    urlImagenCoche,
    chasis,
    unidadPotencia,
    primeraEntradaEquipo,
    mejorResultadoCarrera,
    polePositions,
    vueltasRapidas,
    campeonatosMundiales,
    pilotos
  } = datosEscuderia;

  return (
    <div className="contenedor-pagina-escuderia">
      {/* Sección Superior - Logo, Nombre de Equipo, Jefes */}
      <div className="encabezado-escuderia">
        <img src={urlLogo} alt={`Logo de ${nombre}`} className="logo-escuderia" />
        <h1 className="nombre-escuderia">{nombre}</h1>
        <p className="jefe-equipo">Jefe de Equipo: {jefeEquipo}</p>
        <p className="jefe-tecnico">Jefe Técnico: {jefeTecnico}</p>
      </div>

      {/* Main Car Display */}
      <DisplayCocheEscuderia nombreModeloCoche={nombreModeloCoche} urlImagenCoche={urlImagenCoche} />

      {/* Team Statistics */}
      <EstadisticasEscuderia
        chasis={chasis}
        unidadPotencia={unidadPotencia}
        primeraEntradaEquipo={primeraEntradaEquipo}
        mejorResultadoCarrera={mejorResultadoCarrera}
        polePositions={polePositions}
        fastestLaps={vueltasRapidas}
        worldChampionships={campeonatosMundiales}
      />

      {/* Drivers Section */}
      <div className="seccion-pilotos-escuderia">
        {pilotos.map(piloto => (
          <TarjetaPiloto
            key={piloto.id}
            nombre={piloto.nombre}
            numero={piloto.numero}
            urlImagen={piloto.urlImagen}
            equipo={piloto.equipo}
          />
        ))}
      </div>
    </div>
  );
};

export default EscuderiaDetail;
