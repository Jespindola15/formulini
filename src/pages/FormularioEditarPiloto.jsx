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
          nombre: piloto.Nombre || "",
          pais: piloto.Nacionalidad || "",  // asumiendo que en backend está Nacionalidad
          numero: piloto.Numero?.toString() || "",
          edad: piloto.Edad?.toString() || "",
          escuderiaId: piloto.EscuderiaId?.toString() || "",
          urlImagen: piloto.UrlImagen || ""
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
      nombre: formData.nombre,
      nacionalidad: formData.pais,
      numero: Number(formData.numero),
      edad: Number(formData.edad),
      escuderiaId: Number(formData.escuderiaId),
      urlImagen: formData.urlImagen
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
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Nombre"
          maxLength={50}
        />
        <input
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          required
          placeholder="País"
          maxLength={50}
        />
        <input
          type="number"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          required
          placeholder="Número"
          min={1}
          max={100}
        />
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          required
          placeholder="Edad"
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
          {escuderias.map((e) => (
            <option key={e.id} value={e.id.toString()}>
              {e.nombre}
            </option>
          ))}
        </select>
        <input
          name="urlImagen"
          value={formData.urlImagen}
          onChange={handleChange}
          placeholder="URL de Imagen"
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioEditarPiloto;
