import { USER_LOGIN, USER_DETAILS_RESET } from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};
