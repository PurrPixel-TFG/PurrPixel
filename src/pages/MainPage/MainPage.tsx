import React from "react";
import './MainPage.scss';
import { Link } from "react-router-dom";

const MainPage: React.FC = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>¡Selecciona tu Purr para iniciar!</h1>

      <div className="main-page-buttons-fixed">
        <Link to="/ajustes" className="main-page-button">Ajustes</Link>
        <Link to="/perfil" className="main-page-button">Perfil</Link>
        <Link to="/tienda" className="main-page-button">Tienda</Link>
        <Link to="/juegos" className="main-page-button">Juegos</Link>
      </div>

      <div className="container_gatos">
        <div className="gato_1">Gato 1</div>
        <div className="gato_2">Gato 2</div>
        <div className="gato_3">Gato 3</div>
        <div className="gato_4">Gato 4</div>
      </div>

      <div className="container_estado_gatos">
        <div className="estado_gato_1">Estado Gato 1</div>
        <div className="estado_gato_2">Estado Gato 2</div>
        <div className="estado_gato_3">Estado Gato 3</div>
        <div className="estado_gato_4">Estado Gato 4</div>
      </div>

    </>
  );
};

export default MainPage;
