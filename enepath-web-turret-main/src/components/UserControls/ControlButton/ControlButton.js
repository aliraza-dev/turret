import React from 'react'
import './ControlButton.css'

const ControlButton = (props) => {
    return (
        <button className="control-button">
            {props.text}
        </button>
    )
}

export default ControlButton