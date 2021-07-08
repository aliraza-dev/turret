import {
    START_CALL, END_CALL, HOLD_CALL, INCOMMINGCALL
} from '../types'

const initialState = {
    on_call: false,
    loading: false,
    on_hold: false,
    incoming_call: false, 
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
            incoming_call: true
            }
        default:
            return {
                ...state
            }
    }
}