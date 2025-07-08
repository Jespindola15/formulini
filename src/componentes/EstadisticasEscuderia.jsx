// src/components/EstadisticasEscuderia.jsx
import React from 'react';
import '../Styles/EstadisticasEscuderia.css'; // ¡Ruta ajustada!

const EstadisticasEscuderia = ({
  chasis,
  unidadPotencia,
  primeraEntradaEquipo,
  mejorResultadoCarrera,
  polePositions,
  vueltasRapidas,
  campeonatosMundiales,
}) => {
  return (
    <div className="grid-estadisticas-escuderia">
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Chasis</span>
        <span className="valor-estadistica">{chasis}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Unidad de Potencia</span>
        <span className="valor-estadistica">{unidadPotencia}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Primera Entrada al Equipo</span>
        <span className="valor-estadistica">{primeraEntradaEquipo}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Mejor Resultado en Carrera</span>
        <span className="valor-estadistica">{mejorResultadoCarrera}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Pole Positions</span>
        <span className="valor-estadistica">{polePositions}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Vueltas Rápidas</span>
        <span className="valor-estadistica">{vueltasRapidas}</span>
      </div>
      <div className="item-estadistica">
        <span className="etiqueta-estadistica">Campeonatos Mundiales</span>
        <span className="valor-estadistica">{campeonatosMundiales}</span>
      </div>
    </div>
  );
};

export default EstadisticasEscuderia;