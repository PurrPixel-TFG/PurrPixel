import React from "react";
import './Games.scss';
import { Link, Outlet, useLocation } from "react-router-dom";

const Games: React.FC = () => {
  const location = useLocation();
  const isMainGamesPage = location.pathname === "/games";

  return (
    <main className="games">
      {isMainGamesPage && (
        <>
          <h1 className="h1_games">Choose A Game To Play With Your PURR! ✨</h1>
          <div className="games-buttons">
            <Link to="jump"><button>Jump Jump!</button></Link>
            <Link to="catch"><button>Catch the mice.</button></Link>
            <Link to="quizz"><button>PURR Quizz!</button></Link>
          </div>
        </>
      )}

      <Outlet />
    </main>
  );
};

export default Games;

