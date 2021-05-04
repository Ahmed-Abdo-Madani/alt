import firebase from "firebase/app";
import "firebase/firestore";
import {
  SEND_ORDER_NOTIFICATION_REQUEST,
  SEND_ORDER_NOTIFICATION_FAIL,
  SEND_ORDER_NOTIFICATION_SUCCESS,
  GET_ADMIN_FAIL,
  GET_ADMIN_REQUEST,
  GET_ADMIN_SUCCESS,
} from "../constants/notificationsConstants";
import cache from "../utility/cache";

export const send_Order_Notification = (data) => async (dispatch, getState) => {
  dispatch({
    type: SEND_ORDER_NOTIFICATION_REQUEST,
  });
  let expoPushTokens = getState().notifications.admins.map(
    (admin) => admin.pushToken.expoPushToken
  );
  const message = {
    to: expoPushTokens,
    sound: "default",
    title: `${data.userInfo.userName} Made an order 😍😍😍🎉🎉🎊`,
    body: `phone number is : ${data.userInfo.phoneNumber} , To the Moon  🚀`,
    data: { _displayInForeground: true, data },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    dispatch({
      type: SEND_ORDER_NOTIFICATION_SUCCESS,
      payload: true,
    });
  } catch (error) {
    dispatch({
      type: SEND_ORDER_NOTIFICATION_FAIL,
      payload: `Send Order Notifications Error : ${error}`,
    });
  }
};

export const getAdmins = () => async (dispatch) => {
  dispatch({ type: GET_ADMIN_REQUEST });
  const admins_inCahe = await cache.get("admins");
  try {
    if (!admins_inCahe) {
      await firebase
        .firestore()
        .collection("admins")
        .get()
        .then((snapshot) => {
          let admins = [];
          snapshot.docs.forEach((doc) =>
            admins.push({ id: doc.id, pushToken: doc.data() })
          );

          dispatch({ type: GET_ADMIN_SUCCESS, payload: admins });
          cache.store("admins", admins);
        });
    } else {
      dispatch({ type: GET_ADMIN_SUCCESS, payload: admins_inCahe });
    }
  } catch (error) {
    dispatch({ type: GET_ADMIN_FAIL, payload: error });
  }
};
