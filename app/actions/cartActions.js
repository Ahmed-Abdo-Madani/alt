import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";
import cache from "../utility/cache";

export const addToCart = (id, request_details, qty = 1) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id,
      request_details,
      qty,
    },
  });
  cache.store("cartItems", getState().cart.cartItems);
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  cache.store("cartItems", getState().cart.cartItems);
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  cache.store("address", data);
};
