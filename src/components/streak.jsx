import React from "react";

const Streak = (props) => {

    const { loggedInfo } = props

    const { streak } = loggedInfo

    if (!loggedInfo) {
        return <div></div>;
    }

    return(
        <div className="streak">
            Your streaks!
            <div>
            Current Streak: {streak[1]}
            </div>
            <div>
            Best Streak: {streak[0]}
            </div>
        </div>
    )
}

export default Streak