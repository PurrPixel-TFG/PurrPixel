import React from "react";
import './Index.scss';
import { Link } from "react-router-dom";

const Index: React.FC = () => {

  return (
    <>
      <header className="container_header">
        <h1 className="index_h1">PURR PIXEL</h1>

      </header>


      <main className="main_container">
        <Link to="/instructions" className="index_button index_button_instructions">
          Instructions
          <span className="hoverEffect">
            <div></div>
          </span>
        </Link>

        <Link to="/login" className="index_button index_button_start">
          Start
          <span className="hoverEffect">
            <div></div>
          </span>
        </Link>
      </main>

    </>
  );
};

export default Index;