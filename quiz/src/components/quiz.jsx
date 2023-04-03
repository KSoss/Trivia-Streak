import React, { useState, useEffect } from "react";
import QuizQuestion from "./quizQuestion";


const Quiz = (props) => {
  const [trivia, setTrivia] = useState(null);
  const [next, setNext] = useState(0);
  const [answered, setAnswered] = useState(false)

  const {user, streak, setStreak} = props 

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=15&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setTrivia(data.results[0]);
      });
  }, [next]);


  const handleNextQuestion = () => {
    setNext((prevNext) => prevNext + 1);
    setAnswered(false);
  };


  return (
    <div>
      {trivia ? (
        <div
        className="quiz">
          <QuizQuestion
            trivia={trivia}
            answered={answered}
            setAnswered={setAnswered}
            user={user}
            streak={streak}
            setStreak={setStreak}
          />
          {answered && <button className='button' onClick={handleNextQuestion}>Next Question</button>}
        </div>
      ) : (
        <p className="loading">Loading question...</p>
      )}
    </div>
  );
};

export default Quiz;
