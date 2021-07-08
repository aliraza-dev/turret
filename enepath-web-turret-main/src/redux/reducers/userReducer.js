import {
  CONNECTING,
  LOADING_USER,
  LOGINFAILED,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  UPDATE_USER,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  loading: false,
  connecting: false,
  errors: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        credentials: action.payload,
      };

    case CONNECTING:
      return {
        ...state,
        loading: true,
        connecting: true
      }
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGINFAILED:
      return {
        ...state,
        loading: false,
        connecting: false,
        errors: {
          type: 'WRONG USERNAME OR PASSWORD'
        }
      };

    default:
      return state;
  }
};
