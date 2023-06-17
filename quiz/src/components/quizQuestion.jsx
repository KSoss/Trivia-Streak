import React, { useMemo } from "react";

const QuizQuestion = (props) => {
  // Destructuring to get values from front

  // User and trivia destructured
  const { trivia, answered, setAnswered, setResponse, updateStreak, updateLeaderboard, loggedInfo } = props

  // Variables from trivia
  const { question, correct_answer, incorrect_answers } = trivia;

  // Function to decode HTML entities from the API's text 
  function decodeHtmlEntities(text) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(`<!doctype html><body>${text}`, "text/html");
    return dom.body.textContent;
  }

  // Mapping answers and decoding the question
  const decodeQuestion = decodeHtmlEntities(question);
  
  const decodedAnswers = useMemo(() => {
    const answers = [correct_answer, ...incorrect_answers];
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
    return shuffledAnswers.map((answer) => decodeHtmlEntities(answer));
  }, [correct_answer, incorrect_answers]);

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
