// src/pages/FormularioCrearPista.jsx
import React, { useEffect, useState } from 'react';
import { crearPista } from '../Servicios/apiPistas';
import { getAllPilotos } from '../Servicios/apiPilotos';
import { useLocation } from 'wouter';
import '../Styles/FormularioPiloto.css'; // Reutilizamos los mismos estilos

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
      Nombre: formData.nombre,
      Ubicacion: formData.ubicacion,
      Tipo: formData.tipo,
      MejorPilotoId: Number(formData.mejorPilotoId),
      UrlImagen: formData.urlImagen,
    };

    try {
      await crearPista(pistaParaEnviar);
      navegar('/pistas');
    } catch (error) {
      console.error('Error al crear pista:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear Nueva Pista</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="ubicacion"
          placeholder="Ubicación"
          value={formData.ubicacion}
          onChange={handleChange}
          required
        />
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar tipo</option>
          <option value="Callejero">Callejero</option>
          <option value="Circuito permanente">Circuito permanente</option>
          <option value="Mixto">Mixto</option>
        </select>

        <select
          name="mejorPilotoId"
          value={formData.mejorPilotoId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar mejor piloto</option>
          {pilotos.map((piloto) => (
            <option key={piloto.id} value={piloto.id}>
              {piloto.nombre}
            </option>
          ))}
        </select>

        <input
          name="urlImagen"
          placeholder="URL de Imagen"
          value={formData.urlImagen}
          onChange={handleChange}
        />
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default FormularioCrearPista;
