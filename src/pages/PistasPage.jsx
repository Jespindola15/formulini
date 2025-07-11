import React, { useEffect, useState } from 'react';
import {
  getAllPistas,
  createPista,
  updatePista,
  deletePista
} from '../Servicios/apiPistas'; // Servicios conectados a la API
import '../Styles/PistasPage.css'; // Estilos para las tarjetas
import Loader from '../componentes/Loader'; // Loader de carga

const PistasPage = () => {
  const [pistas, setPistas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estado para la pista que se está creando
  const [nuevaPista, setNuevaPista] = useState({
    nombre: '',
    ubicacion: '',
    tipo: '',
    mejorPiloto: '',
  });

  // Obtener todas las pistas al cargar la página
  useEffect(() => {
    fetchPistas();
  }, []);

  const fetchPistas = async () => {
    setCargando(true);
    try {
      const data = await getAllPistas();
      setPistas(data);
    } catch (err) {
      setError(err);
    } finally {
      setCargando(false);
    }
  };

  // Manejar cambios en inputs del formulario de agregar
  const handleChange = (e) => {
    setNuevaPista({
      ...nuevaPista,
      [e.target.name]: e.target.value,
    });
  };

  // Agregar nueva pista
  const handleAgregar = async () => {
    try {
      await createPista(nuevaPista);
      await fetchPistas(); // Refrescar la lista
      // Limpiar formulario
      setNuevaPista({ nombre: '', ubicacion: '', tipo: '', mejorPiloto: '' });
    } catch (err) {
      console.error('Error al agregar pista:', err);
    }
  };

  // Eliminar una pista
  const handleEliminar = async (id) => {
    try {
      await deletePista(id);
      await fetchPistas(); // Refrescar la lista
    } catch (err) {
      console.error('Error al eliminar pista:', err);
    }
  };

  // Actualizar pista (por ahora simplemente la reenvía igual)
  const handleActualizar = async (id, pistaOriginal) => {
    try {
      const actualizada = { ...pistaOriginal };
      await updatePista(id, actualizada);
      await fetchPistas();
    } catch (err) {
      console.error('Error al actualizar pista:', err);
    }
  };

  // Mensajes de carga y errores
  if (cargando) return <Loader />;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;

  return (
    <div className="pistas-page-container">
      <h2>Circuitos de Fórmula 1</h2>

      <div className="grid-pistas">

        {/* 🟢 Tarjeta para Agregar Pista */}
        <div className="tarjeta-pista agregar">
          <input
            type="text"
            name="nombre"
            placeholder='Nombre del circuito'
            value={nuevaPista.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ubicacion"
            placeholder='Ubicación'
            value={nuevaPista.ubicacion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tipo"
            placeholder='Tipo (Ej: Autódromo)'
            value={nuevaPista.tipo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mejorPiloto"
            placeholder='Mejor Piloto'
            value={nuevaPista.mejorPiloto}
            onChange={handleChange}
          />
          <div className="acciones">
            <button onClick={handleAgregar}>Agregar</button>
            <button onClick={() => setNuevaPista({ nombre: '', ubicacion: '', tipo: '', mejorPiloto: '' })}>
              Limpiar
            </button>
          </div>
        </div>

        {/* 🔁 Tarjetas de Pistas desde la API */}
        {pistas.map((pista) => (
          <div key={pista.id} className="tarjeta-pista">
            <h3>{pista.nombre}</h3>
            <p>Ubicación = "{pista.ubicacion}"</p>
            <p>Tipo = "{pista.tipo}"</p>
            <p>Mejor Piloto = "{pista.mejorPiloto}"</p>
            <div className="acciones">
              <button onClick={() => handleActualizar(pista.id, pista)}>Actualizar</button>
              <button onClick={() => handleEliminar(pista.id)}>Eliminar</button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default PistasPage;
