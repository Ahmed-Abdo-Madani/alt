import {
  INIT_PAYMENTS_FAIL,
  INIT_PAYMENTS_REQUEST,
  INIT_PAYMENTS_SUCCESS,
  EXECUTE_REQUEST_JSON,
  EXECUTE_PAYMENT_SUCCESS,
  EXECUTE_PAYMENT_FAIL,
  EXECUTE_PAYMENT_REQUEST,
  PAYMENT_CARD,
} from "../constants/paymentConstants";

export const userPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case INIT_PAYMENTS_REQUEST:
      return {
        ...state,
        invoiceValue: 0,
        loading: true,
        paymentMethods: [],
      };

    case INIT_PAYMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        invoiceValue: action.invoiceValue,
        paymentMethods: action.payload,
      };

    case INIT_PAYMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EXECUTE_REQUEST_JSON:
      return {
        ...state,
        request: action.payload,
      };
    case EXECUTE_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXECUTE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        paymentResult: action.payload,
      };
    case EXECUTE_PAYMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PAYMENT_CARD:
      return {
        ...state,
        cardInfo: action.payload.cardInfo,
        MFCard: action.payload.MFCard,
      };

    default:
      return state;
  }
};
