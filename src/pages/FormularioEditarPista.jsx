// src/pages/FormularioEditarPista.jsx
import React, { useEffect, useState } from 'react';
import { getPistaById, actualizarPista } from '../Servicios/apiPistas';
import { useParams, useLocation } from 'wouter';

const FormularioEditarPista = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [, navegar] = useLocation(); // Para redirigir
  const [formData, setFormData] = useState(null); // Estado del formulario

  // Carga los datos de la pista al iniciar
  useEffect(() => {
    const fetch = async () => {
      const pista = await getPistaById(id);
      setFormData(pista);
    };
    fetch();
  }, [id]);

  // Maneja cambios en inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Maneja envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarPista(id, formData);
    navegar('/pistas');
  };

  if (!formData) return <p>Cargando...</p>;

  return (
    <div className="formulario-container">
      <h2>Editar Pista</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />
        <input name="ubicacion" value={formData.ubicacion} onChange={handleChange} required />
        <input name="tipo" value={formData.tipo} onChange={handleChange} required />
        <input name="mejorPilotoId" type="number" value={formData.mejorPilotoId} onChange={handleChange} required />
        <input name="urlImagen" value={formData.urlImagen} onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioEditarPista;
