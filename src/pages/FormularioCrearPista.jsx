// src/pages/FormularioCrearPista.jsx
import React, { useEffect, useState } from 'react';
import { crearPista } from '../Servicios/apiPistas';
import { getAllPilotos } from '../Servicios/apiPilotos'; // Asegurate de tener este servicio
import { useLocation } from 'wouter';

const FormularioCrearPista = () => {
  const [, navegar] = useLocation();

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    tipo: '',
    mejorPilotoId: '',
    urlImagen: '',
  });

  const [pilotos, setPilotos] = useState([]);

  // Cargar pilotos al montar el componente
  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        const data = await getAllPilotos();
        setPilotos(data);
      } catch (error) {
        console.error('Error al cargar pilotos:', error);
      }
    };
    fetchPilotos();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pistaParaEnviar = {
      ...formData,
      mejorPilotoId: Number(formData.mejorPilotoId), // Aseguramos que sea número
    };

    try {
      await crearPista(pistaParaEnviar);
      navegar('/pistas');
    } catch (error) {
      console.error('Error al crear pista:', error);
    }
  };

  return (
    <div className="formulario-container">
      <h2>Crear Nueva Pista</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="ubicacion" placeholder="Ubicación" onChange={handleChange} required />
       <select name="tipo" onChange={handleChange} required>
  <option value="">Seleccionar tipo</option>
  <option value="1">Callejero</option>
  <option value="2">Circuito permanente</option>
  <option value="3">Mixto</option>
</select>


        {/* Selector de piloto por nombre */}
        <select name="mejorPilotoId" onChange={handleChange} required>
          <option value="">Seleccionar mejor piloto</option>
          {pilotos.map((piloto) => (
            <option key={piloto.id} value={piloto.id}>
              {piloto.nombre}
            </option>
          ))}
        </select>

        <input name="urlImagen" placeholder="URL de Imagen" onChange={handleChange} />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default FormularioCrearPista;
