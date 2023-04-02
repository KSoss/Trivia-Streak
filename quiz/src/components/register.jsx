import React, { useState} from "react";
import Form from "./form"

const Register = ( props ) => {

    const { email, setEmail, pass, setPass, username, setUsername } = props


    const postUser = async (url = 'http://localhost:8000/add', data = {}) => {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (!response.ok) {
            throw new Error('Unable to add new user.');
          }
      
          const jsonResponse = await response.json();
          return jsonResponse;
        } catch (error) {
          console.error('There was a problem adding your username:', error);
        }
      };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const data = {
          username: username,
          email: email,
          password: pass
        };
      
        const response = await postUser('http://localhost:8000/add', data);
      
        if (response) {
          console.log('Registration successful:', response);
          // Handle success, e.g., navigate to another page, show a success message, etc.
        } else {
          console.error('Registration failed');
          // Handle error, e.g., show an error message, retry, etc.
        }
      };  


    return (
        <div className = "form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="newUsername">username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="YourEmail@email.com" id="newUsername" name="username"></input>
            <label htmlFor="newEmail">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@email.com" id="newEmail" name="newEmail"></input>
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="newPassword" name="password"></input>
            <button>Register</button>
        </form>
        </div>
    )
}

export default Register