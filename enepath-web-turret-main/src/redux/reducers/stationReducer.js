import {
CURRENT_STATE,
SOCKET_CONNECTION
} from "../types";

const initialState = {
  startup_state: false,
  loading: false,
  socket_connection: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CURRENT_STATE:
      return {
        ...state,
        startup_state: true
      }

      case SOCKET_CONNECTION: 
        return {
          ...state,
          socket_connection: true
        }


    default:
      return state;
  }
}
