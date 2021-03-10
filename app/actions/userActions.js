import firebase from "firebase";
import { USER_LOGIN } from "../constants/userConstants";

export const login = (user) => async (dispatch, getState) => {
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
};
