import React, { useState} from "react";
import Login from "./login"
import Register from "./register"



const Form = ( props ) => {

    const { email, setEmail, pass, setPass, setCurrentForm, currentForm, username, setUsername} = props

    const toggleForm = (formname) => {
        setCurrentForm(formname)
    }


    return (
        <div>{currentForm === "login" ?      
            <Login
                toggleForm={toggleForm}
                email={email}
                setEmail={setEmail}
                pass={pass}
                setPass={setPass}
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
            />
            }
        </div>
    )

}

export default Form