import React from 'react';
import 'antd/dist/antd.css';
import { Row } from 'antd';
import './CallControls.css'
import CallControl from './CallControl/CallControl'
import { useDispatch, useSelector } from 'react-redux';
import { endCall, onHold, speedDial } from '../../redux/actions/dialActions';


const CallControls = (props) => {
    const dispatch = useDispatch();
    const handleEndClick = async () => {
        dispatch(endCall())
    }

    const handleHold = async () => {
        dispatch(onHold())
    }

    const startCall = () => {
        const data = {
            number: props.dialPad
        }

        dispatch(speedDial(data))
    }

    // Sync Call State;
    const callState = useSelector(state => state.dial)
    return (
    <>
            <Row justify="center">
                <CallControl handleClick={() => handleEndClick()} text="End" color="call-button-red" />
                { callState.on_call && <CallControl text="Hold" color={["call-button-blue", ( callState.on_hold ? "on-hold" : "")].join(" ")} handleClick={() => handleHold()} /> }
                { !callState.on_call && <CallControl text="Call" handleClick={() => startCall()} color="call-button-green"/>}
                
            </Row>
    </>
)}

export default CallControls