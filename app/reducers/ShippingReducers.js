import {
  CALC_RATE_FAIL,
  CALC_RATE_SUCCESS,
  CALC_RATE_REQUSET,
} from "../constants/ShippingConstants";
export const shippingReducer = (state = {}, action) => {
  switch (action.type) {
    case CALC_RATE_REQUSET:
      return {
        ...state,
        loading: true,
      };
    case CALC_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingCost: action.payload,
      };

    case CALC_RATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
