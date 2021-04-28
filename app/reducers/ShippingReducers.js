import {
  CALC_RATE_FAIL,
  CALC_RATE_SUCCESS,
  CALC_RATE_REQUSET,
  CREATE_SHIPMENT_REQUSET,
  CREATE_SHIPMENT_SUCCESS,
  CREATE_SHIPMENT_FAIL,
  PRINT_LABEL_REQUSET,
  PRINT_LABEL_FAIL,
  PRINT_LABEL_SUCCESS,
  CREATE_PICKUP_FAIL,
  CREATE_PICKUP_REQUSET,
  CREATE_PICKUP_SUCCESS,
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

    //----------------------------------------------

    case CREATE_SHIPMENT_REQUSET:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SHIPMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        createShipmentResponse: action.payload,
      };

    case CREATE_SHIPMENT_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    //-------------------------------------------

    case CREATE_PICKUP_REQUSET:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PICKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        createPickupResponse: action.payload,
      };

    case CREATE_PICKUP_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    //-------------------------------------------

    case PRINT_LABEL_REQUSET:
      return {
        ...state,
        loading: true,
      };
    case PRINT_LABEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        printLabelResponse: action.payload,
      };

    case PRINT_LABEL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    //-------------------------------------------

    default:
      return state;
  }
};
