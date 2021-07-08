import {
  SET_UNAUTHENTICATED,
  SET_ERRORS,
  CONNECTING,
} from "../types";
import axios from "axios";


export const detectChange = (userData, history) => (dispatch) => {
  axios
    .post("/signup", userData)
    .then((res) => {
      setAuthorizationHeader(res.response.token);
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};


export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/login", userData)
    .then((res) => {
      console.log(res.data);
      // setAuthorizationHeader(res.data);
      dispatch({
        type: CONNECTING,
        payload: res.data
      });

    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};

// Set User; Set Authorization Header;
export const setAuthorizationHeader = (token) => {
  const FBToken = `Bearer ${token}`;
  localStorage.setItem("FbIdToken", FBToken);
  axios.defaults.headers.common["Authorization"] = FBToken;
};



export const logoutUser = (history) => (dispatch) => {
    axios
    .get("/logout")
    .then((res) => {
      console.log(res.data);
      // setAuthorizationHeader(res.data);
      dispatch({
        type: SET_UNAUTHENTICATED,
        payload: res.data
      });

      history.push('/login');

    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};
