import React, { useState } from "react";


const Login = ( props ) => {

    const { email, setEmail, pass, setPass, toggleForm, handleUserLogin, user, setUser, setStreak} = props

  async function loginUser(email, password) {
    try {
      const response = await fetch(`http://localhost:8000/user/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        throw new Error('Error fetching user data');
      }
      
      const responseData = await response.json();
  
      if (responseData.success) {
        console.log('Login successful:', responseData);
        handleUserLogin(responseData.user);
        setStreak({ currentStreak: responseData.user.currentstreak, bestStreak: responseData.user.beststreak });
        // Handle success, e.g., navigate to another page, set user state, etc.
      } else {
        console.log('Login failed:', responseData.message);
        // Handle failure, e.g., show an error message, retry, etc.
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
      
      const handleLogin = (e) => {
        e.preventDefault();
        loginUser(email, pass);
        console.log(user)

      };

      const logout = () => {
        setUser('')
    }

      // if (responseData.success) {
      //   console.log('Login successful:', responseData.user);
        
      //   console.log(username)
      // } else {
      //   console.log('fuck')

      return (
        <>
          { user ? (
          <div className="logged">
            <p>
              logged in as <strong>{user.username}.</strong>
            </p>
            <button className="form-button" onClick={logout}>
              Logout
            </button>
          </div>
          ) : (
            <div className="login-form-container"> 
              <form className="login" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@email.com" id="email" name="email"></input>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password"></input>
                <button className="form-button">Log In</button>
                <button className="form-button" onClick={() => toggleForm('register')}>Dont have an account? Register here.</button>
              </form>
            </div>
            )}
        </>
      )
    }

export default Login

