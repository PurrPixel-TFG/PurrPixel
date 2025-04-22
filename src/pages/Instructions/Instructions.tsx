import React, { useState, useEffect } from "react";
import './Instructions.scss';
import { Link } from "react-router-dom";

const Instructions = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [animateAdvice, setAnimateAdvice] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateAdvice((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderInstructions = () => {
    switch (selectedGame) {
      case "jump":
        return (
          <p className="game_explanation">
            In this game, avoid obstacles!
            Press any key to jump. If you touch an obstacle, you lose a life. You have 3 chances to earn Purr Points.
          </p>
        );
      case "catch":
        return (
          <p className="game_explanation">
            In this game, you must crush the mice that appear on the screen. You have 15 seconds!
          </p>
        );
      case "quiz":
        return (
          <p className="game_explanation">
            Think you know everything about cats? Prove it! Answer the questions and see if you're a cat expert.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <main>
        <Link to="/index" className="index_h1">
          <h1>PURR PIXEL</h1>
        </Link>

        <div className="container_instructions">
          <h3 className={`advice`}>
            Let's start this adventure! 🐱 <br></br>

            You will have the opportunity to care for, feed, and play with your beloved pet. <br></br>

            ✨ You can... ✨ <br></br>
            ✅ Feed her her favorite foods to keep her healthy and happy. <br></br>
            ✅ Bathe and take care of your hygiene so that you always look radiant.<br></br>
            ✅ Play fun mini-games to earn points and rewards. <br></br>

            Are you ready for adventure? Start now and create an unbreakable bond with your new friend! 🐾💖
          </h3>

          <div className="game_buttons">
            <button onClick={() => setSelectedGame("jump")} className="game_button">
              Jump with your PURR
            </button>
            <button onClick={() => setSelectedGame("catch")} className="game_button">
              Catch with your PURR
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

export default Instructions;