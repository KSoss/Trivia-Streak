import React, { useState, useEffect } from "react";

const Streak = (props) => {

    const { loggedInfo } = props

    const { streak } = loggedInfo

    console.log(loggedInfo)

    return(
        <div className="streak">
            Your streaks!
            <div>
            {/* Current Streak: {streak[0]} */}
            </div>
            <div>
            {/* Best Streak: {streak[1]} */}
            </div>
        </div>
    )
}

export default Streak