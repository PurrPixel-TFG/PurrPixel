import React from "react";
import './Juegos.scss';
import { Link } from "react-router-dom";

const Juegos: React.FC = () => {

  return (
    <main>
      <div className="main-page-buttons-fixed">
              <Link to="/ajustes" className="main-page-button">Ajustes</Link>
              <Link to="/perfil" className="main-page-button">Perfil</Link>
              <Link to="/tienda" className="main-page-button">Tienda</Link>
            </div>
    </main>
  );
};

export default Juegos;