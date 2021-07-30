import {
CURRENT_STATE,
SET_ERRORS,
SET_AUTHENTICATED,
LOGGEDIN, LOGGEDOUT, CONNECTING, SET_UNAUTHENTICATED,
SOCKET_CONNECTION,
LOGINFAILED, INCOMINGCALL, BU, INCOMING, PRIVATE, REQUEST, UIN, TEXT, COLOR
} from "../types";

import axios from "axios";
import { io } from "socket.io-client";

export const setStartUpState = () => (dispatch) => {
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
          
          case INCOMINGCALL:
            dispatch({
              type: INCOMINGCALL,
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

  socket.on('file-removed', data => {
      // processing events
      console.log(data)
      if (data  && data.eventName) {
        const eventNameSplitter = data.eventName.split('%');
        switch (eventNameSplitter[2]) {
          case UIN:
              dispatch({
                type: UIN,
                payload: { uin:0 }
              })
            break;

        
          default:
            // dispatch({
            //     type: SET_UNAUTHENTICATED
            //   })
            break;
        }
      }

  })

  socket.on('file-added', data => {
      // processing events
      if (data  && data.eventName) {
        const eventNameSplitter = data.eventName.split('%');
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

          case UIN: 
            if (eventNameSplitter[1] === TEXT) {
              dispatch({
                type: UIN,
                payload: { uin: eventNameSplitter[3] }
              })
            } else if ( eventNameSplitter[1] === COLOR ) {

            }
            
          break;

          case BU:
           if (eventNameSplitter[1] === INCOMING) {
             let data = {
               state: true,
               number: eventNameSplitter[3]
             }
             dispatch({
               type: INCOMINGCALL,
               payload: data
             })
           }

          if (eventNameSplitter[1] === PRIVATE) {
             let data = {
               state: eventNameSplitter[4] === "ON" ? true : false,
               number: eventNameSplitter[3]
             }
             dispatch({
               type: PRIVATE,
               payload: data
             })
           }
          break;

          case REQUEST:
            if (eventNameSplitter[1] === LOGGEDOUT) {
              dispatch({
                type: SET_UNAUTHENTICATED
              })
            }
          break;
          
          default:
            // dispatch({
            //     type: SET_UNAUTHENTICATED
            //   })
            break;
        }
      }

  })
  
  dispatch({
    type: SOCKET_CONNECTION
  })
}
