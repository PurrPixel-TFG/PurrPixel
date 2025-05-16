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
