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
  // Construimos el objeto con las claves en mayúscula inicial y tipo string
  const cuerpo = {
    Nombre: pista.Nombre || pista.nombre,
    Ubicacion: pista.Ubicacion || pista.ubicacion,
    Tipo: pista.Tipo || pista.tipo, // enviar string tal cual
    MejorPilotoId: Number(pista.MejorPilotoId || pista.mejorPilotoId),
    UrlImagen: pista.UrlImagen || pista.urlImagen || ''
  };

  console.log("Enviando a backend:", cuerpo);

  const res = await fetch(`${API_BASE_URL}/pistas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),  // Aquí enviamos el objeto directamente
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
  const cuerpo = {
    Nombre: pista.nombre,
    Ubicacion: pista.ubicacion,
    Tipo: pista.tipo,  // ya es string descriptivo
    MejorPilotoId: pista.mejorPilotoId,
    UrlImagen: pista.urlImagen || ''
  };

  console.log("Actualizando en backend:", cuerpo);

  const res = await fetch(`${API_BASE_URL}/pistas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),  // enviar el objeto directamente
  });

  const mensaje = await res.text();

  if (!res.ok) {
    console.error("Respuesta del backend:", mensaje);
    throw new Error(`Error al actualizar: ${mensaje}`);
  }

  return JSON.parse(mensaje);
};





// Borrar pista
export const borrarPista = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pistas/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al borrar pista');
};
