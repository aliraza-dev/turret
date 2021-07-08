import {
    START_CALL, END_CALL, HOLD_CALL, INCOMMINGCALL
} from '../types'

const initialState = {
    on_call: false,
    loading: false,
    on_hold: false,
    incoming_call: false,
    phone_num: 0,
    private_call: false, 
    errors: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case END_CALL:
             return {
                 ...state,
                 on_call: false,
                 loading: false,
                 incoming_call: false,
                 on_hold: false,
                 phone_num: 0
             }

        case HOLD_CALL:
            return {
                ...state,
                on_hold: true
            };

        case START_CALL:
            return {
                ...state,
                on_call: true,
                on_hold: false
            };
        case INCOMMINGCALL: 
            return {
            ...state,
            incoming_call: action.payload.state,
            phone_num: action.payload.number
            }
        default:
            return {
                ...state
            }
    }
}