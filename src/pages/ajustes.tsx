import React from "react";
import ThemeMode from "./ThemeMode";
import { Link } from "react-router-dom";

const Ajustes: React.FC = () => {
  return (
    <main>
      <div className="main-page-buttons-fixed">
        <Link to="/perfil" className="main-page-button">Perfil</Link>
        <Link to="/tienda" className="main-page-button">Tienda</Link>
        <Link to="/juegos" className="main-page-button">Juegos</Link>
      </div>

      <div className="container_ajustes">
        <ThemeMode /> {/* Ya no necesita props */}
        <div className="ticket">Enviar ticket</div>
      </div>
    </main>
  );
};

export default Ajustes;
