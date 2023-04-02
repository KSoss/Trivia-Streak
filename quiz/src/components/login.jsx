import React, { useState} from "react";


const Login = ( props ) => {

    const { email, setEmail, pass, setPass, toggleForm, handleSubmit} = props

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
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

