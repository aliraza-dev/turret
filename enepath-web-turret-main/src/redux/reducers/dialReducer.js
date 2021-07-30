import {
    START_CALL, END_CALL, HOLD_CALL, INCOMINGCALL, PRIVATE, UIN, DIALPAD
} from '../types'

const initialState = {
    on_call: false,
    loading: false,
    on_hold: false,
    incoming_call: false, 
    call_num_info: 0,
    private_call: false,
    errors: [],
    uin: 0
}

export default function dial (state = initialState, action) {
    switch (action.type) {
        case END_CALL:
             return {
                 ...state,
                on_call: false,
                loading: false,
                on_hold: false,
                incoming_call: false, 
                call_num_info: 0,
                private_call: false,
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
        case INCOMINGCALL: 
            return {
            ...state,
            incoming_call: action.payload.state,
            call_num_info: action.payload.number
            }
        case PRIVATE: 
            return {
            ...state,
            incoming_call: action.payload.state,
            call_num_info: action.payload.number,
            private_call: action.payload.state
            }

        case UIN: 
            return {
                ...state,
                uin: action.payload.uin
            }
        default:
            return {
                ...state
            }
    }
}