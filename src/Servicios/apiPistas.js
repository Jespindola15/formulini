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
    // ¡CORREGIDO AQUÍ! Cambiado de UrlImagen a ImagenUrl para coincidir con el backend
    ImagenUrl: pista.UrlImagen || pista.urlImagen || '' // Asegura que siempre se envíe, incluso si está vacío
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

  // Intenta parsear el mensaje solo si la respuesta es exitosa y no está vacía
  try {
    return JSON.parse(mensaje);
  } catch (e) {
    console.warn("No se pudo parsear la respuesta JSON del backend:", mensaje);
    return mensaje; // Devuelve el mensaje como texto si no es JSON
  }
};


// Actualizar pista existente
export const actualizarPista = async (id, pista) => {
  const cuerpo = {
    Nombre: pista.nombre,
    Ubicacion: pista.ubicacion,
    Tipo: pista.tipo,  // ya es string descriptivo
    MejorPilotoId: pista.mejorPilotoId,
    // ¡CORREGIDO AQUÍ! Cambiado de UrlImagen a ImagenUrl para coincidir con el backend
    ImagenUrl: pista.urlImagen || '' // Asegura que siempre se envíe, incluso si está vacío
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

  // Intenta parsear el mensaje solo si la respuesta es exitosa y no está vacía
  try {
    return JSON.parse(mensaje);
  } catch (e) {
    console.warn("No se pudo parsear la respuesta JSON del backend:", mensaje);
    return mensaje; // Devuelve el mensaje como texto si no es JSON
  }
};


// Borrar pista
export const borrarPista = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pistas/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al borrar pista');
};
