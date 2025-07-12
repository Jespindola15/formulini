// src/Servicios/apiPistas.js

const API_BASE_URL = 'https://f1backend.onrender.com/api'; // URL base del backend

// Obtener todas las pistas
export const getAllPistas = async () => {
  const res = await fetch(`${API_BASE_URL}/pistas`);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};

// Obtener pista por ID
export const getPistaById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pistas/${id}`);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};

// Crear nueva pista
export const crearPista = async (pista) => {
  console.log("Enviando a backend:", pista);

  const cuerpo = {
    pista: {
      ...pista,
      tipo: Number(pista.tipo), // convierte tipo a número (int)
    }
  };

  const res = await fetch(`${API_BASE_URL}/pistas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

  const mensaje = await res.text();

  if (!res.ok) {
    console.error("Respuesta del backend:", mensaje);
    throw new Error(`Error al crear: ${mensaje}`);
  }

  return JSON.parse(mensaje);
};



// Actualizar pista existente
export const actualizarPista = async (id, pista) => {
  const res = await fetch(`${API_BASE_URL}/pistas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pista),
  });
  if (!res.ok) throw new Error(`Error al actualizar: ${res.statusText}`);
  return res.json();
};
