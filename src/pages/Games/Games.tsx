import React from "react";
import './Games.scss';
import { Link, Outlet } from "react-router-dom";

const Games: React.FC = () => {
  return (
    <main className="games">
      <h1 className="h1_games">Choose A Game To Play With Your PURR! ✨</h1>
      
      <div className="games-buttons">
        {/* Botones para cada juego */}
        <Link to="jump">
          <button>Jump Jump!</button>
        </Link>
        <Link to="catch">
          <button>Catch the mice.</button>
        </Link>
        <Link to="quizz">
          <button>PURR Quizz!</button>
        </Link>
      </div>
    </main>
  );
};

export default Games;

