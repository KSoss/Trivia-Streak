import React from "react";

const Quiz = ({ question }) => {

    // Destructering to get values from front
    const { question: questionText, correct_answer, incorrect_answers } = question;

    // Sorting answers randomly
    const answers = [correct_answer, ...incorrect_answers].sort(() => Math.random() - 0.5);

    // complicated function to fix my APIs text since it has some HTML codes to get around not having quotations.
    function decodeHtmlEntities(text) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html');
        return dom.body.textContent;
      }

    // Maping my answers and running question through the decoder
    const decodeQuestion = decodeHtmlEntities(questionText)
    const decodedAnswers = answers.map((answer) => decodeHtmlEntities(answer));
    const decodedCorrectAnswer = decodeHtmlEntities(correct_answer)


    // correct/incorrect answer logic
    const handleAnswerClick = (selectedAnswer) => {
        if (selectedAnswer === decodedCorrectAnswer) {
          console.log("Correct answer!");
          // Handle correct answer (e.g., update the streak, load the next question, etc.)
        } else {
          console.log("Incorrect answer!");
          // Handle incorrect answer (e.g., reset the streak, load the next question, etc.)
        }
      };

    return (
        <div>
            <p>{decodeQuestion}</p>
            <div>
                {decodedAnswers.map((answer, index) => (
                    <button key={index} onClick={() => handleAnswerClick(answer)}>
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Quiz

