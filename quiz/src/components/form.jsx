import React, { useState} from "react";
import Login from "./login"
import Register from "./register"



const Form = ( props ) => {

    const { email, setEmail, pass, setPass, setCurrentForm, currentForm, username, setUsername} = props

    const toggleForm = (formname) => {
        setCurrentForm(formname)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(pass)
    }

    return (
        <div>{currentForm === "login" ?      
            <Login
                toggleForm={toggleForm}
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
                handleSubmit={handleSubmit}
            /> 
            : 
            <Register 
                toggleForm={toggleForm}
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
                username={username}
                setUsername={setUsername}
                handleSubmit={handleSubmit}
            />
            }
        </div>
    )

}

export default Form