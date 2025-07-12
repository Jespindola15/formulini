// src/componentes/FormularioCrearPiloto.jsx
import React, { useEffect, useState } from 'react';
import { crearPiloto } from '../Servicios/apiPilotos';
import { getAllEscuderias } from '../Servicios/apiEscuderias';
import { useLocation } from 'wouter';
import '../Styles/FormularioPiloto.css'; // Importá el CSS

const FormularioCrearPiloto = () => {
  const [, navegar] = useLocation();

  const [formData, setFormData] = useState({
    nombre: '',
    pais: '',
    numero: '',
    edad: '',
    escuderiaId: '',
    imagenUrl: '',
  });

  const [escuderias, setEscuderias] = useState([]);

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        const data = await getAllEscuderias();
        setEscuderias(data);
      } catch (error) {
        console.error('Error al cargar escuderías:', error);
      }
    };
    fetchEscuderias();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pilotoParaEnviar = {
      Nombre: formData.nombre,
      Pais: formData.pais,
      Numero: Number(formData.numero),
      Edad: Number(formData.edad),
      EscuderiaId: Number(formData.escuderiaId),
      ImagenUrl: formData.imagenUrl,
    };

    try {
      await crearPiloto(pilotoParaEnviar);
      navegar('/pilotos');
    } catch (error) {
      console.error('Error al crear piloto:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crear Nuevo Piloto</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          maxLength={50}
        />
        <input
          name="pais"
          placeholder="País"
          value={formData.pais}
          onChange={handleChange}
          required
          maxLength={50}
        />
        <input
          type="number"
          name="numero"
          placeholder="Número"
          value={formData.numero}
          onChange={handleChange}
          required
          min={1}
          max={100}
        />
        <input
          type="number"
          name="edad"
          placeholder="Edad"
          value={formData.edad}
          onChange={handleChange}
          required
          min={18}
          max={100}
        />
        <select
          name="escuderiaId"
          value={formData.escuderiaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Escudería</option>
          {escuderias.map((escuderia) => (
            <option key={escuderia.id} value={escuderia.id}>
              {escuderia.nombre}
            </option>
          ))}
        </select>
        <input
          name="imagenUrl"
          placeholder="URL de la imagen del piloto"
          value={formData.imagenUrl}
          onChange={handleChange}
          required
          maxLength={150}
        />
        <button type="submit">Crear Piloto</button>
      </form>
    </div>
  );
};

export default FormularioCrearPiloto;
