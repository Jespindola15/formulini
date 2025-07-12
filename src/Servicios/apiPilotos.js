// src/Servicios/apiPilotos.js

// ¡¡IMPORTANTE!! Reemplaza esta URL con la URL base de tu backend .NET
// src/Servicios/apiPilotos.js

const API_BASE_URL = 'https://f1backend.onrender.com/api';

// Obtener todos los pilotos
export const getAllPilotos = async () => {
  const res = await fetch(`${API_BASE_URL}/pilotos`);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
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