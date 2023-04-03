import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import UserInfo from "./userInfo"
import Streak from "./streak"
import Leaderboard from "./leaderboard";
import "./quiz.css"

const Front = () => {

    const [currentForm, setCurrentForm] = useState('login')
    const [user, setUser] = useState('')
    const [streak, setStreak] = useState({ currentStreak: 0, bestStreak: 0})


    return(
    <div>


      
      <UserInfo
      {...user}
        setStreak={setStreak}
        currentForm={currentForm}
        setCurrentForm={setCurrentForm}
        user={user}
        setUser={setUser}
      />

      {user ? ( 
        <Streak 
        user={user}
        streak={streak}
        />
      ) : (
        <></>
      )}

      <Quiz 
      user={user}
      setUser={setUser}
      streak={streak}
      setStreak={setStreak}
      /> 
      <Leaderboard />
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