import React, { useState } from "react";
import Quiz from "./quiz"
import Streak from "./streak"
import Register from "./register"
import Login from "./login"

// firebase dependencies

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

// configs
const firebaseConfig = {
  apiKey: "AIzaSyDrIqLILTKp0znctKk8cLd35XNW15iqN4o",
  authDomain: "trivia-streak.firebaseapp.com",
  databaseURL: "https://trivia-streak-default-rtdb.firebaseio.com",
  projectId: "trivia-streak",
  storageBucket: "trivia-streak.appspot.com",
  messagingSenderId: "182329519939",
  appId: "1:182329519939:web:4efde6084847ad661389f6",
  measurementId: "G-BR37G87KTK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

const Front = () => {

  const [currentForm, setCurrentForm] = useState('login')
  const [user] = useAuthState(auth);
  const [streak, setStreak] = useState({ currentStreak: 0, bestStreak: 0})
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')



  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Problem signing in with Google', error);
    });
  }

  function signOutWithGoogle() {
    getAuth().signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error('Problem signing out', error);
    });
  }

  return (
    <div>
        <>
          <div className="streak-container">
            <Streak 
              user={user}
              streak={streak}
            />
          </div>
          <div className="quiz-container">
            <Quiz 
              user={user}
              streak={streak}
              setStreak={setStreak}
            />
          </div>
        </>
        <div>
          {user ? 
            <button onClick={signOutWithGoogle}>Sign Out</button> 
            : 
            <button onClick={signInWithGoogle}>Sign in with Google</button>} 
        </div>

    </div>
  );
}

export default Front;