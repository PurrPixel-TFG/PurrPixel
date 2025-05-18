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
  
<div id="jumpBody">
<div id="main-jumpPage">
    <h1>Jump Jump!</h1>

    <div className="menu">
        <button className="buttonJump-jugar">Start</button>
        <div id="instrucciones" className="hidden">
            <p>The rules are pretty simple!</p>
            <p>Press any key to avoid asteroids. If you do, you lose!</p>
            <p>Hold on for up to 10 seconds to win!</p>

            {/* Button to go back */}
            <button className="gameBack-button" onClick={handleBack}>
            ⬅ Go back
            </button>    
          </div>
    </div>
</div>
</div>
  );
};

export default Jump;
