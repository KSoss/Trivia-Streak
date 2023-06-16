import React, { useState, useEffect } from "react";
import Quiz from "./quiz"
import Streak from "./streak"
import NameModal from "./usernameModal";

// firebase dependencies
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// configs
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

const Front = () => {

  const [currentForm, setCurrentForm] = useState('login')
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

  useEffect(() => {
    // open the modal if the user is logged in but does not have a display name
    if (user && !loggedInfo.displayName) {
      setIsModalOpen(true);
    }
  }, [user, loggedInfo]);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email;
    getUserData(email);
  }

  const setDisplayName = async (displayName) => {
    // update the displayName in firestore as well
    const userRef = doc(firestore, "users", loggedInfo.email);
    await setDoc(userRef, { displayName }, { merge: true });
  
    // update local state after Firestore update is complete
    setLoggedInfo({ ...loggedInfo, displayName });
  };

  function signOutWithGoogle() {
    getAuth().signOut().then(() => {
      console.log("User signed out");
    }).catch((error) => {
      console.error('Problem signing out', error);
    });
  }

  async function getUserData(email) {
    setIsLoading(true)
    const userRef = doc(firestore, "users", email); 
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
    const userRef = doc(firestore, "users", loggedInfo.email);
    const newStreakData = { streak: [bestStreak, currentStreak] };
    await setDoc(userRef, newStreakData, { merge: true });
  
    // update local state after Firestore update is complete
    setLoggedInfo({ ...loggedInfo, streak: [bestStreak, currentStreak] });
};

console.log(loggedInfo)

  return (
    <div>
        <>
          <div className="streak-container">
            <Streak 
              loggedInfo={loggedInfo}
            />
          </div>
          <div className="quiz-container">
            <Quiz 
              user={user}
              updateStreak={updateStreak}
            />
          </div>
        </>
        <div>
          {user ? 
            <button onClick={signOutWithGoogle}>Sign Out</button> 
            : 
            <button onClick={signInWithGoogle}>Sign in with Google</button>} 
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

    </div>
  );
}

export default Front;