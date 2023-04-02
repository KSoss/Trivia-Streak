import React, { useState, useEffect } from "react";

const QuizQuestion = ( props ) => {
  // Destructering to get values from front

  const { trivia, answered, setAnswered } = props
  const { question, correct_answer, incorrect_answers } = trivia;

  // Sorting answers randomly
  const answers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);

  // complicated function to fix my APIs text since it has some HTML codes to get around not having quotations.
  function decodeHtmlEntities(text) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(`<!doctype html><body>${text}`, "text/html");
    return dom.body.textContent;
  }

  // Maping my answers and running question through the decoder
  const decodeQuestion = decodeHtmlEntities(question);
  const decodedAnswers = answers.map((answer) => decodeHtmlEntities(answer));
  const decodedCorrectAnswer = decodeHtmlEntities(correct_answer);

  // correct/incorrect answer logic
  const handleAnswerClick = (selectedAnswer) => {
    setAnswered(true);
    if (selectedAnswer === decodedCorrectAnswer) {
      console.log("Correct answer!");

    } else {
      console.log("Incorrect answer!");

    }
  };

  return (
    <>
      <p>{decodeQuestion}</p>
      <div>
        {decodedAnswers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswerClick(answer)} disabled={answered}>
            {answer}
          </button>
          
        ))}
        
      </div>
    </>
  );
};

export default QuizQuestion;