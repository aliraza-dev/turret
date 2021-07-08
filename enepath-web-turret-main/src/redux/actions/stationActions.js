import {
CURRENT_STATE,
SET_ERRORS,
SET_AUTHENTICATED,
LOGGEDIN, LOGGEDOUT, CONNECTING, SET_UNAUTHENTICATED,
SOCKET_CONNECTION,
LOGINFAILED, INCOMMINGCALL
} from "../types";

import axios from "axios";
import { io } from "socket.io-client";

export const setStartUpState = () => (dispatch) => {
 console.log("ASD")
  axios
    .get(`http://localhost:4000/write-startup-state`)
    .then((response) => {
      dispatch({
        type: CURRENT_STATE,
        payload: response.data,
      });

      if (response.data && response.data.data.login_state) {
        switch (response.data.data.login_state) {
          case LOGGEDOUT:
              dispatch({
                type: SET_UNAUTHENTICATED,
                payload: response.data
              })
            break;
          case LOGGEDIN:
            dispatch({
              type: SET_AUTHENTICATED,
              payload: response.data
            })
            break;
          case CONNECTING:
            dispatch({
              type: CONNECTING
            })
            break; 
          
          case INCOMMINGCALL:
            dispatch({
              type: INCOMMINGCALL,
              payload: response.data.data
            })
            break;

          default:
            dispatch({
                type: SET_UNAUTHENTICATED,
                payload: response.data
              })
            break;
        }
      }

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
      });
    });
};

// connect to socket;
export const connectToSocket = () => (dispatch) => {
  
  const socket = io("http://127.0.0.1:4001");
  socket.on('file-added', data => {
      // processing events
      if (data  && data.eventName) {
        const eventNameSplitter = data.eventName.split('%');
        console.log(eventNameSplitter[2])

        switch (eventNameSplitter[2]) {
          case LOGGEDOUT:
              dispatch({
                type: SET_UNAUTHENTICATED
              })
            break;
          case LOGGEDIN:
            dispatch({
              type: SET_AUTHENTICATED
            })
            break;
          case CONNECTING:
            dispatch({
              type: CONNECTING
            })
            break;
          case LOGINFAILED:
            dispatch({
              type: LOGINFAILED
            })  
            break;
          default:
            dispatch({
                type: SET_UNAUTHENTICATED
              })
            break;
        }
      }

  })
  
  dispatch({
    type: SOCKET_CONNECTION
  })
}
