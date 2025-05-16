import React, { useState } from "react";
import './Quizz.scss';


/* 
Función que devuelve el mensaje de resultado según la puntuación obtenida y el total de preguntas.
Dependiendo de la puntuación, se devuelve un mensaje diferente.
*/
function getResultMessage(score: number, total: number): string {
  if (score === 0) {
    return "Si te ponen un gato delante y un elefante no los diferencias. ¡Sigue intentándolo!";
  } else if (score < total / 2) {
    return "¡No está mal! Pero puedes mejorar. ¡Sigue aprendiendo sobre gatos!";
  } else if (score === Math.floor(total / 2)) {
    return "¡Aprobado raspado! ¡Sigue aprendiendo sobre gatos!";
  } else if (score < total) {
    return "¡Controlas bastante de gatos! ¡Muy bien!";
  } else {
    return "¡Eres un verdadero amante de los gatos! ¡Increíble!";
  }
}
/*
Esta función es el componente principal de la aplicación.
Maneja el estado del cuestionario, incluyendo la pregunta actual y la puntuación.
Muestra la pantalla de inicio, las preguntas y los resultados.
El estado se gestiona con useState, que permite actualizar el estado de la aplicación.
*/
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
    setStep(1);
    setScore(0);
  };

  // Pantalla de inicio
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

  // Pantalla de resultados
  if (step > questions.length) {
    return (
      <div className="text-center p-6">
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
    question: "¿Cuántas horas duerme un gato al día?",
    options: ["4-6", "12-16", "18-20", "22-24"],
    correctAnswer: "12-16",
  },
  {
    id: 2,
    question: "¿Qué significa cuando un gato amasa con sus patas?",
    options: [
      "Está cazando",
      "Está enfadado",
      "Está cómodo y feliz",
      "Tiene hambre",
    ],
    correctAnswer: "Está cómodo y feliz",
  },
  {
    id: 3,
    question: "¿Cómo se llama el sonido que hacen los gatos al estar contentos?",
    options: ["Maullido", "Ronroneo", "Chillido", "Aullido"],
    correctAnswer: "Ronroneo",
  },
  {
    id: 4,
    question: "¿Qué debe beber un gato adulto?",
    options: ["Agua", "Leche", "Zumo", "Cerveza"],
    correctAnswer: "Agua",
  },
    {
    id: 5,
    question: "Qué sabor NO perciben los gatos?",
    options: ["Salado", "Amargo", "Ácido", "Dulce"],
    correctAnswer: "Dulce",
  },
  {
    id: 6,
    question: "¿Cuántos dientes tiene un gato adulto?",
    options: ["20", "24", "30", "32"],
    correctAnswer: "30",
  },
  {
    id: 7,
    question: "¿Qué parte del cuerpo de un gato es más sensible?",
    options: ["Patas", "Nariz", "Orejas", "Cola"],
    correctAnswer: "Nariz",
  },
  {
    id: 9,
    question: "¿Cuántos sonidos puede emitir un gato para comunicarse?",
    options: ["Hasta 50", "Hasta 100", "Hasta 10", "Hasta 1000"],
    correctAnswer: "Hasta 100",
  },
    {
    id: 10,
    question: "¿Cuántos huesos tiene un gato?",
    options: ["30", "170", "Más de 700", "Alrededor de 230"],
    correctAnswer: "Alrededor de 230",
  },
  {
    id: 11,
    question: "¿Qué color no pueden ver los gatos?",
    options: ["Rojo", "Verde", "Azul", "Amarillo"],
    correctAnswer: "Rojo",
  },
  {
    id: 12,
    question: "¿Por qué a los gatos sólo les gusta el agua que se mueve?",
    options: ["Por higiene", "Porque les divierte", "Porque tienen sed", "Porque está fresquita"],
    correctAnswer: "Por higiene",
  },
    {
    id: 13,
    question: "¿Qué significa que un gato se ponga panza arriba?",
    options: ["Que confía en ti", "Que está preparado para todo", "Que tiene miedo", "Que le pica la espalda"],
    correctAnswer: "Que confía en ti",
  },
];



export default App;
