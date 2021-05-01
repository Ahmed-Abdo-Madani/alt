import {
  USER_LOGIN,
  USER_DETAILS_RESET,
  USER_SHIPPING_ADDRESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_DETAILS_RESET:
      return { user: {} };
    case USER_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddresss: action.payload,
      };

    default:
      return state;
  }
};
