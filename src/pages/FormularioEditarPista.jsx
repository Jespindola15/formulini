// src/pages/FormularioEditarPista.jsx
import React, { useEffect, useState } from "react";
import { getPistaById, actualizarPista } from "../Servicios/apiPistas";
import { getAllPilotos } from "../Servicios/apiPilotos";
import { useLocation } from "wouter";
import "../Styles/FormularioPiloto.css"; // mismo estilo

const TIPOS = [
  { id: 1, nombre: "Callejero" },
  { id: 2, nombre: "Circuito Permanente" },
  { id: 3, nombre: "Mixto" }
];

const FormularioEditarPista = ({ id }) => {
  const [, navegar] = useLocation();
  const [formData, setFormData] = useState(null);
  const [pilotos, setPilotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        const dataPilotos = await getAllPilotos();
        setPilotos(dataPilotos);
      } catch {
        setError("Error al cargar pilotos");
      }
    };

    const fetchPista = async () => {
      try {
        const pista = await getPistaById(id);
        setFormData({
          nombre: pista.Nombre || "",
          ubicacion: pista.Ubicacion || "",
          tipo: pista.Tipo?.toString() || "",
          mejorPilotoId: pista.MejorPilotoId?.toString() || "",
          urlImagen: pista.UrlImagen || ""
        });
      } catch {
        setError("Error al cargar datos de la pista");
      }
    };

    fetchPilotos();
    if (id) fetchPista();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tipoSeleccionado = TIPOS.find(t => t.id.toString() === formData.tipo)?.nombre || "";

    const pistaParaEnviar = {
      nombre: formData.nombre,
      ubicacion: formData.ubicacion,
      tipo: tipoSeleccionado,
      mejorPilotoId: Number(formData.mejorPilotoId),
      urlImagen: formData.urlImagen
    };

    try {
      await actualizarPista(id, pistaParaEnviar);
      navegar("/pistas");
    } catch (err) {
      setError("Error al guardar la pista");
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!formData) return <p>Cargando...</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Editar Pista</h2>
      <form onSubmit={handleSubmit} className="formulario">
        <input
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Nombre"
        />
        <input
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          required
          placeholder="Ubicación"
        />
        <select
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un tipo</option>
          {TIPOS.map(({ id, nombre }) => (
            <option key={id} value={id.toString()}>
              {nombre}
            </option>
          ))}
        </select>
        <select
          name="mejorPilotoId"
          value={formData.mejorPilotoId}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un piloto</option>
          {pilotos.map((p) => (
            <option key={p.id} value={p.id.toString()}>
              {p.nombre}
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

export default FormularioEditarPista;
