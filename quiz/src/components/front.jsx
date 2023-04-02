import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import UserInfo from "./userInfo"


const Front = () => {

    const [currentForm, setCurrentForm] = useState('login')
    const [user, setUser] = useState('')


    return(
    <div>
      <UserInfo
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        user={user}
        setUser={setUser}
      />

        
      <Quiz 
      user={user}
      setUser={setUser}
      /> 
        
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