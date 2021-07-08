import React from 'react'
import './CallControl.css'

const CallControl = (props) => {
    return (
        <button onClick={props.handleClick} className={props.color}>
            {props.text}
        </button>
    )
}

export default CallControl