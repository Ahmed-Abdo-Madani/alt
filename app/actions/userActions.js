import { useState } from "react";
import firebase from "firebase";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";
import { useSelector } from "react-redux";

export const login = (phoneNumber, recaptchaVerifierRef) => async (
  dispatch
) => {
  const [verificationId, setVerificationId] = useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifierRef.current)
      .then((vId) => setVerificationId(vId));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: { verificationId },
    loggedIn: false,
  });
};
export const loginVerification = (verificationCode) => async (dispatch) => {
  const [user, setuser] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  dispatch({
    type: USER_LOGIN_REQUEST,
  });

  try {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      userInfo.verificationId,
      verificationCode
    );
    await firebase
      .auth()
      .signInWithCredential(credential)
      .then((res) => setuser(res.user));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error,
    });
  }
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: user,
    loggedIn: true,
  });
};
