// src/Servicios/apiPilotos.js

// ¡¡IMPORTANTE!! Reemplaza esta URL con la URL base de tu backend .NET
const API_BASE_URL = 'https://f1backend.onrender.com/api'; 

export const getAllPilotos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pilotos`);
    if (!response.ok) {
      throw new Error(`Error al cargar los pilotos: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllPilotos:", error);
    throw error;
  }
};

export const getPilotoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pilotos/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Piloto con ID ${id} no encontrado.`);
      }
      throw new Error(`Error al cargar el piloto con ID ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getPilotoById:", error);
    throw error;
  }
};