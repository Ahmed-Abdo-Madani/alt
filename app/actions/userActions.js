import { USER_LOGIN,USER_SHIPPING_ADDRESS } from "../constants/userConstants";
import cache from "../utility/cache";

export const login = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
  cache.store("user", user);
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: USER_SHIPPING_ADDRESS,
    payload: data,
  });

  cache.store("address", data);
};
