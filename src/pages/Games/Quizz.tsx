import React, { useState } from "react";
import './Quizz.scss';
import { useNavigate } from "react-router-dom";

/* 
Función que devuelve el mensaje de resultado según la puntuación obtenida y el total de preguntas.
Dependiendo de la puntuación, se devuelve un mensaje diferente.
*/
function getResultMessage(score: number, total: number): string {
  if (score === 0) {
    return "If you're faced with a cat and an elephant, you can't tell them apart. Keep trying!";
  } else if (score < total / 2) {
    return "Not bad! But you can improve. Keep learning about cats!";
  } else if (score === Math.floor(total / 2)) {
    return "Barely passed! Keep learning about cats!";
  } else if (score < total) {
    return "You know quite a bit about cats! Very good!";
  } else {
    return "You're a true cat lover! Amazing!";
  }
}

/*
Esta constante contiene un array de objetos que representan preguntas y respuestas para el quizz de gatos.
Cada objeto tiene un id, una pregunta, un array de opciones y la respuesta correcta.
El array se utiliza para mostrar preguntas en el cuestionario, y cada pregunta tiene varias opciones de respuesta.
El array de preguntas se importa y utiliza en Quizz.tsx para crear un juego interactivo.

*/

export const questions = [
  { id: 1, question: "How many hours does a cat sleep per day?", options: ["4-6", "12-16", "18-20", "22-24"], correctAnswer: "12-16" },
  { id: 2, question: "What does it mean when a cat kneads with its paws?", options: ["It is hunting", "It is angry", "It is comfortable and happy", "It is hungry"], correctAnswer: "It is comfortable and happy" },
  { id: 3, question: "What is the name of the sound cats make when they are happy?", options: ["Meow", "Purr", "Scream", "Howl"], correctAnswer: "Purr" },
  { id: 4, question: "What should an adult cat drink?", options: ["Water", "Milk", "Juice", "Beer"], correctAnswer: "Water" },
  { id: 5, question: "Which taste can cats NOT perceive?", options: ["Salty", "Bitter", "Sour", "Sweet"], correctAnswer: "Sweet" },
  { id: 6, question: "How many teeth does an adult cat have?", options: ["20", "24", "30", "32"], correctAnswer: "30" },
  { id: 7, question: "Which part of a cat's body is the most sensitive?", options: ["Paws", "Nose", "Ears", "Tail"], correctAnswer: "Nose" },
  { id: 9, question: "How many sounds can a cat make to communicate?", options: ["Up to 50", "Up to 100", "Up to 10", "Up to 1000"], correctAnswer: "Up to 100" },
  { id: 10, question: "How many bones does a cat have?", options: ["30", "170", "More than 700", "Around 230"], correctAnswer: "Around 230" },
  { id: 11, question: "Which color can't cats see?", options: ["Red", "Green", "Blue", "Yellow"], correctAnswer: "Red" },
  { id: 12, question: "Why do cats only like moving water?", options: ["For hygiene", "Because it's fun", "Because they're thirsty", "Because it's fresh"], correctAnswer: "For hygiene" },
  { id: 13, question: "What does it mean when a cat shows its belly?", options: ["It trusts you", "It's ready for anything", "It's scared", "Its back itches"], correctAnswer: "It trusts you" },
];

const App: React.FC = () => {

//Estado que representa el paso actual del cuestionario
  const [step, setStep] = useState(0); // 0 = inicio, 1-n = preguntas, n+1 = resultados
  //// Estado para llevar el control de puntuación
  const [score, setScore] = useState(0);
  // Hook para navegar entre rutas
  const navigate = useNavigate();
  // Maneja la selección de una respuesta
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[step - 1];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setStep(step + 1);
  };
// Inicia el  quizz desde el paso 1, con puntuación 0.
  const startQuiz = () => {
    setStep(1);
    setScore(0);
  };
// Permite retroceder a la pregunta anterior restando 1 al step
  const goToPreviousQuestion = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
// Permite avanzar (saltar) a la siguiente pregunta
  const goToNextQuestion = () => {
    if (step < questions.length) {
      setStep(step + 1);
    }
  };
// Reinicia el quiz desde la primera pregunta.
  const restartQuiz = () => {
    setStep(1);
    setScore(0);
  };
// Botón para volver a la página de selección de juego (games)
  const BackToGamesButton = () => (
    <button onClick={() => navigate("/games")} className="gameBack-buttonCatch">
      ← Go back
    </button>
  );
// Barra de progreso visual del cuestionario (comentario extenso en el scss)
// Calcula el progreso en base al número de preguntas respondidas
// step - 1 porque step=1 es la primera pregunta, entonces 0% de progreso
  const ProgressBar = () => {
    const progress = ((step - 1) / questions.length) * 100;
    return (
      <div className="progress-bar">
        {/* Esta barra representa el porcentaje completado */}
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  // Pantalla de inicio
  // Se muestra antes de comenzar el cuestionario
  if (step === 0) {
    return (
      <div id="Quizzbody">
        <div className="QuizzContainer">
          <BackToGamesButton />
          <h1>How much do you know about cats?</h1>
          <button onClick={startQuiz} className="main-page-buttonQuizz">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  // Se muestra cuando se han respondido todas las preguntas
  if (step > questions.length) {
    return (
      <div id="Quizzbody">
        <div className="QuizzContainer">
          <BackToGamesButton />
          <h2>Score</h2>
          <p>Successes: {score} / {questions.length}</p>
          <p className="italic">{getResultMessage(score, questions.length)}</p>
          <button onClick={startQuiz} className="main-page-buttonQuizz">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de preguntas
  // Incluye la pregunta, opciones de respuesta, barra de progreso y navegación
  const current = questions[step - 1];
  return (
    <div id="Quizzbody">
      <div className="QuizzContainer">
        <BackToGamesButton />
        <h2>{current.question}</h2>
        <div className="options-grid">
          {current.options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)} className="main-page-buttonQuizz">
              {option}
            </button>
          ))}
        </div>
        <ProgressBar />
        <div className="main-page-buttons-fixed">
          {/* Botón para retroceder a la pregunta anterior */}
          {step > 1 && (
            <button onClick={goToPreviousQuestion} className="prev-btn">
              ← Previous
            </button>
          )}
          {/* Botón para avanzar a la siguiente pregunta */}
          {step < questions.length && (
            <button onClick={goToNextQuestion} className="nxt-btn">
              Next →
            </button>
          )}
          {/* Botón para reiniciar el cuestionario desde la primera pregunta */}
          <button onClick={restartQuiz} className="main-page-buttonQuizz">
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
