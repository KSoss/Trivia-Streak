import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import Streak from "./streak"
import NameModal from "./usernameModal";

import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase.js';

const Front = () => {

  const [user] = useAuthState(auth);
  const [loggedInfo, setLoggedInfo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const email = firebaseUser.email;
        // Fetch the user data from Firestore
        await getUserData(email);
      } else {
        // User is signed out
        setLoggedInfo('');
      }
    });  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    getUserData(email);
  }

  const setDisplayName = async (displayName) => {
    // update the displayName in firestore as well
    const userRef = doc(db, "users", loggedInfo.email);
    await setDoc(userRef, { displayName }, { merge: true });
  
    // update local state after Firestore update is complete
    setLoggedInfo({ ...loggedInfo, displayName });
  };

  function signOutWithGoogle() {
    auth.signOut().then(() => {
    }).catch((error) => {
      console.error('Problem signing out', error);
    });
  }

  async function getUserData(email) {
    setIsLoading(true)
    const userRef = doc(db, "users", email); 
    const docSnap = await getDoc(userRef);
  
    if (docSnap.exists()) {
      setIsModalOpen(false)
      setLoggedInfo(docSnap.data());
    } else {
      // User document does not exist, so create it
      try {
        const userData = {
          displayName: '',
          email: email,
          streak: [0, 0]
        };
        await setDoc(userRef, userData);
        setLoggedInfo(userData);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  
    // Check if the user's document exists in the leaderboard collection
    const leaderboardRef = doc(db, 'leaderboard', docSnap.data().displayName);
    const leaderboardSnap = await getDoc(leaderboardRef);
  
    if (!leaderboardSnap.exists()) {
      // Leaderboard document does not exist, so create it
      try {
        const leaderboardData = {
          displayName: docSnap.data().displayName,
          bestStreak: 0
        };
        await setDoc(leaderboardRef, leaderboardData);
      } catch (e) {
        console.error("Error adding document to leaderboard: ", e);
      }
    }
  
    setIsLoading(false);
  }

  const updateStreak = async (correct) => {
    let currentStreak = loggedInfo.streak[1];
    let bestStreak = loggedInfo.streak[0];
    
    if (correct) {
      // if the answer is correct, increment the current streak
      currentStreak++;
      
      // if the new current streak is greater than the best streak, update the best streak
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      // if the answer is wrong, reset the current streak
      currentStreak = 0;
    }
  
    // update the streak in firestore as well
    const userRef = doc(db, "users", loggedInfo.email);
    const newStreakData = { streak: [bestStreak, currentStreak] };
    await setDoc(userRef, newStreakData, { merge: true });
  
    // update local state after Firestore update is complete
    setLoggedInfo({ ...loggedInfo, streak: [bestStreak, currentStreak] });
};

useEffect(() => {
  if (user) {
    getUserData(user.email);
  } else {
    setIsLoading(false);
  }
}, [user]);

useEffect(() => {
  // open the modal if the user is logged in but does not have a display name
  if (user && !loggedInfo.displayName) {
    setIsModalOpen(true);
  }
}, [user, loggedInfo]);

if (isLoading) {
  return null; // or return a loading indicator
}

  return (
    <div>
      <div className="header">
        <div className="head-text">
          Trivia Streak
        </div>
        <div className="log-container">
            {user ? 
              <button className="log-button" onClick={signOutWithGoogle}>Sign Out</button> 
              : 
              <button className="log-button" onClick={signInWithGoogle}>Sign in with Google</button>}
        </div>
    <div>
      {isModalOpen && 
        <NameModal 
          isOpen={isModalOpen} 
          closeModal={() => setIsModalOpen(false)} 
          setDisplayName={setDisplayName}
        />
      }
    </div>
      </div>
        <>
          <div className="streak-container">
            <Streak 
              loggedInfo={loggedInfo}
            />
          </div>
          <div className="quiz-container">
            <Quiz 
              loggedInfo={loggedInfo}
              updateStreak={updateStreak}
            />
          </div>
        </>
    </div>
  );
}

export default Front;