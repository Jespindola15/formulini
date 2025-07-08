// src/Servicios/apiPistas.js

// ¡¡IMPORTANTE!! Reemplaza esta URL con la URL base de tu backend .NET
const API_BASE_URL = 'http://localhost:5000/api'; 

export const getAllPistas = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pistas`);
    if (!response.ok) {
      throw new Error(`Error al cargar las pistas: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllPistas:", error);
    throw error;
  }
};

export const getPistaById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pistas/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pista con ID ${id} no encontrada.`);
      }
      throw new Error(`Error al cargar la pista con ID ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getPistaById:", error);
    throw error;
  }
};