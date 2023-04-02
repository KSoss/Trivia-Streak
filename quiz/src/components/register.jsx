import React, { useState} from "react";
import Form from "./form"

const Register = ( props ) => {

    const { email, setEmail, pass, setPass, username, setUsername } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(pass)
    }

    return (
        <div className = "form-container">
        <form onSubtmit={handleSubmit}>
            <label for="username">username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="email" placeholder="YourEmail@email.com" id="email" name="email"></input>
            <label for="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="YourEmail@email.com" id="email" name="email"></input>
            <label for="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)}type="password" placeholder="*******" id="password" name="password"></input>
            <button>Log In</button>
        </form>
        </div>
    )
}

export default Register