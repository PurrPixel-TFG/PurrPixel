import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Catch.scss';

const getRandomPosition = () => ({
  top: Math.random() * 450,
  left: Math.random() * 450,
});

interface MouseProps {
  onClick: () => void;
  position: { top: number; left: number };
}

const Mouse: React.FC<MouseProps> = ({ onClick, position }) => (
  <div
    className="mouse"
    onClick={onClick}
    style={{
      position: 'absolute',
      width: '50px',
      height: '50px',
      background: 'gray',
      borderRadius: '50%',
      cursor: 'pointer',
      top: `${position.top}px`,
      left: `${position.left}px`
    }}
  />
);

const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <h2>{message}</h2>
      <button onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

const CatchTheMiceGame: React.FC = () => {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [mousePos, setMousePos] = useState(getRandomPosition());
  const [showMouse, setShowMouse] = useState(false);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [endMessage, setEndMessage] = useState('');

  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Solo resetea el timeout de 2.5s sin click
  const resetTimeout = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      endGame('Se acabó el tiempo');
    }, 2500);
  };

  // spawnea ratón SIN resetear timeout aquí
  const spawnMouse = () => {
    setMousePos(getRandomPosition());
    setShowMouse(true);
    // NO resetTimeout aquí
  };

  // Inicia el juego
  const startGame = () => {
    setScore(0);
    setEndMessage('');
    setGameState('playing');
    spawnMouse();
    resetTimeout(); // Empieza el timeout al iniciar el juego
    intervalRef.current = window.setInterval(() => {
      spawnMouse();
      // NO resetTimeout aquí, solo cambia el ratón
    }, 2000);
  };

  // Al hacer click: suma, oculta ratón, genera nuevo y RESETEA timeout
  const handleMouseClick = () => {
    setScore(prev => prev + 10);
    setShowMouse(false);
    spawnMouse();
    resetTimeout();  // ¡Aquí sí reseteamos el timeout!
  };

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

  const restartGame = () => {
    setGameState('start');
    setEndMessage('');
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="game-page" style={{ position: 'relative', width: '500px', margin: 'auto' }}>
      {gameState === 'start' && (
        <>
          <h1>Catch the Mice</h1>
          <button onClick={startGame}>Start Game</button>
          <button className="gameBack-button" onClick={() => navigate('/games')}>
            ⬅ Go back
          </button>
        </>
      )}

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
            {showMouse && <Mouse onClick={handleMouseClick} position={mousePos} />}
          </div>
          <button onClick={() => endGame()}>End Game</button>
        </>
      )}

      {gameState === 'end' && (
        <Modal
          message={endMessage || 'Fin del juego'}
          onClose={restartGame}
        />
      )}
    </div>
  );
};

export default CatchTheMiceGame;
