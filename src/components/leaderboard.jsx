import React from "react";
import "firebase/firestore";

const Leaderboard = React.memo(( props ) => {
  const { leaders } = props;

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
  });

export default Leaderboard