// Catch.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './Catch.scss';

const Catch: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/games");  // Redirige a la página de selección de juegos
  };

  return (
    <div className="game-page">
      <h1>Juego de Atrapar</h1>
      {/* Aquí va el contenido del juego */}

      {/* Botón de retroceso */}
      <button className="back-button" onClick={handleBack}>
        ⬅ Volver a la selección de juegos
      </button>
    </div>
  );
};

export default Catch;

