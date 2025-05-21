import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Catch.scss';

import mouseGif from '../../assets/assets_games/mouse.gif';

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
    className="mouseCatch"
    onClick={onClick}
    style={{
      top: `${position.top}px`,
      left: `${position.left}px`,
    }}
  />
);

const Modal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <h2>{message}</h2>
      <button onClick={onClose}>Close</button>
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

  const resetTimeout = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      endGame('⏰ Time is up!');
    }, 2500);
  };

  const spawnMouse = () => {
    setMousePos(getRandomPosition());
    setShowMouse(true);
  };

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

  const handleMouseClick = () => {
    setScore(prev => {
      const newScore = prev + 10;
      if (newScore >= 100) {
        endGame('🎉 You reached the maximum points! You win 2 PurrPoints.');
      }
      return newScore;
    });
    setShowMouse(false);
    spawnMouse();
    resetTimeout();
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
    <div
      className={`CatchTheMiceContainer ${gameState === 'playing' ? 'no-background' : ''}`}
    >
      {gameState === 'start' && (
        <>
          <h1>Catch the Mice</h1>
          <button className="main-buttonCatch" onClick={startGame}>Start Game</button>
          <button className="gameBack-buttonCatch" onClick={() => navigate('/games')}>
            ⬅ Go back
          </button>
        </>
      )}

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

      {gameState === 'end' && (
        <Modal
          message={`${endMessage} \n\nYour final score: ${score}`}
          onClose={restartGame}
        />
      )}

      <p>Your last score: {score}</p>
    </div>
  );
};

export default CatchTheMiceGame;
