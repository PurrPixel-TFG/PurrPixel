/*
 Importación de hooks de react y o¡tras dependencias necesarias.
 */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Catch.scss';
//Imagen del ratón.
import mouseGif from '../../assets/assets_games/mouse.gif';
// Función para obtener una posición aleatoria dentro del área de juego.
const getRandomPosition = () => ({
  top: Math.random() * 450,
  left: Math.random() * 450,
});
// Tipado para el componente Mouse
interface MouseProps {
  /*
  Se ejecuta al hacer clic en el ratón.
  */ 
  onClick: () => void;
  position: { top: number; left: number };
}
// Componente que representa el ratón en el juego.
const Mouse: React.FC<MouseProps> = ({ onClick, position }) => (
  <div
    className="mouseCatch"
    onClick={onClick}
    style={{
      top: `${position.top}px`,
      left: `${position.left}px`,
    }}
  />
);
// Componente modal que muestra un mensaje al final del juego.
const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <h2>{message}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);
// Componente principal del juego.
const CatchTheMiceGame: React.FC = () => {
  const navigate = useNavigate();

  // Estados del juego.
  const [score, setScore] = useState(0); // puntuación del jugador
  const [mousePos, setMousePos] = useState(getRandomPosition()); // posición del ratón
  const [showMouse, setShowMouse] = useState(false); // visibilidad del ratón
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start'); // estado actual del juego
  const [endMessage, setEndMessage] = useState(''); // mensaje final

  // Referencias a intervalos/tiempos para limpiarlos cuando sea necesario
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

// Reinicia el temporizador para finalizar el juego si no se atrapa el ratón a tiempo
  const resetTimeout = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      endGame('Time is up!');
    }, 2500);
  };

// Muestra el ratón en una nueva posición aleatoria
  const spawnMouse = () => {
    setMousePos(getRandomPosition());
    setShowMouse(true);
  };

  // Inicia el juego: reinicia valores y comienza los intervalos
  const startGame = () => {
    setScore(0);
    setEndMessage('');
    setGameState('playing');
    spawnMouse();
    resetTimeout();
    intervalRef.current = window.setInterval(() => {
      spawnMouse();
    }, 2000);
  };

// Maneja el clic sobre el ratón
  const handleMouseClick = () => {
    setScore(prev => {
      const newScore = prev + 10;
      // Si se alcanzan 100 puntos, finaliza el juego
      if (newScore >= 100) {
        endGame('You reached the maximum points! You win 2 PurrPoints.');
      }
      return newScore;
    });
    setShowMouse(false);
    spawnMouse();
    resetTimeout();
  };

  // Finaliza el juego: limpia intervalos y muestra mensaje final
  const endGame = (message: string = 'Game Over!') => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowMouse(false);
    setEndMessage(message);
    setGameState('end');
  };

// Reinicia el estado inicial del juego.
  const restartGame = () => {
    setGameState('start');
    setEndMessage('');
  };
// Limpia intervalos cuando se desmonta el componente.
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`CatchTheMiceContainer ${gameState === 'playing' ? 'no-background' : ''}`}
    >
      {/* Pantalla inicial */}
      {gameState === 'start' && (
        <>
          <h1>Catch the Mice</h1>
          <button className="main-buttonCatch" onClick={startGame}>Start Game</button>
          <button className="gameBack-buttonCatch" onClick={() => navigate('/games')}>
            ⬅ Go back
          </button>
        </>
      )}
{/* Pantalla del juego en acción */}
      {gameState === 'playing' && (
        <>
          <div className="score-board">
            <p>Score: {score}</p>
          </div>
          <div className="game-areaCatch">
            {showMouse && <Mouse onClick={handleMouseClick} position={mousePos} />}
          </div>
          <button className="main-buttonCatch" onClick={() => endGame()}>End Game</button>
        </>
      )}
{/* Pantalla final del juego */}
      {gameState === 'end' && (
        <Modal
          message={`${endMessage} \n\nYour final score: ${score}`}
          onClose={restartGame}
        />
      )}
{/* Muestra la puntuación al final del componente */}
      <p>Your last score: {score}</p>
    </div>
  );
};

export default CatchTheMiceGame;
