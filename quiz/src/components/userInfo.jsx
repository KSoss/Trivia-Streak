import React, { useState} from "react";
import Login from "./login"
import Register from "./register"



const UserInfo = ( props ) => {


    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const { setCurrentForm, currentForm, user, setUser} = props

    const toggleForm = (formname) => {
        setCurrentForm(formname)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // to make sure data is getting passed
        // console.log(email)
        // console.log(pass)
    }

    const handleUserLogin = (userData) => {
        setUser(userData);
      };

    const logout = () => {
        setUser('')
    }

    return (
        <div>{
            user ? (
                <div>
                    <p>
                        logged in as <strong>{user.username}.</strong>
                    </p>
                    <button onClick={logout}>
                        logout
                    </button>
                </div> 
                ) : currentForm === "login" ?      

                    <Login
                        toggleForm={toggleForm}
                        email={email}
                        setEmail={setEmail}
                        pass={pass}
                        setPass={setPass}
                        handleUserLogin={handleUserLogin}
                        user={user}
                        setUser={setUser}
                    /> 
                    : 
                    <Register 
                        toggleForm={toggleForm}
                        email={email}
                        setEmail={setEmail}
                        pass={pass}
                        setPass={setPass}
                        user={user}
                        setUser={setUser}
                        handleSubmit={handleSubmit}
                        handleUserLogin={handleUserLogin}
                    />
            }
        </div>
    )

}

export default UserInfo