// src/Servicios/apiEscuderias.js

const API_BASE_URL = 'https://f1backend.onrender.com/api'; 

export const getEscuderiaById = async (idEscuderia) => {
  try {
    const response = await fetch(`${API_BASE_URL}/escuderias/${idEscuderia}`);
    if (!response.ok) {
      // Manejo de errores HTTP
      if (response.status === 404) {
        throw new Error(`Escudería con ID '${idEscuderia}' no encontrada.`);
      }
      throw new Error(`Error al cargar la escudería con ID ${idEscuderia}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getEscuderiaById:", error);
    throw error;
  }
};

export const getAllEscuderias = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/escuderias`);
    if (!response.ok) {
      throw new Error(`Error al cargar todas las escuderías: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllEscuderias:", error);
    throw error;
  }
};
