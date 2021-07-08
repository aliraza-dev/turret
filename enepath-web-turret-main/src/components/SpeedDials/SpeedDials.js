import React, { useState, useEffect } from 'react'
import './SpeedDial.css'
import { Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { speedDial } from '../../redux/actions/dialActions';
import { incomingCall } from '../../redux/actions/dialActions'

const SpeedDials = (props) => {
    const [DialButtonList, setDialButtonList] = useState(Array.from(Array(11).keys()).map(e => ["Name", "Number"]))
    const dispatch = useDispatch();
    const callData = useSelector(state => state.dial)

    // Event listener to write files in server;
    const writeEvent = async (type, position, number) => {
        console.log(type, position, number)
        let data = {
            button_name: type,
            position: position,
            number
        }

        dispatch(speedDial(data))        
    }
    useEffect(() => {
        let curr = Array.from(Array(15).keys()).map(e => ["", ""]) // Generate ["Name", "Number"] * 11 to offset index by 1
        props.dialButtons.forEach(e => {
            curr[parseInt(e[1])] = [e[4], e[5]]
        })
        setDialButtonList(curr)
        dispatch(incomingCall())              

    }, [props.dialButtons])

    return (
        <>
            {             
                Array.from(Array(5).keys()).map(e => (
                    <Row key={e} justify="center">
                        <button key={e * 2 + 1} className={["speed-dial-button", (callData.phone_num == (e * 2 + 1) ? "blink" : "")].join(" ")} onClick={() => writeEvent(DialButtonList[e*2+1][0], e*2+1, DialButtonList[e*2+1][1])}>
                            {DialButtonList[e*2+1][0]}<br />{DialButtonList[e*2+1][1]}
                        </button>
                        <button key={e * 2 + 2} className={["speed-dial-button", (callData.phone_num == (e * 2 + 2) ? "blink" : "")].join(" ")} onClick={() => writeEvent(DialButtonList[e*2+2][0], e*2+2, DialButtonList[e*2+2][1])}>
                            {DialButtonList[e*2+2][0]}<br />{DialButtonList[e*2+2][1]}
                        </button>
                    </Row>
                ))}
        </>
    )
}

export default SpeedDials