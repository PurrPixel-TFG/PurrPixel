import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Catch.scss';

/*
  Genera una posición aleatoria dentro del área de juego (500×500px)
*/
const getRandomPosition = () => ({
  top: Math.random() * 450,  // deja 50px de margen para el propio ratón
  left: Math.random() * 450,
});

interface MouseProps {
  onClick: () => void;
  position: { top: number; left: number };
}

/*
  Componente Mouse: un div que simula al ratón.
  Al hacer click, llama a onClick y se reposiciona.
*/
const Mouse: React.FC<MouseProps> = ({ onClick, position }) => (
  <div
    className="mouse"
    onClick={onClick}
    style={{
      position: 'absolute',
      width: '50px',
      height: '50px',
      background: 'gray',        // símbolo provisional
      borderRadius: '50%',
      cursor: 'pointer',
      top: `${position.top}px`,
      left: `${position.left}px`
    }}
  />
);

/*
  Componente principal del juego CatchTheMice.
  Controla estado (start/playing/end), puntuación y ratón.
*/
const CatchTheMiceGame: React.FC = () => {
  const navigate = useNavigate();

  // Estados de juego
  const [score, setScore] = useState(0);
  const [mousePos, setMousePos] = useState(getRandomPosition());
  const [showMouse, setShowMouse] = useState(false);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');

  const intervalRef = useRef<number | null>(null);

  // Spawnea un ratón nuevo
  const spawnMouse = () => {
    setMousePos(getRandomPosition());
    setShowMouse(true);
  };

  // Inicia el juego: resetea y comienza a spawnear ratones cada 2s
  const startGame = () => {
    setScore(0);
    setGameState('playing');
    spawnMouse();
    intervalRef.current = window.setInterval(spawnMouse, 2000);
  };

  // Maneja click en el ratón: suma puntos y reposiciona inmediatamente
  const handleMouseClick = () => {
    setScore(prev => prev + 10);
    setShowMouse(false);
    spawnMouse();
  };

  // Termina el juego: limpia intervalo y oculta ratón
  const endGame = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowMouse(false);
    setGameState('end');
  };

  // Reinicia al estado inicial
  const restartGame = () => {
    setGameState('start');
  };

  // Al desmontar, limpiamos intervalos
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="game-page" style={{ position: 'relative', width: '500px', margin: 'auto' }}>
      {/* Pantalla de inicio */}
      {gameState === 'start' && (
        <>
          <h1>Catch the Mice</h1>
          <button onClick={startGame}>Start Game</button>
          <button className="gameBack-button" onClick={() => navigate('/games')}>
            ⬅ Go back
          </button>
        </>
      )}

      {/* Pantalla de juego */}
      {gameState === 'playing' && (
        <>
          <div className="score-board">
            <p>Puntuación: {score}</p>
          </div>
          <div
            className="game-area"
            style={{
              position: 'relative',
              width: '500px',
              height: '500px',
              border: '2px solid black',
              margin: '1rem 0'
            }}
          >
            {showMouse && (
              <Mouse onClick={handleMouseClick} position={mousePos} />
            )}
          </div>
          <button onClick={endGame}>End Game</button>
        </>
      )}

      {/* Pantalla de fin */}
      {gameState === 'end' && (
        <>
          <h2>Game Over!</h2>
          <p>Your score: {score}</p>
          <button onClick={restartGame}>Restart</button>
          <button className="gameBack-button" onClick={() => navigate('/games')}>
            ⬅ Go back
          </button>
        </>
      )}
    </div>
  );
};

export default CatchTheMiceGame;
