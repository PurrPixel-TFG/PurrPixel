import React from "react";
import './Inicio.scss';
import { Link } from "react-router-dom";

const Inicio: React.FC = () => {

  return (
    <>
      <header className="container_cabecera">
        <h1 className="index_h1">PURR PIXEL</h1>
      
      </header>


      <main className="main_container"> 

  <Link to="/instrucciones" className="index_button_instrucciones">
    Instrucciones
    <span className="hoverEffect">
      <div></div>
    </span>
  </Link>


  <Link to="/login" className="index_button_entrar">
    Iniciar
    <span className="hoverEffect">
      <div></div>
    </span>
  </Link>

      </main>
    
    </>
  );
};

export default Inicio;