import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useCoins } from '../../context/CoinsContext';
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
  const { addCoins } = useCoins();

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
      endGame('Timer is Over!');
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

  const handleMouseClick = async () => {
    const points = 10;
    const coins = 1;
    setScore(prev => prev + points);
    await addCoins(coins);
    setShowMouse(false);
    spawnMouse();
    resetTimeout();
  };

  const endGame = async (message: string = 'Game Over!') => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setShowMouse(false);
    
    // Award bonus coins based on final score
    const bonusCoins = Math.floor(score / 50); // 1 bonus coin for every 50 points
    if (bonusCoins > 0) {
      await addCoins(bonusCoins);
      setEndMessage(`${message}\nScore: ${score}\nBonus Coins: +${bonusCoins}`);
    } else {
      setEndMessage(`${message}\nScore: ${score}`);
    }
    
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
          <p className="game-instructions">
            Catch mice to earn coins! Each mouse is worth 1 coin.
            Get bonus coins for high scores!
          </p>
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
          message={endMessage}
          onClose={restartGame}
        />
      )}
    </div>
  );
};

export default CatchTheMiceGame;
