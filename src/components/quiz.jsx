import React, { useState, useEffect } from "react";
import QuizQuestion from "./quizQuestion";
import Leaderboard from "./leaderboard";
import { collection, query, orderBy, limit, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../App'

const Quiz = (props) => {
  const [trivia, setTrivia] = useState(null);
  const [answered, setAnswered] = useState(false)
  const [response, setResponse] = useState('')
  const {loggedInfo, setLoggedInfo, updateStreak} = props;

  const handleNextQuestion = async () => {
    setTrivia(null);
    const response = await fetch("https://opentdb.com/api.php?amount=1&category=15&type=multiple");
    const data = await response.json();
    setTrivia(data.results[0]);
    setAnswered(false);
    setResponse('');
  };

  useEffect(() => {
    handleNextQuestion();
  }, []);

  const updateLeaderboard = async (newBestStreak) => {
    // get the current lowest best streak on the leaderboard
    const leaderboardRef = collection(db, "leaderboard");
    const leaderboardQuery = query(leaderboardRef, orderBy("bestStreak", "asc"), limit(1));
    const leaderboardSnapshot = await getDocs(leaderboardQuery);
  
    // get the document reference for the current user
    const userRef = doc(db, "leaderboard", loggedInfo.displayName);
  
    // get the current best streak for the user
    const userDoc = await getDoc(userRef);
    let currentBestStreak = 0;
    
    if (userDoc.exists) {
      currentBestStreak = userDoc.data().bestStreak;
    }
  
    // if new best streak is higher than the current one
    if (newBestStreak > currentBestStreak) {
      // update the user's score on the leaderboard
      await setDoc(userRef, {
        displayName: loggedInfo.displayName,
        bestStreak: newBestStreak,
      });
  
      // if the leaderboard had 10 scores already and the lowest one is less than the new best streak
      if (leaderboardSnapshot.size === 10 && newBestStreak > leaderboardSnapshot.docs[0].data().bestStreak) {
        // remove the lowest score from the leaderboard
        await deleteDoc(doc(db, "leaderboard", leaderboardSnapshot.docs[0].id));
      }
    }
  };

  return (
    <div>
      {trivia ? (
        <>
          <div
          className="quiz">
            <QuizQuestion
              trivia={trivia}
              answered={answered}
              setAnswered={setAnswered}
              loggedInfo={loggedInfo}
              setLoggedInfo={setLoggedInfo}
              updateLeaderboard={updateLeaderboard}
              setResponse={setResponse}
              updateStreak={updateStreak}
            />
            <div>
              {response}
            </div>
            {answered && <button className='button' onClick={handleNextQuestion}>Next Question</button>}

            <div className="leaders-container">
              <Leaderboard updateLeaderboard={updateLeaderboard} />
            </div>
          </div>
        </>
      ) : (
        <p className="loading">Loading question...</p>
      )}
    </div>
  );
};

export default Quiz;
