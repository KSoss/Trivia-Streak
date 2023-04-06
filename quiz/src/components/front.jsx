import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import Streak from "./streak"

import Register from "./register"
import Login from "./login"

const Front = () => {

  const [currentForm, setCurrentForm] = useState('login')
  const [user, setUser] = useState('')
  const [streak, setStreak] = useState({ currentStreak: 0, bestStreak: 0})
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  console.log('I believe in you')
  const test = 1

  const handleUserLogin = (userData) => {
    setUser(userData);
    setCurrentForm('login')
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  };

  const toggleForm = (formname) => {
    setCurrentForm(formname)
  };

  return (
    <div>
      {currentForm === "register" ? (
        <Register
          handleUserLogin={handleUserLogin}    
          user={user}
          setUser={setUser}
          toggleForm={toggleForm}
          email={email}
          setEmail={setEmail}
          pass={pass}
          setPass={setPass}
          handleSubmit={handleSubmit}
        />
      ) : (
        <div>
          <div className="login-container">
            <Login
              {...user}
              setStreak={setStreak}
              currentForm={currentForm}
              setCurrentForm={setCurrentForm}
              toggleForm={toggleForm}
              user={user}
              setUser={setUser}
              email={email}
              setEmail={setEmail}
              handleUserLogin={handleUserLogin}
              pass={pass}
              setPass={setPass}
           />
          </div>
          <div className="streak-container">
            {user && (
              <Streak 
                user={user}
                streak={streak}
            />
          )}
          </div>
        <div className="quiz-container">
          <Quiz 
            user={user}
            setUser={setUser}
            streak={streak}
            setStreak={setStreak}
          />
       </div>
      </div>
      )}
    </div>
  );
};

export default Front;