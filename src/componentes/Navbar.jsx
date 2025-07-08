// src/components/Navbar.jsx
import React from 'react';
import { Link, useRoute } from 'wouter';
import '../Styles/Navbar.css'; // Asegúrate de que esta ruta sea correcta

const Navbar = () => {
  // Estos hooks verifican si la ruta actual coincide con los enlaces de navegación
  const [matchHome] = useRoute("/"); // Nuevo hook para la ruta Home
  const [matchPilotos] = useRoute("/pilotos");
  const [matchEscuderias] = useRoute("/escuderias");
  const [matchPistas] = useRoute("/pistas");

  return (
    <header className="navbar">
      {/* Puedes agregar un logo de F1 aquí si lo deseas */}
      { <img src="/imagenes/formulini-logo.png" alt="F1 Logo" className="navbar-logo" /> }
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" className={`nav-item ${matchHome ? 'active' : ''}`}> {/* Enlace a Home */}
              Home
            </Link>
          </li>
          <li>
            <Link to="/pilotos" className={`nav-item ${matchPilotos ? 'active' : ''}`}>
              Pilotos
            </Link>
          </li>
          <li>
            <Link to="/escuderias" className={`nav-item ${matchEscuderias ? 'active' : ''}`}>
              Escuderías
            </Link>
          </li>
          <li>
            <Link to="/pistas" className={`nav-item ${matchPistas ? 'active' : ''}`}>
              Pistas
            </Link>
          </li>
        </ul>
      </nav>
      {/* Aquí podrías añadir el temporizador "Grand Prix Weekend" si lo implementas */}
    </header>
  );
};

export default Navbar;