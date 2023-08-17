//import React from "react"

const DieComponent = (props) => {

    const styles={
        backgroundColor: props.isHeld ? "#59E391" : "rgb(197, 119, 119)"
    }

    return (
        <div 
            className="die-box" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-value">{props.value}</h2>
        </div>
    )
}
export default DieComponent;