// src/App.jsx
import React from 'react';
import { useRoute } from 'wouter';
import Navbar from './componentes/Navbar';
import EscuderiaDetail from './pages/EscuderiaDetail';
import PilotosPage from './pages/PilotosPage';
import PistasPage from './pages/PistasPage';
import FormularioCrearPista from './pages/FormularioCrearPista'; // Nuevo
import FormularioEditarPista from './pages/FormularioEditarPista'; // Nuevo
import EscuderiasPage from './componentes/EscuderiasPage';
import Home from './pages/Home';
import './Styles/global.css';

function App() {
  // Rutas existentes
  const [matchHome] = useRoute("/");
  const [matchPilotos] = useRoute("/pilotos");
  const [matchEscuderiasList] = useRoute("/escuderias");
  const [matchEscuderiaDetail, paramsEscuderia] = useRoute("/escuderias/:id");
  const [matchPistas] = useRoute("/pistas");

  // Nuevas rutas para crear y editar pistas
  const [matchCrearPista] = useRoute("/pistas/nueva");
  const [matchEditarPista, paramsEditar] = useRoute("/pistas/editar/:id");

  return (
    <div>
      <Navbar />
      <main className="content">
        {matchHome && <Home />}
        {matchPilotos && <PilotosPage />}
        {matchEscuderiasList && !matchEscuderiaDetail && <EscuderiasPage />}
        {matchEscuderiaDetail && <EscuderiaDetail escuderiaId={paramsEscuderia.id} />}
        {matchPistas && <PistasPage />}
        {matchCrearPista && <FormularioCrearPista />}
        {matchEditarPista && <FormularioEditarPista id={paramsEditar.id} />}
      </main>
    </div>
  );
}

export default App;
