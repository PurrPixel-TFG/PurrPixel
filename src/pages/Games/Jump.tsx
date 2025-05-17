// Jump.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './Jump.scss';

const Jump: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/games");  // Go back to the principal page
  };

  return (
    
<div id="main-jumpPage">
    <h1>¡Purr Salto!</h1>

    <div className="menu">
        <button id="button-jugar">Iniciar el juego</button>
        <div id="instrucciones" className="hidden">
            <p>¡Las instrucciones son muy sencillas!</p>
            <p>Pulsa cualquier tecla para esquivar los obstáculos. Si chocas contrea el arbusto, ¡pierdes!</p>
            <p>¡Aguanta hasta 10 segundos para ganar!</p>

            {/* Button to go back */}
            <button className="gameBack-button" onClick={handleBack}>
            ⬅ Go back
            </button>    
          </div>
    </div>
</div>
  );
};

export default Jump;
