import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCoins } from '../../context/CoinsContext';
import './Jump.scss';
import gatoImg from '../../assets/assets_games/cat.png';       
import asteroideImg from '../../assets/assets_games/asteroid.png'; 

const Jump: React.FC = () => {
  const navigate = useNavigate();
  const { addCoins } = useCoins();

  const [started, setStarted] = useState(false);
  const [x, setX] = useState(30);
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  const catRef = useRef<HTMLImageElement>(null);
  const asteroidRef = useRef<HTMLImageElement>(null);

  const handleStart = () => {
    setStarted(true);
    setScore(0);
    setHasWon(false);
  };

  const handleBack = () => {
    navigate("/games");
  };

  // Movimiento con teclas
  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setX((prev) => Math.min(prev + 20, 540));
      } else if (e.key === "ArrowLeft") {
        setX((prev) => Math.max(prev - 20, 0));
      } else if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 600);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, isJumping]);

  // Colisión
  useEffect(() => {
    if (!started) return;

    const checkCollision = () => {
      const cat = catRef.current;
      const asteroid = asteroidRef.current;

      if (cat && asteroid) {
        const catRect = cat.getBoundingClientRect();
        const asteroidRect = asteroid.getBoundingClientRect();

        const isColliding =
          catRect.left < asteroidRect.right &&
          catRect.right > asteroidRect.left &&
          catRect.top < asteroidRect.bottom &&
          catRect.bottom > asteroidRect.top;

        if (isColliding) {
          alert("💥 Oh no... Your Purr has collided. Game Over!");
          setStarted(false);
          setX(30);
          setIsJumping(false);
          setScore(0);
          setHasWon(false);
        }
      }
    };

    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [started]);

  // Puntuación y lógica de victoria
  useEffect(() => {
    if (!started) return;

    const scoreInterval = setInterval(() => {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore >= 100 && !hasWon) {
          const coinsEarned = 5;
          addCoins(coinsEarned);
          alert(`🎉 Congratulations! You've earned ${coinsEarned} coins!`);
          setStarted(false);
          setX(30);
          setIsJumping(false);
          setHasWon(true);
          return 0;
        }
        return newScore;
      });
    }, 100);

    return () => clearInterval(scoreInterval);
  }, [started, addCoins, hasWon]);

  return (
    <div id="jumpBody">
      <div id="main-jumpPage">
        {!started && <h1 className="h1_jump">Jump Jump!</h1>}

        <div className="menu">
          {!started && (
            <>
              <button className="buttonJump-jugar" onClick={handleStart}>Start</button>
              <div id="instrucciones">
                <p className="p_jump">The rules are pretty simple!</p>
                <p className="p_jump">You can move forward, backward or jump to avoid asteroids.</p>
                <p className="p_jump">If you collide, you lose!</p>
                <p className="p_jump">If you reach 100 points you win 5 coins!</p>
                <button className="gameBack-buttonJump" onClick={handleBack}>
                  ⬅ Go back
                </button>    
              </div>
            </>
          )}

          {started && (
            <>
              <img 
                src={asteroideImg} 
                ref={asteroidRef}
                className="asteroidJump" 
                alt="Asteroid" 
              />
              <img 
                src={gatoImg} 
                ref={catRef}
                alt="Gato" 
                className={`catJump ${isJumping ? "jump" : ""}`} 
                style={{ left: x, bottom: isJumping ? 150 : 90 }}
              />
              <div className="scoreJump">Score: {score}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jump;
