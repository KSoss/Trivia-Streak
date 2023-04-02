import React, { useState} from "react";
import Register from "./register";
import Form from "./form"

const Login = ( props ) => {

    const { email, setEmail, pass, setPass, toggleForm} = props

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(pass)
    }

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

