// src/pages/EscuderiasPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { getAllEscuderias } from '../Servicios/apiEscuderias'; // Importa la función para obtener todas las escuderías
import '../Styles/EscuderiasPage.css';

const EscuderiasPage = () => {
  const [teams, setTeams] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Datos locales para las imágenes de coches, logos grandes y colores (se fusionarán con la API)
  // Asegúrate de que los 'name' aquí coincidan exactamente con los 'nombre' de tu API
  const localTeamDetails = [
    { id: 1, name: 'Alpine', color: '#0090FF', carImage: '/imagenes/alpine-auto-removebg-preview.png', largeLogo: '/imagenes/alpine-logo-large.png', driver1: 'Franco Colapinto', driver2: 'Pierre Gasly' },
    { id: 2, name: 'McLaren', color: '#FF8000', carImage: '/imagenes/mclaren-auto-removebg-preview.png', largeLogo: '/imagenes/mclaren-logo-large.png', driver1: 'Oscar Piastri', driver2: 'Lando Norris' },
    { id: 3, name: 'Ferrari', color: '#DC0000', carImage: '/imagenes/ferrari-auto-removebg-preview.png', largeLogo: '/imagenes/ferrari-logo-large.png', driver1: 'Charles Leclerc', driver2: 'Lewis Hamilton' },
    { id: 4, name: 'Red Bull', color: '#3671C6', carImage: '/imagenes/redbull-auto-removebg-preview.png', largeLogo: '/imagenes/redbull-logo-large.png', driver1: 'Max Verstappen', driver2: 'Yuki Tsunoda' },
    { id: 5, name: 'Mercedes', color: '#00D2BE', carImage: '/imagenes/mercedes-auto-removebg-preview.png', largeLogo: '/imagenes/mercedes-logo-large.png', driver1: 'Kimi Antonelli', driver2: 'George Russell' },
    { id: 6, name: 'Aston Martin', color: '#006F62', carImage: '/imagenes/astonmartin-auto-removebg-preview.png', largeLogo: '/imagenes/astonmartin-logo-large.png', driver1: 'Fernando Alonso', driver2: 'Lance Stroll' },
    { id: 7, name: 'Haas', color: '#B6B6B6', carImage: '/imagenes/hass-auto-removebg-preview.png', largeLogo: '/imagenes/haas-logo-large.png', driver1: 'Esteban Ocon', driver2: 'Oliver Bearman' },
    { id: 8, name: 'Racing Bulls', color: '#6692FF', carImage: '/imagenes/rbracing-auto-removebg-preview.png', largeLogo: '/imagenes/racingbulls-logo-large.png', driver1: 'Liam Lawson', driver2: 'Isac Hadjar' },
    { id: 9, name: 'Williams', color: '#005A9C', carImage: '/imagenes/wiliams-auto-removebg-preview.png', largeLogo: '/imagenes/williams-logo-large.png', driver1: 'Alexander Albon', driver2: 'Carlos Sainz' },
    { id: 10, name: 'Kick Sauber', color: '#5b9e00', carImage: '/imagenes/kick-auto-removebg-preview.png', largeLogo: '/imagenes/sauber-logo-large.png', driver1: 'Nico Hulkenberg', driver2: 'Gabriel Bortoleto' },
  ];

  useEffect(() => {
    const fetchEscuderias = async () => {
      try {
        console.log("Fetching escuderías from API...");
        const apiData = await getAllEscuderias(); // Obtiene datos de la API
        console.log("API Data received:", apiData);

        // Fusiona los datos de la API con la información local
        const mergedTeams = apiData.map(apiTeam => {
          const localInfo = localTeamDetails.find(local => local.name === apiTeam.nombre);
          if (!localInfo) {
            console.warn(`No local image info found for team: ${apiTeam.nombre}. Using placeholders.`);
          }
          return {
            ...apiTeam, // Datos de la API (id, nombre, imagenUrl, pais, anoFundacion)
            // Añade o sobrescribe con la información local si se encuentra
            color: localInfo ? localInfo.color : '#505050', // Color por defecto
            carImage: localInfo ? localInfo.carImage : 'https://placehold.co/250x80/cccccc/000000?text=CAR',
            largeLogo: localInfo ? localInfo.largeLogo : 'https://placehold.co/200x200/cccccc/000000?text=LOGO',
            driver1: localInfo ? localInfo.driver1 : 'Piloto 1', // Mock driver para la lista
            driver2: localInfo ? localInfo.driver2 : 'Piloto 2', // Mock driver para la lista
          };
        });
        setTeams(mergedTeams);
        console.log("Merged Teams:", mergedTeams);
      } catch (err) {
        console.error("Error fetching or merging escuderías:", err);
        setError(err);
      } finally {
        setCargando(false);
      }
    };

    fetchEscuderias();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  if (cargando) return <div className="mensaje-carga">Cargando escuderías...</div>;
  if (error) return <div className="mensaje-error">Error: {error.message}</div>;
  if (teams.length === 0) return <div className="mensaje-sin-datos">No hay escuderías disponibles.</div>;

  return (
    <div className="escuderias-page-container">
      <h2 className="page-title">F1 TEAMS 2025</h2>
      <p className="page-subtitle">Find the current Formula 1 teams for the 2025 season</p>
      <div className="escuderias-grid">
        {teams.map(team => (
          // El enlace ahora usa team.id, que viene de la API
          <Link
            key={team.id}
            to={`/escuderias/${team.id}`}
            className="escuderia-card" // Aplica la clase directamente al Link
            style={{
              backgroundColor: team.color,
              backgroundImage: `
                radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%),
                linear-gradient(to bottom right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 100%)
              `,
              backgroundRepeat: 'no-repeat, no-repeat',
              backgroundPosition: 'left top, left top',
              backgroundSize: '100% 100%, 100% 100%',
            }}
          >
            {/* El div de overlay del logo se mantiene dentro del Link */}
            <div
              className="background-logo-overlay"
              style={{ backgroundImage: `url(${team.largeLogo})` }}
            ></div>

            <div className="card-header">
              <span className="team-name">{team.nombre}</span> {/* Usa team.nombre de la API */}
            </div>
            <div className="driver-names">
              <p>{team.driver1}</p> {/* Estos son los mock drivers fusionados */}
              <p>{team.driver2}</p>
            </div>
            <img
              src={team.carImage} // Usa la imagen del coche fusionada
              alt={`${team.nombre} Car`}
              className="car-image"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EscuderiasPage;
