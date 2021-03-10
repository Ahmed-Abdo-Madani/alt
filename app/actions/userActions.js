import firebase from "firebase";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

export const login = (phoneNumber, recaptchaVerifierRef) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  console.log(getState().userLogin);

  try {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
      .then((res) => {
        if (res) {
          dispatch({
            type: USER_LOGIN_SUCCESS,
            verificationId: res,
            loggedIn: false,
          });
        }
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};
export const loginVerification = (verificationCode) => async (
  dispatch,
  getState
) => {
  console.log(getState().userLogin);
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      getState().userLogin.verificationId,
      verificationCode
    );
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => {
        if (res)
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: res.user,
            loggedIn: true,
          });
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
};
