// src/Servicios/apiEscuderias.js

// ¡¡IMPORTANTE!! Reemplaza esta URL con la URL base de tu backend .NET
const API_BASE_URL = 'https://f1backend.onrender.com/api'; 

export const getEscuderiaPorNombre = async (nombreEscuderia) => {
  try {
    const response = await fetch(`${API_BASE_URL}/escuderias/${nombreEscuderia}`);
    if (!response.ok) {
      // Manejo de errores HTTP
      if (response.status === 404) {
        throw new Error(`Escudería '${nombreEscuderia}' no encontrada.`);
      }
      throw new Error(`Error al cargar la escudería ${nombreEscuderia}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getEscuderiaPorNombre:", error);
    throw error; // Propaga el error para que el componente que llama lo maneje
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

// Puedes añadir más funciones aquí para crear, editar, eliminar escuderías si las necesitas