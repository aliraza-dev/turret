import React from 'react'
import 'antd/dist/antd.css';
import "./DialedNumberDisplay.css"

import { Row } from 'antd';

const DialedNumberDisplay = (props) => {

    return (
        <Row  justify="center">
            <input className="box-display" type="text" onChange={props.changeHandler}  value={props.dialValue}/>
        </Row>
    )
}

export default DialedNumberDisplay;