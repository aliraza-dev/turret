import React from 'react'
import { Row } from 'antd';
import ControlButton from './ControlButton/ControlButton'
import "./UserControls.css"
import { useSelector } from 'react-redux'

const UserControls = () => {

    const dial_state = useSelector(state => state.dial)

    return (
        <Row justify="center" className="center">
            <ControlButton text="Privacy" className={[(dial_state.private_call ? "private_call" : "")].join(" ")}/>
            <ControlButton text="Transfer" />
            <ControlButton text="Redial" />
        </Row>
    )
}

export default UserControls