import React, { useState} from "react";

const Register = ( props ) => {

    const { email, setEmail, pass, setPass, handleUserLogin, user } = props

    const [username, setUsername] = useState('')


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
        console.log(username)
        const data = {
          username: username,
          email: email,
          password: pass
        };
      
        const response = await postUser('http://localhost:8000/add', data);
      
        if (response.success) {
          console.log('Registration successful:', response);
          handleUserLogin(response.user)
          console.log(response.user)

          //Checking if User state has been changed.
          // console.log(user)

        } else {
          console.error('Registration failed');
          // Handle error, e.g., show an error message, retry, etc.
        }
      };  


    return (
      <div className="register-div">
        <form className="register-form-container" onSubmit={handleSubmit}>
            <label htmlFor="newUsername">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" id="newUsername" name="username"></input>
            <label htmlFor="newEmail">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@email.com" id="newEmail" name="newEmail"></input>
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="newPassword" name="password"></input>
            <button className="form-button">Register</button>
        </form>
      </div>
    )
}

export default Register