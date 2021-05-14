import firebase from "firebase/app";
import "firebase/firestore";

import cache from "../utility/cache";
import {
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_SAVE_FIRESTORE_FAIL,
  ORDER_SAVE_FIRESTORE_REQUEST,
  ORDER_SAVE_FIRESTORE_SUCCESS,
} from "../constants/ordersConstants";
import { send_Order_Notification } from "../actions/notificationActions";

export const saveOrdersToFirestore = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SAVE_FIRESTORE_REQUEST });
  const cartItems = getState().cart.cartItems;
  const { userInfo, shippingAddresss } = getState().userLogin;
  try {
    const date = new Date();
    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .collection(date.toString())
      .doc("orderDetails")
      .set({ cartItems, shippingAddresss, userInfo })
      .then(() => {
        dispatch(send_Order_Notification({ userInfo, cartItems }));
        dispatch({ type: ORDER_SAVE_FIRESTORE_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FIRESTORE_FAIL, payload: error });
  }
};
