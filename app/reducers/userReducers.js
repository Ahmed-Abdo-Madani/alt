import { State } from "react-native-gesture-handler";
import { USER_LOGIN } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  return {
    ...state,
    userInfo: action.payload,
  };
};
