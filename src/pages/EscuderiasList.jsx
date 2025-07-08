// src/pages/EscuderiasList.jsx
import { useEffect, useState } from "react";
import { getEscuderias } from "../services/apiEscuderias";
import "../styles/EscuderiasList.css";

function EscuderiasList() {
  const [escuderias, setEscuderias] = useState([]);

  useEffect(() => {
    getEscuderias().then(setEscuderias);
  }, []);

  return (
    <div className="escuderias-container">
      <h2>Escuderías</h2>
      <div className="escuderias-grid">
        {escuderias.map((e) => (
          <div className="card-escuderia" key={e.id}>
            <img src={e.imagenAuto} alt={e.nombre} />
            <h3>{e.nombre}</h3>
            <p><strong>Motor:</strong> {e.motor}</p>
            <p><strong>Debut:</strong> {e.debut}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EscuderiasList;
