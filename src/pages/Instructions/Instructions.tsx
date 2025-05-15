import React, { useState, useEffect } from "react";
import './Instructions.scss';
import { useNavigate } from "react-router-dom";



const Instructions = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [animateAdvice, setAnimateAdvice] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // Nuevo estado para controlar la redirección
  const navigate = useNavigate();



  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateAdvice((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  const handleQuizButtonClick = () => {
    setSelectedGame("quiz"); // Mostramos las instrucciones del quiz
    setIsRedirecting(true); // Cambiamos el estado a true para indicar que vamos a redirigir



    // Después de 3 segundos, redirigimos al usuario a la ruta /Quiz
    setTimeout(() => {
      navigate("/Quizz");
    }, 3000); // Tiempo de espera antes de redirigir (3 segundos)
  };



  const renderInstructions = () => {
    switch (selectedGame) {
      case "jump":
        return (
          <p className="game_explanation">
            In this game, avoid obstacles! Press any key to jump...
          </p>
        );
      case "catch":
        return (
          <p className="game_explanation">
            In this game, you must crush the mice that appear...
          </p>
        );
      case "quiz":
        return (
          <div>
            <p className="game_explanation">
              Are you ready to test your knowledge of cats? 🐱
              Get ready for the PURR-Quiz! The quiz will start shortly.
            </p>
            {isRedirecting && (
              <p className="redirecting-message">Redirecting you to the quiz...</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };



  return (
    <main>
      <div className="container_instructions">
        <h3 className={`advice`}>
          Let's start this adventure! 🐱 <br></br>
          You will have the opportunity to care for, feed, and play with your beloved pet.
          <br></br> ✨ You can... ✨ <br></br>
          ✅ Feed her her favorite foods to keep her healthy and happy.
          <br></br>
          ✅ Bathe and take care of your hygiene so that you always look radiant.
          <br></br>
          ✅ Play fun mini-games to earn points and rewards.
          <br></br>
          Are you ready for adventure? Start now and create an unbreakable bond with your new friend! 🐾💖
        </h3>



        <div className="game_buttons_instructions">
          <button onClick={() => setSelectedGame("jump")} className="game_button_instructions">
            Jump with your PURR
          </button>
          <button onClick={() => setSelectedGame("catch")} className="game_button_instructions">
            Catch with your PURR
          </button>
          <button onClick={handleQuizButtonClick} className="game_button_instructions">
            PURR-Quiz!
          </button>
        </div>



        {selectedGame && (
          <div className="instructions_display">{renderInstructions()}</div>
        )}
      </div>
    </main>
  );
};



export default Instructions;