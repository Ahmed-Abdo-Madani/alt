import {
  ORDER_GET_USER_ORDERS_FAIL,
  ORDER_GET_USER_ORDERS_REQUEST,
  ORDER_GET_USER_ORDERS_SUCCESS,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_SAVE_FIRESTORE_FAIL,
  ORDER_SAVE_FIRESTORE_REQUEST,
  ORDER_SAVE_FIRESTORE_SUCCESS,
  ORDER_SAVE_FIRESTORE_RESET,
  ORDER_SAVE_ID_REQUEST,
  ORDER_SAVE_ID_FAIL,
  ORDER_SAVE_ID_SUCCESS,
  ORDER_GET_ID_REQUEST,
  ORDER_GET_ID_FAIL,
  ORDER_GET_ID_SUCCESS,
  ORDER_GET_ADMIN_ORDERS_SUCCESS,
  ORDER_GET_ADMIN_ORDERS_FAIL,
  ORDER_GET_ADMIN_ORDERS_REQUEST,
  ORDER_UPDATE_ORDERS_STATUS_REQUEST,
  ORDER_UPDATE_ORDERS_STATUS_SUCCESS,
  ORDER_UPDATE_ORDERS_STATUS_FAIL,
} from "../constants/ordersConstants";

export const ordersReducers = (state = { savedToFireStore: false }, action) => {
  switch (action.type) {
    //---------------------------------------------------------------
    case ORDER_GET_USER_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        userOrders: [],
      };

    case ORDER_GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        userOrders: action.payload,
      };
    case ORDER_GET_USER_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        userOrders: [],
        error: action.payload,
      };
    //---------------------------------------------------------------
    case ORDER_GET_ADMIN_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        adminOrders: [],
      };

    case ORDER_GET_ADMIN_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminOrders: action.payload,
      };
    case ORDER_GET_ADMIN_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        adminOrders: [],
        error: action.payload,
      };

    //---------------------------------------------------------------
    case ORDER_SAVE_FIRESTORE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_SAVE_FIRESTORE_SUCCESS:
      return {
        ...state,
        loading: false,
        savedToFireStore: true,
      };
    case ORDER_SAVE_FIRESTORE_FAIL:
      return {
        ...state,
        loading: false,
        savedToFireStore: false,
        error: action.payload,
      };
    //---------------------------------------------------------------
    case ORDER_UPDATE_ORDERS_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_UPDATE_ORDERS_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        updateOrderStatus: true,
      };
    case ORDER_UPDATE_ORDERS_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        updateOrderStatus: false,
        error: action.payload,
      };

    //---------------------------------------------------------------
    case ORDER_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        gotOrdersFromFireStore: true,
      };
    case ORDER_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        gotOrdersFromFireStore: false,
        error: action.payload,
      };
    case ORDER_SAVE_FIRESTORE_RESET:
      return {
        ...state,
        savedToFireStore: false,
      };

    //---------------------------------------------------------------

    case ORDER_SAVE_ID_REQUEST:
      return {
        ...state,
        loading: false,
        OrderIdSaved: true,
      };
    case ORDER_SAVE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        OrderIdSaved: true,
      };
    case ORDER_SAVE_ID_FAIL:
      return {
        ...state,
        OrderIdSaved: false,
        error: action.payload,
      };
    //---------------------------------------------------------------

    case ORDER_GET_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_GET_ID_SUCCESS:
      return {
        ...state,
        ordersIds: action.payload,
      };
    case ORDER_GET_ID_FAIL:
      return {
        ...state,

        loading: false,
        ordersIds: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
