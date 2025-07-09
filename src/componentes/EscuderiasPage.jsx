import React from 'react';
import { Link } from 'wouter';
import '../Styles/EscuderiasPage.css';

const EscuderiasPage = () => {
  const placeholderTeams = [
    { id: 1, name: 'McLaren', slug: 'mclaren', color: '#FF8000', driver1: 'Oscar Piastri', driver2: 'Lando Norris', carImage: '/imagenes/mclaren-auto-removebg-preview.png', largeLogo: '/imagenes/mclaren-logo-large.png' },
    { id: 2, name: 'Ferrari', slug: 'ferrari', color: '#DC0000', driver1: 'Charles Leclerc', driver2: 'Carlos Sainz', carImage: '/imagenes/ferrari-auto-removebg-preview.png', largeLogo: '/imagenes/ferrari-logo-large.png' },
    { id: 3, name: 'Mercedes', slug: 'mercedes', color: '#00D2BE', driver1: 'Lewis Hamilton', driver2: 'George Russell', carImage: '/imagenes/mercedes-auto-removebg-preview.png', largeLogo: '/imagenes/mercedes-logo-large.png' },
    { id: 4, name: 'Red Bull Racing', slug: 'redbull', color: '#3671C6', driver1: 'Max Verstappen', driver2: 'Sergio Pérez', carImage: '/imagenes/redbull-auto-removebg-preview.png', largeLogo: '/imagenes/redbull-logo-large.png' },
    { id: 5, name: 'Williams', slug: 'williams', color: '#005A9C', driver1: 'Alexander Albon', driver2: 'Logan Sargeant', carImage: '/imagenes/wiliams-auto-removebg-preview.png', largeLogo: '/imagenes/williams-logo-large.png' },
    { id: 6, name: 'Kick Sauber', slug: 'kick-sauber', color: '#5b9e00', driver1: 'Valtteri Bottas', driver2: 'Zhou Guanyu', carImage: '/imagenes/kick-auto-removebg-preview.png', largeLogo: '/imagenes/sauber-logo-large.png' },
    { id: 7, name: 'Racing Bulls', slug: 'racing-bulls', color: '#6692FF', driver1: 'Daniel Ricciardo', driver2: 'Yuki Tsunoda', carImage: '/imagenes/rbracing-auto-removebg-preview.png', largeLogo: '/imagenes/racingbulls-logo-large.png' },
    { id: 8, name: 'Aston Martin', slug: 'aston-martin', color: '#006F62', driver1: 'Fernando Alonso', driver2: 'Lance Stroll', carImage: '/imagenes/astonmartin-auto-removebg-preview.png', largeLogo: '/imagenes/astonmartin-logo-large.png' },
    { id: 9, name: 'Haas', slug: 'haas', color: '#B6B6B6', driver1: 'Kevin Magnussen', driver2: 'Nico Hülkenberg', carImage: '/imagenes/hass-auto-removebg-preview.png', largeLogo: '/imagenes/haas-logo-large.png' },
    { id: 10, name: 'Alpine', slug: 'alpine', color: '#0090FF', driver1: 'Esteban Ocon', driver2: 'Pierre Gasly', carImage: '/imagenes/alpine-auto-removebg-preview.png', largeLogo: '/imagenes/alpine-logo-large.png' },
  ];

  return (
    <div className="escuderias-page-container">
      <h2 className="page-title">F1 TEAMS 2025</h2>
      <p className="page-subtitle">Find the current Formula 1 teams for the 2025 season</p>
      <div className="escuderias-grid">
        {placeholderTeams.map(team => (
          <Link key={team.id} to={`/escuderias/${team.slug}`}>
            <a
              className="escuderia-card"
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
              <div
                className="background-logo-overlay"
                style={{ backgroundImage: `url(${team.largeLogo})` }}
              ></div>

              <div className="card-header">
                <span className="team-name">{team.name}</span>
              </div>
              <div className="driver-names">
                <p>{team.driver1}</p>
                <p>{team.driver2}</p>
              </div>
              <img
                src={team.carImage || 'https://placehold.co/250x80/cccccc/000000?text=CAR'}
                alt={`${team.name} Car`}
                className="car-image"
              />
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EscuderiasPage;
