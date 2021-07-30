import {
    END_CALL,
    HOLD_CALL,
    INCOMINGCALL,
    PRIVATE,
    SET_ERRORS,
    START_CALL,
} from "../types";

import axios from "axios";
// import { io } from "socket.io-client";

export  const setupCall = () => dispatch => {
    
}

export const speedDial = (data) => dispatch => {
    axios.post('start-call', data)
    .then(res => {
        dispatch({
            type: START_CALL
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });

}

export const onHold = (data) => dispatch => {
    axios.get('/hold-call')
    .then(res => {
        console.log(res)
        dispatch({
            type: HOLD_CALL
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });

}
export const endCall = () => dispatch => {
    axios.get('/end-call')
    .then(res => {
        dispatch({
            type: END_CALL
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });

}

export const incomingCall = () => dispatch => {
    axios.get('/incoming-call')
    .then(res => {
        dispatch({
            type: INCOMINGCALL,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });
}

export const privateCall = () => dispatch => {
    axios.get('/private-call')
    .then(res => {
        dispatch({
            type: PRIVATE,
            payload: res.data
        })
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });
}

export const dialPad = () => dispatch => {
    axios.get('/http://localhost:4000/web-text')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
        dispatch({
            type: SET_ERRORS
        })
    });
}






