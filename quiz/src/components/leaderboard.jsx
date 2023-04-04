import React, { useState, useEffect} from "react";

const Leaderboard = ( props ) => {

    const { updateLeaderboard } = props
    const [leaders, setLeaders] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8000/leaderboard`)
          .then((response) => response.json())
          .then((data) => {
            setLeaders(data);
          });
      }, [updateLeaderboard]);

    return (
        <div>
          <div className="title">Leaderboard:</div>
            {leaders.map(({ username, beststreak }) => (
                <div key={username}>
                {username} - {beststreak}
                </div>
        ))}
        </div>
    )

}

export default Leaderboard