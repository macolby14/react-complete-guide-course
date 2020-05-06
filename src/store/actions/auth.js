import axios from "axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      resturnSecureToken: true,
    };
    console.log("Making post", email, password);
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWSHIfVgTF9nVJXfbsOTFnqrCl7j-jHso",
        authData
      )
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail());
      });
  };
};
