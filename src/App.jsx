import React from 'react';
import { useRoute } from 'wouter';
import Navbar from './componentes/Navbar';
import EscuderiaDetail from './pages/EscuderiaDetail';
import PilotosPage from './pages/PilotosPage';
import PistasPage from './pages/PistasPage';
import FormularioCrearPista from './pages/FormularioCrearPista';
import FormularioEditarPista from './pages/FormularioEditarPista';
import FormularioCrearPiloto from './pages/FormularioCrearPiloto';  // <-- Importá estos
import FormularioEditarPiloto from './pages/FormularioEditarPiloto'; // <-- También importá editar piloto
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
  const [matchEditarPista, paramsEditarPista] = useRoute("/pistas/editar/:id");

  // Nuevas rutas para crear y editar pilotos
  const [matchCrearPiloto] = useRoute("/pilotos/nuevo");
  const [matchEditarPiloto, paramsEditarPiloto] = useRoute("/pilotos/editar/:id");

  return (
    <div>
      <Navbar />
      <main className="content">
        {matchHome && <Home />}
        {matchPilotos && !matchCrearPiloto && !matchEditarPiloto && <PilotosPage />}
        {matchCrearPiloto && <FormularioCrearPiloto />}
        {matchEditarPiloto && <FormularioEditarPiloto id={paramsEditarPiloto.id} />}
        {matchEscuderiasList && !matchEscuderiaDetail && <EscuderiasPage />}
        {matchEscuderiaDetail && <EscuderiaDetail escuderiaId={paramsEscuderia.id} />}
        {matchPistas && !matchCrearPista && !matchEditarPista && <PistasPage />}
        {matchCrearPista && <FormularioCrearPista />}
        {matchEditarPista && <FormularioEditarPista id={paramsEditarPista.id} />}
      </main>
    </div>
  );
}

export default App;
