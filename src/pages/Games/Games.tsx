import React from "react";
import './Games.scss';
import { Link } from "react-router-dom";

const Games: React.FC = () => {

  return (
    <main>
      <div className="main-page-buttons-fixed">
              <Link to="/settings" className="main-page-button">Settings</Link>
              <Link to="/profile" className="main-page-button">Profile</Link>
              <Link to="/store" className="main-page-button">Store</Link>
              <Link to="/home-page" className="main-page-button">PRUEBAS</Link>
            </div>
    </main>
  );
};

export default Games;