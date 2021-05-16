import {
  USER_LOGIN,
  USER_SHIPPING_ADDRESS,
  USER_PUSH_TOKEN,
} from "../constants/userConstants";

// import { getOrdersIds } from "./ordersActions";
import cache from "../utility/cache";

export const login = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN,
    payload: user,
  });
  cache.store("user", user);
  // dispatch(getOrdersIds(user));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: USER_SHIPPING_ADDRESS,
    payload: data,
  });

  cache.store("address", data);
};
export const saveUserPushToken = (data) => async (dispatch) => {
  dispatch({
    type: USER_PUSH_TOKEN,
    payload: data,
  });

  cache.store("userPushToken", data);
};
