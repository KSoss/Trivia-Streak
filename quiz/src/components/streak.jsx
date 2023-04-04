import React, { useState, useEffect } from "react";

const Streak = (props) => {

    const { streak } = props

    return(
        <div className="streak">
            Your streaks!
            <div>
            Current Streak: {streak.currentStreak}
            </div>
            <div>
            Best Streak {streak.bestStreak}
            </div>
        </div>
    )
}

export default Streak