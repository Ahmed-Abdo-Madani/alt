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
  ORDER_SAVE_ID_FAIL,
  ORDER_SAVE_ID_SUCCESS,
  ORDER_SAVE_ID_REQUEST,
} from "../constants/ordersConstants";
import { send_Order_Notification } from "../actions/notificationActions";

// ----------------------   firestore refrencess   ----------------------------
const dbRef = firebase.firestore();

// ----------------------   Set the Order status in firestore   ----------------------------

export const setOrderStatus = (state, date) => async (dispatch, getState) => {
  dispatch({ type: ORDER_STATUS_REQUEST });
  const { userInfo } = getState().userLogin;
  try {
    await dbRef
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
// ----------------------   Get user Orders From firestore   ----------------------------

export const getUserOrders = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_STATUS_REQUEST });
  const { userInfo } = getState().userLogin;
  try {
    await dbRef
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .collection("Fri May 14 2021 09:11:48 GMT+0300 (Arabian Standard Time)")
      .get()
      .then((snapshot) => {
        const ordersList = [];
        snapshot.docs.forEach((doc) => ordersList.push(doc.data()));
        dispatch({ type: ORDER_STATUS_SUCCESS, payload: ordersList });
      });
  } catch (error) {
    dispatch({ type: ORDER_STATUS_FAIL, payload: error });
  }
};

// ----------------------   Save the Order in firestore   ----------------------------

export const saveOrdersToFirestore = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SAVE_FIRESTORE_REQUEST });
  const cartItems = getState().cart.cartItems;
  const { userInfo, shippingAddresss } = getState().userLogin;
  try {
    const date = new Date().toString();
    const ordersIds_inCache = await cache.get("ordersIds");
    const userDocRef = dbRef.collection("orders").doc(userInfo.phoneNumber);

    await userDocRef
      .collection(date)
      .doc("orderDetails")
      .set({ cartItems, shippingAddresss, userInfo })
      .then(() => {
        dispatch(saveOrderId(userInfo.phoneNumber, date));
        dispatch(
          setOrderStatus(
            { paied: false, delivered: false, processing: false },
            date
          )
        );
        dispatch(send_Order_Notification({ userInfo, cartItems }));
        dispatch({ type: ORDER_SAVE_FIRESTORE_SUCCESS });
      });

    if (ordersIds_inCache) {
      cache.store("ordersIds", ordersIds_inCache.push(date));
    } else {
      cache.store("ordersIds", [date]);
    }
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FIRESTORE_FAIL, payload: error });
  }
};

// ----------------------   Save Order id in firestore   ----------------------------
export const saveOrderId =
  (phoneNumber, date) => async (dispatch, getState) => {
    dispatch({ type: ORDER_SAVE_ID_REQUEST });
    const ordersIds_inCahce = await cache.get("ordersIds");
    const userDocRef = dbRef.collection("orders").doc(phoneNumber);

    try {
      if (ordersIds_inCahce) {
        await userDocRef.update({
          ids: firebase.firestore.FieldValue.arrayUnion(date),
        });
        dispatch({ type: ORDER_SAVE_ID_SUCCESS });
      } else {
        await userDocRef.set({
          ids: firebase.firestore.FieldValue.arrayUnion(date),
        });
        dispatch({ type: ORDER_SAVE_ID_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: ORDER_SAVE_ID_FAIL, payload: error });
    }
  };
