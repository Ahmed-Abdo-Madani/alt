import { USER_LOGIN } from "../constants/userConstants";

export const login = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
};
