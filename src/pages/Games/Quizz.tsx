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
Esta función es el componente principal de la aplicación.
Maneja el estado del cuestionario, incluyendo la pregunta actual y la puntuación.
Muestra la pantalla de inicio, las preguntas y los resultados.
El estado se gestiona con useState, que permite actualizar el estado de la aplicación.
*/


/* ... tu función getResultMessage y questions siguen igual ... */

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

  // Botón para regresar a la pantalla principal de juegos
  const BackToGamesButton = () => (
    <button onClick={() => navigate("/games")}>
      ← Go back
    </button>
  );

  // Pantalla de inicio
  if (step === 0) {
    return (
      <div className="text-center p-6">
        <BackToGamesButton />
        <h1 className="text-2xl font-bold mb-4">¿How much do you know about cats?</h1>
        <button
          onClick={startQuiz}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Pantalla de resultados
  if (step > questions.length) {
    return (
      <div className="text-center p-6">
        <BackToGamesButton />
        <h2 className="text-xl font-bold mb-2">Resultado</h2>
        <p>
          Aciertos: {score} / {questions.length}
        </p>
        <p className="mt-2 italic">
          {getResultMessage(score, questions.length)}
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

  // Pantalla de pregunta actual
  const current = questions[step - 1];

  return (
    <div className="p-6">
      <BackToGamesButton />
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


/*
Este archivo contiene un array de objetos que representan preguntas y respuestas para el quizz de gatos.
Cada objeto tiene un id, una pregunta, un array de opciones y la respuesta correcta.
El array se utiliza para mostrar preguntas en el cuestionario, y cada pregunta tiene varias opciones de respuesta.
El array de preguntas se importa y utiliza en Quizz.tsx para crear un juego interactivo.

*/
export const questions = [
  {
    id: 1,
    question: "How many hours does a cat sleep per day?",
    options: ["4-6", "12-16", "18-20", "22-24"],
    correctAnswer: "12-16",
  },
  {
    id: 2,
    question: "What does it mean when a cat kneads with its paws?",
    options: [
      "It is hunting",
      "It is angry",
      "It is comfortable and happy",
      "It is hungry",
    ],
    correctAnswer: "It is comfortable and happy",
  },
  {
    id: 3,
    question: "What is the name of the sound cats make when they are happy?",
    options: ["Meow", "Purr", "Scream", "Howl"],
    correctAnswer: "Purr",
  },
  {
    id: 4,
    question: "What should an adult cat drink?",
    options: ["Water", "Milk", "Juice", "Beer"],
    correctAnswer: "Water",
  },
  {
    id: 5,
    question: "Which taste can cats NOT perceive?",
    options: ["Salty", "Bitter", "Sour", "Sweet"],
    correctAnswer: "Sweet",
  },
  {
    id: 6,
    question: "How many teeth does an adult cat have?",
    options: ["20", "24", "30", "32"],
    correctAnswer: "30",
  },
  {
    id: 7,
    question: "Which part of a cat's body is the most sensitive?",
    options: ["Paws", "Nose", "Ears", "Tail"],
    correctAnswer: "Nose",
  },
  {
    id: 9,
    question: "How many sounds can a cat make to communicate?",
    options: ["Up to 50", "Up to 100", "Up to 10", "Up to 1000"],
    correctAnswer: "Up to 100",
  },
  {
    id: 10,
    question: "How many bones does a cat have?",
    options: ["30", "170", "More than 700", "Around 230"],
    correctAnswer: "Around 230",
  },
  {
    id: 11,
    question: "Which color can't cats see?",
    options: ["Red", "Green", "Blue", "Yellow"],
    correctAnswer: "Red",
  },
  {
    id: 12,
    question: "Why do cats only like moving water?",
    options: ["For hygiene", "Because it's fun", "Because they're thirsty", "Because it's fresh"],
    correctAnswer: "For hygiene",
  },
  {
    id: 13,
    question: "What does it mean when a cat shows its belly?",
    options: ["It trusts you", "It's ready for anything", "It's scared", "Its back itches"],
    correctAnswer: "It trusts you",
  },
];



export default App;
