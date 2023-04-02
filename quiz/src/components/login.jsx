import React, { useState} from "react";


const Login = ( props ) => {

    const { email, setEmail, pass, setPass, toggleForm, handleUserLogin, user, setUser} = props

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

      // if (responseData.success) {
      //   console.log('Login successful:', responseData.user);
        
      //   console.log(username)
      // } else {
      //   console.log('fuck')

  return (
      <div className="form-container">
      <form onSubmit={handleLogin}>
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@email.com" id="email" name="email"></input>
          <label htmlFor="password">password</label>
          <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password"></input>
          <button>Log In</button>
      </form>
      <button onClick={() => toggleForm('register')}>Dont have an account? Register here.</button>
      </div>
  )
}

export default Login

