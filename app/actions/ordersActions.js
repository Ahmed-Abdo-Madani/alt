import firebase from "firebase/app";
import "firebase/firestore";

import {
  ORDER_GET_USER_ORDERS_REQUEST,
  ORDER_GET_USER_ORDERS_FAIL,
  ORDER_GET_USER_ORDERS_SUCCESS,
  ORDER_STATUS_REQUEST,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_SAVE_FIRESTORE_FAIL,
  ORDER_SAVE_FIRESTORE_REQUEST,
  ORDER_SAVE_FIRESTORE_SUCCESS,
  ORDER_GET_ADMIN_ORDERS_FAIL,
  ORDER_GET_ADMIN_ORDERS_REQUEST,
  ORDER_GET_ADMIN_ORDERS_SUCCESS,
} from "../constants/ordersConstants";
import { send_Order_Notification } from "../actions/notificationActions";
import { wipeCart } from "../actions/cartActions";

// ----------------------   Set the Order status in firestore   ----------------------------

export const setOrderStatus = (state, date) => async (dispatch, getState) => {
  dispatch({ type: ORDER_STATUS_REQUEST });
  const { userInfo } = getState().userLogin;
  try {
    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .collection(date)
      .doc("orderStatus")
      .set(state)
      .then(() => {
        dispatch({ type: ORDER_STATUS_SUCCESS });
      });
  } catch (error) {
    dispatch({ type: ORDER_STATUS_FAIL, payload: error });
  }
};
// ----------------------   Get Admin Orders From firestore   ----------------------------

export const getAdminOrders = () => async (dispatch) => {
  dispatch({ type: ORDER_GET_ADMIN_ORDERS_REQUEST });

  try {
    await firebase
      .firestore()
      .collection("orders")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.docs.forEach((doc) =>
          data.push({ id: doc.id, ...doc.data() })
        );
        dispatch({
          type: ORDER_GET_ADMIN_ORDERS_SUCCESS,
          payload: data,
        });
      });
  } catch (error) {
    dispatch({ type: ORDER_GET_ADMIN_ORDERS_FAIL, payload: error });
  }
};
// ----------------------   Get user Orders From firestore   ----------------------------

export const getUserOrders = () => async (dispatch, getState) => {
  const { userInfo } = getState().userLogin;

  dispatch({ type: ORDER_GET_USER_ORDERS_REQUEST });

  try {
    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        dispatch({
          type: ORDER_GET_USER_ORDERS_SUCCESS,
          payload: data?.orders,
        });
      });
  } catch (error) {
    dispatch({ type: ORDER_GET_USER_ORDERS_FAIL, payload: error });
    console.log(error);
  }
};
// ----------------------   Save the Order in firestore   ----------------------------

export const saveOrdersToFirestore = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SAVE_FIRESTORE_REQUEST });
  const cartItems = getState().cart.cartItems;
  const { userInfo, shippingAddresss } = getState().userLogin;
  try {
    const date = new Date().toString();
    // const ordersIds_inCache = await cache.get("ordersIds");

    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .set(
        {
          orders: firebase.firestore.FieldValue.arrayUnion({
            cartItems,
            date,
            shippingAddresss,
            userInfo,
            orderStatus: { paied: false, delivered: false, processing: false },
          }),
        },
        { merge: true }
      )
      .then(() => {
        dispatch(send_Order_Notification({ userInfo, cartItems }));
        dispatch({ type: ORDER_SAVE_FIRESTORE_SUCCESS });
        dispatch(wipeCart());
      });
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FIRESTORE_FAIL, payload: error });
  }
};
