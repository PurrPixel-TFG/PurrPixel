import React, { useState } from "react";
import './Quizz.scss';
import { questions } from "./questions";

const App: React.FC = () => {
  const [step, setStep] = useState(0); // 0 = inicio, 1-n = preguntas, n+1 = resultados
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[step - 1];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setStep(step + 1);
  };

  const startQuiz = () => {
    console.log("Iniciando el quiz...");
    setStep(1);
    setScore(0);
  };

  if (step === 0) {
    return (
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">¿Cuánto sabes sobre gatos?</h1>
        <button
          onClick={startQuiz}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Empezar el Quiz
        </button>
      </div>
    );
  }

  if (step > questions.length) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-bold mb-2">Resultado</h2>
        <p>
          Aciertos: {score} / {questions.length}
        </p>
        <p className="mt-2 italic">
          {score === questions.length
            ? "¡Eres un verdadero amante de los gatos! 😺"
            : score > 1
            ? "¡Buen trabajo! 🐾"
            : "¡A seguir aprendiendo sobre gatos! 🐱"}
        </p>
        <button
          onClick={startQuiz}
          className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
        >
          Volver a intentar
        </button>
      </div>
    );
  }

  const current = questions[step - 1];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">{current.question}</h2>
      <div className="grid gap-2">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="border border-purple-500 rounded px-4 py-2 hover:bg-purple-100"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
