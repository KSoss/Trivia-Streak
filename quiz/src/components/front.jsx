import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import Form from "./form"


const Front = () => {

    const [question, setQuestion] = useState(null)
    const [answered, setAnswered] = useState(false);
    const [next, setNext] = useState(0)
    const [currentForm, setCurrentForm] = useState('login')


  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=15&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data.results[0]);
      });
  }, [next]);


  
    return(
    <div>
      <Form 
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
      />

        {question ? 
        <Quiz 
        question={question} 
        answered={answered}
        setAnswered={setAnswered}
        setNext={setNext}
        next={next}
        /> 
        : <p>Loading question...</p>}
    </div>
    )
}

export default Front

// {"response_code":0,
// "results":[
//     {"category":"Entertainment: Video Games",
//     "type":"multiple",
//     "difficulty":"easy",
//     "question":"Which franchise does the creature &quot;Slowpoke&quot; originate from?",
//     "correct_answer":"Pokemon",
//     "incorrect_answers":["Dragon Ball","Sonic The Hedgehog","Yugioh"]
// }]}