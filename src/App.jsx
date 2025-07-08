// src/App.jsx
import React from 'react';
import { useRoute } from 'wouter';
import Navbar from './componentes/Navbar';
import EscuderiaDetail from './pages/EscuderiaDetail';
import PilotosPage from './pages/PilotosPage';
import PistasPage from './pages/PistasPage';
import EscuderiasPage from './componentes/EscuderiasPage';
import Home from './pages/Home'; // <-- Asegúrate de que esta importación esté presente
import './Styles/global.css';

function App() {
  const [matchHome] = useRoute("/");
  const [matchPilotos] = useRoute("/pilotos");
  const [matchEscuderiasList] = useRoute("/escuderias");
  const [matchEscuderiaDetail, params] = useRoute("/escuderias/:id");
  const [matchPistas] = useRoute("/pistas");

  return (
    <div>
      <Navbar />
      <main className="content">
        {matchHome && <Home />} {/* <-- CAMBIO AQUÍ: Home ahora renderiza el componente Home */}
        {matchPilotos && <PilotosPage />}
        {matchEscuderiasList && !matchEscuderiaDetail && <EscuderiasPage />}
        {matchEscuderiaDetail && <EscuderiaDetail escuderiaId={params.id} />}
        {matchPistas && <PistasPage />}
      </main>
    </div>
  );
}

export default App;
