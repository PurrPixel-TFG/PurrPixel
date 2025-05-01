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
    <div className="game-page">
      <h1>PURR JUMP</h1>
      {/* Game content */}

      {/* Button to go back */}
      <button className="gameBack-button" onClick={handleBack}>
        ⬅ Go back
      </button>
    </div>
  );
};

export default Jump;
