import React, { useState, useEffect, useMemo } from "react";


const QuizQuestion = ( props ) => {
  // Destructering to get values from front

  //User and trivia defragmented
  const { trivia, answered, setAnswered, setStreak, streak, setResponse, updateStreak, updateLeaderboard, loggedInfo } = props

  //variables from trivia
  const { question, correct_answer, incorrect_answers } = trivia;

  //gathering my correct/incorrect answers into one array to map latter
  const answers = [correct_answer, ...incorrect_answers]

  console.log(correct_answer)
  console.log(loggedInfo)

  // complicated function to fix my APIs text since it has some HTML codes to get around not having quotations.
  function decodeHtmlEntities(text) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(`<!doctype html><body>${text}`, "text/html");
    return dom.body.textContent;
  }

  // Maping my answers and running question through the decoder
  const decodeQuestion = decodeHtmlEntities(question);
  const decodedAnswers = useMemo(() => {
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
    return shuffledAnswers.map((answer) => decodeHtmlEntities(answer));
  }, [trivia]);
  const decodedCorrectAnswer = decodeHtmlEntities(correct_answer);

  // correct/incorrect answer logic
  const handleAnswerClick = async (selectedAnswer) => {
    setAnswered(true);
  
    if (selectedAnswer === decodedCorrectAnswer) {
      setResponse("Correct!");
      updateStreak(true);

      const newBestStreak = loggedInfo.streak[0] + 1;

      updateLeaderboard(newBestStreak)
    } else {
      setResponse(`Incorrect: it was ${correct_answer}`);
      updateStreak(false);
    }
  };

  return (
    <>
      <p className="question"
      >{decodeQuestion}</p>
      <div className="button-container">
        {decodedAnswers.map((answer, index) => (
          <button className='button' key={index} onClick={() => handleAnswerClick(answer)} disabled={answered}>
            {answer}
          </button>
          
        ))}
        
      </div>
    </>
  );
};

export default QuizQuestion;