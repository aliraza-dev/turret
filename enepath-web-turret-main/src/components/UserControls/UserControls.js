import React from 'react'
import { Row } from 'antd';
import ControlButton from './ControlButton/ControlButton'
import "./UserControls.css"

const UserControls = () => {
    return (
        <Row justify="center" className="center">
            <ControlButton text="Privacy" />
            <ControlButton text="Transfer" />
            <ControlButton text="Redial" />
        </Row>
    )
}

export default UserControls