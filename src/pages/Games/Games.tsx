import React, { useState, useEffect } from "react";
import './Games.scss';
import { Link, Outlet, useLocation } from "react-router-dom";

const Games: React.FC = () => {
  const location = useLocation();
  const isMainGamesPage = location.pathname === "/games";

  // Estado de monedas
  const [coins, setCoins] = useState(0);

  // Cargar monedas guardadas al inicio
  useEffect(() => {
    const savedCoins = localStorage.getItem('purrpixel-coins');
    if (savedCoins) {
      setCoins(Number(savedCoins));
    }
  }, []);

  // Guardar monedas cuando cambian
  useEffect(() => {
    localStorage.setItem('purrpixel-coins', coins.toString());
  }, [coins]);

  // Función para sumar monedas
  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

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

      {/* Pasamos coins y addCoins a los juegos vía Outlet context */}
      <Outlet context={{ coins, addCoins }} />
    </main>
  );
};

export default Games;
