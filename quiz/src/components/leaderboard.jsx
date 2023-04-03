import React, { useState, useEffect} from "react";

const Leaderboard = ( props ) => {

    const [leaders, setLeaders] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8000/leaderboard`)
          .then((response) => response.json())
          .then((data) => {
            setLeaders(data);
          });
      }, []);


    return (
        <div>
            {leaders.map(({ username, beststreak }) => (
                <li key={username}>
                {username} - {beststreak}
                </li>
        ))}
        </div>
    )

}

export default Leaderboard