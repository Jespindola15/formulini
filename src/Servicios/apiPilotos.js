// src/Servicios/apiPilotos.js

const API_BASE_URL = 'https://f1backend.onrender.com/api';

export const getAllPilotos = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/pilotos`);
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Error: ${res.status} ${res.statusText} - ${errorBody}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error en getAllPilotos:", error);
    throw error;
  }
};

// Obtener piloto por ID
export const getPilotoById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/pilotos/${id}`);
    if (!res.ok) {
      const errorBody = await res.text();
      if (res.status === 404) {
        throw new Error(`Piloto con ID ${id} no encontrado.`);
      }
      throw new Error(`Error al cargar el piloto con ID ${id}: ${res.status} ${res.statusText} - ${errorBody}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error en getPilotoById:", error);
    throw error;
  }
};

// Crear piloto
export const crearPiloto = async (piloto) => {
  const cuerpo = {
    Nombre: piloto.Nombre,
    Pais: piloto.Pais,
    Numero: Number(piloto.Numero),
    Edad: Number(piloto.Edad),
    EscuderiaId: Number(piloto.EscuderiaId),
    ImagenUrl: piloto.ImagenUrl, // ✅ corregido
  };

  console.log("Enviando a backend:", cuerpo);

  const res = await fetch(`${API_BASE_URL}/pilotos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

  const mensaje = await res.text();
  if (!res.ok) {
    console.error("Respuesta del backend:", mensaje);
    throw new Error(`Error al crear piloto: ${mensaje}`);
  }

  try {
    return JSON.parse(mensaje);
  } catch (e) {
    console.warn("No se pudo parsear la respuesta JSON del backend:", mensaje);
    return mensaje;
  }
};

// Actualizar piloto
export const actualizarPiloto = async (id, piloto) => {
  const cuerpo = {
    Nombre: piloto.Nombre,
    Pais: piloto.Pais,
    Numero: Number(piloto.Numero),
    Edad: Number(piloto.Edad),
    EscuderiaId: Number(piloto.EscuderiaId),
    ImagenUrl: piloto.ImagenUrl, // ✅ corregido
  };

  console.log("Actualizando en backend:", cuerpo);

  const res = await fetch(`${API_BASE_URL}/pilotos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

  const mensaje = await res.text();
  if (!res.ok) {
    console.error("Respuesta del backend:", mensaje);
    throw new Error(`Error al actualizar piloto: ${mensaje}`);
  }

  try {
    return JSON.parse(mensaje);
  } catch (e) {
    console.warn("No se pudo parsear la respuesta JSON del backend:", mensaje);
    return mensaje;
  }
};


// Borrar piloto
export const borrarPiloto = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pilotos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al borrar piloto');
};
