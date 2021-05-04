import {
  GET_ADMIN_FAIL,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
  SEND_ORDER_NOTIFICATION_FAIL,
  SEND_ORDER_NOTIFICATION_REQUEST,
  SEND_ORDER_NOTIFICATION_SUCCESS,
} from "../constants/notificationsConstants";

import { USER_PUSH_TOKEN } from "../constants/userConstants";

export const notificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PUSH_TOKEN:
      return {
        ...state,
        pushToken: action.payload,
      };

    //----------------------------------------------

    case GET_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        admins: [],
      };
    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload,
      };
    case GET_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        admins: [],
        error: action.payload,
      };

    //----------------------------------------------
    case SEND_ORDER_NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_ORDER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        send_order_response: action.payload,
      };
    case SEND_ORDER_NOTIFICATION_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
