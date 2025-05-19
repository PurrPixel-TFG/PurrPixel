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
  const [step, setStep] = useState(0); // 0 = inicio, 1-n = preguntas, n+1 = resultados
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[step - 1];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setStep(step + 1);
  };

  const startQuiz = () => {
    setStep(1);
    setScore(0);
  };

  const goToPreviousQuestion = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const goToNextQuestion = () => {
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const restartQuiz = () => {
    setStep(1);
    setScore(0);
  };

  const BackToGamesButton = () => (
    <button onClick={() => navigate("/games")} className="gameBack-button">
      ← Go back
    </button>
  );

  const ProgressBar = () => {
    const progress = ((step - 1) / questions.length) * 100;
    return (
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    );
  };

  // Pantalla de inicio
  if (step === 0) {
    return (
      <div id="Quizzbody">
        <div className="QuizzContainer">
          <BackToGamesButton />
          <h1>How much do you know about cats?</h1>
          <button onClick={startQuiz} className="main-page-button">
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de resultados
  if (step > questions.length) {
    return (
      <div id="Quizzbody">
        <div className="QuizzContainer">
          <BackToGamesButton />
          <h2>Score</h2>
          <p>Successes: {score} / {questions.length}</p>
          <p className="italic">{getResultMessage(score, questions.length)}</p>
          <button onClick={startQuiz} className="main-page-button">
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de preguntas
  const current = questions[step - 1];
  return (
    <div id="Quizzbody">
      <div className="QuizzContainer">
        <BackToGamesButton />
        <h2>{current.question}</h2>
        <div className="options-grid">
          {current.options.map((option) => (
            <button key={option} onClick={() => handleAnswer(option)} className="main-page-button">
              {option}
            </button>
          ))}
        </div>
        <ProgressBar />
        <div className="main-page-buttons-fixed">
          {step > 1 && (
            <button onClick={goToPreviousQuestion} className="prev-btn">
              ← Previous
            </button>
          )}
          {step < questions.length && (
            <button onClick={goToNextQuestion} className="nxt-btn">
              Next →
            </button>
          )}
          <button onClick={restartQuiz} className="main-page-button">
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
