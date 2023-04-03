import React, { useState, useEffect } from "react";

const Streak = (props) => {

    const { streak } = props

    return(
        <div>
           Streak: {streak.currentStreak}
           Best Streak {streak.bestStreak}
        </div>
    )
}

export default Streak