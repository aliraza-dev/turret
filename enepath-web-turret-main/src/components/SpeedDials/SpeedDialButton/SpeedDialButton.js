import React from 'react'
import './SpeedDialButton.css'
import { Row } from 'antd';

const SpeedDialButton = () => {
    return (
        <>
            {
                // iterating through Array [0,1,2,3,4]
                Array.from(Array(5).keys()).map(e => (
                    <Row key={e} justify="center">
                        <button key={e * 2} className="speed-dial-button">
                            Name<br />Number
                        </button>
                        <button key={e * 2 + 1} className="speed-dial-button">
                            Name<br />Number
                        </button>
                    </Row>
                ))}
        </>
    )
}

export default SpeedDialButton;