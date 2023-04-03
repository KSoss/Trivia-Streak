import React, { useState, useEffect, useMemo } from "react";


const QuizQuestion = ( props ) => {
  // Destructering to get values from front

  //User and trivia defragmented
  const { trivia, answered, setAnswered, user, setStreak, streak } = props

  //variables from trivia
  const { question, correct_answer, incorrect_answers } = trivia;

  //getting streak value from user 
  let updatedStreak = streak;

  //gathering my correct/incorrect answers into one array to map latter
  const answers = [correct_answer, ...incorrect_answers]

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


  async function streakUpdate(email) {
    try {
      const response = await fetch(`http://localhost:8000/user/update/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStreak)
      });
  
      if (!response.ok) {
        throw new Error('Error fetching user data');
       
      }
    } catch (error) {
      console.log(error)
    }
  }



  // correct/incorrect answer logic
  const handleAnswerClick = async (selectedAnswer) => {
    setAnswered(true)

    if (selectedAnswer === decodedCorrectAnswer) {
      console.log("Correct answer!");

      const updatedStreak = {
        currentStreak: streak.currentStreak + 1,
        bestStreak: Math.max(streak.currentStreak + 1, streak.bestStreak),
      };

      setStreak(updatedStreak)

    } else {
      console.log("Incorrect answer!");
      updatedStreak = {
        currentStreak: 0,
        bestStreak: streak.bestStreak,
      };
      setStreak(updatedStreak);
      console.log(updatedStreak)
    }
    
    await streakUpdate(user.email);
  };

  return (
    <>
      <p>{decodeQuestion}</p>
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