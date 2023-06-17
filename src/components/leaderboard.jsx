import React, { useState, useEffect} from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "firebase/firestore";
import { db } from '../App';

const Leaderboard = ( props ) => {

    const { updateLeaderboard } = props
    const [leaders, setLeaders] = useState([])


    useEffect(() => {
      const fetchLeaders = async () => {
        const leaderboardRef = collection(db, "leaderboard");
        const leaderboardQuery = query(leaderboardRef, orderBy("bestStreak", "desc"), limit(10));
        const leaderboardSnapshot = await getDocs(leaderboardQuery);
  
        const fetchedLeaders = leaderboardSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeaders(fetchedLeaders);
      };
  
      fetchLeaders();
    }, [updateLeaderboard]);

    return (
      <div>
        <div className="title">Leaderboard:</div>
        {leaders.map(({ displayName, bestStreak }) => (
          <div key={displayName}>
            {displayName} - {bestStreak}
          </div>
        ))}
      </div>
    );
  };

export default Leaderboard