import React, { useEffect, useState } from "react";
import { getPilotoById, actualizarPiloto } from "../Servicios/apiPilotos";
import { getAllEscuderias } from "../Servicios/apiEscuderias";
import { useLocation } from "wouter";

const FormularioEditarPiloto = ({ id }) => {
  const [, navegar] = useLocation();
  const [formData, setFormData] = useState(null);
  const [escuderias, setEscuderias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        const dataEscuderias = await getAllEscuderias();
        setEscuderias(dataEscuderias);
      } catch {
        setError("Error al cargar escuderías");
      }
    };

    const fetchPiloto = async () => {
      try {
        const piloto = await getPilotoById(id);
        setFormData({
          Nombre: piloto.Nombre || "",
          Pais: piloto.Pais || "",
          Numero: piloto.Numero?.toString() || "",
          Edad: piloto.Edad?.toString() || "",
          EscuderiaId: piloto.EscuderiaId?.toString() || "",
          ImagenUrl: piloto.ImagenUrl || ""
        });
      } catch {
        setError("Error al cargar datos del piloto");
      }
    };

    fetchEscuderias();
    if (id) fetchPiloto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pilotoParaEnviar = {
      Nombre: formData.Nombre,
      Pais: formData.Pais,
      Numero: Number(formData.Numero),
      Edad: Number(formData.Edad),
      EscuderiaId: Number(formData.EscuderiaId),
      ImagenUrl: formData.ImagenUrl
    };

    try {
      await actualizarPiloto(id, pilotoParaEnviar);
      navegar("/pilotos");
    } catch (err) {
      setError("Error al guardar el piloto");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!formData) return <p>Cargando...</p>;

  return (
    <div className="formulario-container">
      <h2>Editar Piloto</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
          required
          placeholder="Nombre"
          maxLength={50}
        />
        <input
          name="Pais"
          value={formData.Pais}
          onChange={handleChange}
          required
          placeholder="País"
          maxLength={50}
        />
        <input
          type="number"
          name="Numero"
          value={formData.Numero}
          onChange={handleChange}
          required
          placeholder="Número"
          min={1}
          max={100}
        />
        <input
          type="number"
          name="Edad"
          value={formData.Edad}
          onChange={handleChange}
          required
          placeholder="Edad"
          min={18}
          max={100}
        />
        <select
          name="EscuderiaId"
          value={formData.EscuderiaId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Escudería</option>
          {escuderias.map((e) => (
            <option key={e.id} value={e.id.toString()}>
              {e.nombre}
            </option>
          ))}
        </select>
        <input
          name="ImagenUrl"
          value={formData.ImagenUrl}
          onChange={handleChange}
          placeholder="URL de Imagen"
          maxLength={150}
          required
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioEditarPiloto;
