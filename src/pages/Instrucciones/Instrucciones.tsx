import React, { useState, useEffect } from "react";
import './Instrucciones.scss';
import { Link } from "react-router-dom"; // Asegúrate de importar Link

const Instrucciones = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [animateConsejo, setAnimateConsejo] = useState(false);

  useEffect(() => { 
    const interval = setInterval(() => {
      setAnimateConsejo((prev) => !prev);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const renderInstructions = () => {
    switch (selectedGame) {
      case "saltar":
        return (
          <p className="parrafo_explicación">
            En este juego, ¡esquiva los obstáculos!
            Pulsa cualquier tecla para saltar. Si tocas un obstáculo, perderás una vida. Tienes 3 oportunidades para ganar Purr Points.
          </p>
        );
      case "encontrar":
        return (
          <p className="parrafo_explicación">
            En este juego deberás usar tu linterna para encontrar a los Purr escondidos en la oscuridad. ¡Tienes 15 segundos!
          </p>
        );
      case "quiz":
        return (
          <p className="parrafo_explicación">
            ¿Crees que sabes todo sobre gatos? ¡Demuéstralo! Responde a las preguntas y comprueba si eres un experto en gatos.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <main>
      <Link to="/inicio" className="index_h1">
         <h1>PURR PIXEL</h1>
       </Link>

        <div className="container_instrucciones">
          <h3 className={`consejo`}>
          ¡Empieza esta aventura! 🐱 <br></br>

Tendrás la oportunidad de cuidar, alimentar y jugar con tu adorada mascota. <br></br>

✨ ¿Qué puedes hacer? ✨ <br></br>
✅ Dale de comer sus platillos favoritos para mantenerla sana y feliz. <br></br> 
✅ Baña y cuida su higiene para que siempre esté radiante.<br></br>
✅ Juega divertidos minijuegos para ganar puntos y recompensas. <br></br>

¿Estás listo para la aventura? ¡Empieza ahora y crea un lazo inquebrantable con tu nuevo amigo! 🐾💖
          </h3>
          
          <div className="game_buttons">
            <button onClick={() => setSelectedGame("saltar")} className="game_button">
              Salta con tu PURR
            </button>
            <button onClick={() => setSelectedGame("encontrar")} className="game_button">
              Encuentra tu PURR
            </button>
            <button onClick={() => setSelectedGame("quiz")} className="game_button">
              PURR-Quiz!
            </button>
          </div>
          {selectedGame && (
            <div className="instructions_display">{renderInstructions()}</div>
          )}
        </div>
      </main>
    </>
  );
};

export default Instrucciones;