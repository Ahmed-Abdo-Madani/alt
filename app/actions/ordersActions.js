import firebase from "firebase/app";
import "firebase/firestore";

import cache from "../utility/cache";
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
  ORDER_SAVE_ID_FAIL,
  ORDER_SAVE_ID_SUCCESS,
  ORDER_SAVE_ID_REQUEST,
  ORDER_GET_ID_FAIL,
  ORDER_GET_ID_REQUEST,
  ORDER_GET_ID_SUCCESS,
} from "../constants/ordersConstants";
import { send_Order_Notification } from "../actions/notificationActions";

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
// ----------------------   Get user Orders From firestore   ----------------------------

export const getUserOrders = () => async (dispatch, getState) => {
  const { userInfo } = getState().userLogin;
  const { ordersIds } = getState().orders;

  dispatch({ type: ORDER_GET_USER_ORDERS_REQUEST });
  const orders = [];
  let ordersPromise = new Promise((resolve, reject) => {
    ordersIds.forEach(async (id, index) => {
      try {
        await firebase
          .firestore()
          .collection("orders")
          .doc(userInfo.phoneNumber)
          .collection(id.id)
          .get()
          .then((snapshot) => {
            const order = [];
            snapshot.docs.forEach((doc) => {
              order.push({ id: doc.id, data: doc.data() });
              if (ordersIds.length - 1 === index) resolve();
            });
            orders.push(order);
          });
      } catch (error) {
        dispatch({ type: ORDER_GET_USER_ORDERS_FAIL, payload: error });
        reject(error);
      }
    });
  });

  ordersPromise.then(
    () => {
      dispatch({ type: ORDER_GET_USER_ORDERS_SUCCESS, payload: orders });
    },
    (error) => {
      dispatch({ type: ORDER_GET_USER_ORDERS_FAIL, payload: error });
    }
  );
};

// ----------------------   Save the Order in firestore   ----------------------------

export const saveOrdersToFirestore = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_SAVE_FIRESTORE_REQUEST });
  const cartItems = getState().cart.cartItems;
  const { userInfo, shippingAddresss } = getState().userLogin;
  try {
    const date = new Date().toString();
    const ordersIds_inCache = await cache.get("ordersIds");

    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
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
      ordersIds_inCache.push({ id: date });
      cache.store("ordersIds", ordersIds_inCache);
    } else {
      cache.store("ordersIds", [{ id: date }]);
    }
  } catch (error) {
    dispatch({ type: ORDER_SAVE_FIRESTORE_FAIL, payload: error });
  }
};

// ----------------------   Save Order id in firestore   ----------------------------
export const saveOrderId =
  (phoneNumber, date) => async (dispatch, getState) => {
    dispatch({ type: ORDER_SAVE_ID_REQUEST });
    await cache
      .get("ordersIds")
      .then(async (ordersIds_inCahce) => {
        try {
          if (ordersIds_inCahce) {
            await firebase
              .firestore()
              .collection("orders")
              .doc(phoneNumber)
              .update({
                ids: firebase.firestore.FieldValue.arrayUnion(date),
              });
            dispatch({ type: ORDER_SAVE_ID_SUCCESS });
          } else {
            await firebase
              .firestore()
              .collection("orders")
              .doc(phoneNumber)
              .set({
                ids: firebase.firestore.FieldValue.arrayUnion(date),
              });
            dispatch({ type: ORDER_SAVE_ID_SUCCESS });
          }
        } catch (error) {
          dispatch({ type: ORDER_SAVE_ID_FAIL, payload: error });
        }
      })
      .catch((error) => {
        dispatch({ type: ORDER_SAVE_ID_FAIL, payload: error });
      });
  };
// ----------------------   get Orders ids from firestore   ----------------------------
export const getOrdersIds = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_GET_ID_REQUEST });

  const { userInfo } = getState().userLogin;
  try {
    await firebase
      .firestore()
      .collection("orders")
      .doc(userInfo.phoneNumber)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        dispatch({ type: ORDER_GET_ID_SUCCESS, payload: data });
      });
  } catch (error) {
    dispatch({ type: ORDER_GET_ID_FAIL, payload: error });
  }
};
