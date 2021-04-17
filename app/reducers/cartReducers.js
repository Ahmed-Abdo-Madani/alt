import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_EMPTY_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  INIT_CART_ITEMS,
} from "../constants/cartConstants";

export const cartAddReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case INIT_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddresss: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
