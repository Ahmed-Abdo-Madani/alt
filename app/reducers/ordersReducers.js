import {
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_SAVE_FIRESTORE_FAIL,
  ORDER_SAVE_FIRESTORE_REQUEST,
  ORDER_SAVE_FIRESTORE_SUCCESS,
  ORDER_SAVE_FIRESTORE_RESET,
} from "../constants/ordersConstants";

export const ordersReducers = (state = { savedToFireStore: false }, action) => {
  switch (action.type) {
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
    case ORDER_SAVE_FIRESTORE_RESET:
      return {
        ...state,
        savedToFireStore: false,
      };
    default:
      return state;
  }
};
