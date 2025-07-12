

const API_BASE_URL = 'https://f1backend.onrender.com/api';

export const getAllPilotos = async () => {
  const res = await fetch(`${API_BASE_URL}/pilotos`);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};

// Obtener piloto por ID
export const getPilotoById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pilotos/${id}`);
  if (!res.ok) throw new Error(`Error: ${res.statusText}`);
  return res.json();
};

// Crear piloto
export const crearPiloto = async (piloto) => {
  const cuerpo = {
    Nombre: piloto.Nombre || piloto.nombre,
    Pais: piloto.Pais || piloto.pais || '',
    Numero: Number(piloto.Numero || piloto.numero),
    Edad: Number(piloto.Edad || piloto.edad),
    EscuderiaId: Number(piloto.EscuderiaId || piloto.escuderiaId),
    UrlImagen: piloto.UrlImagen || piloto.urlImagen || ''
  };

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
  return JSON.parse(mensaje);
};

// Actualizar piloto
export const actualizarPiloto = async (id, piloto) => {
  const cuerpo = {
    Nombre: piloto.nombre,
    Pais: piloto.pais,
    Numero: Number(piloto.numero),
    Edad: Number(piloto.edad),
    EscuderiaId: Number(piloto.escuderiaId),
    UrlImagen: piloto.urlImagen || ''
  };

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
  return JSON.parse(mensaje);
};

// Borrar piloto
export const borrarPiloto = async (id) => {
  const res = await fetch(`${API_BASE_URL}/pilotos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al borrar piloto');
};
