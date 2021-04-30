import {
  SEND_ORDER_NOTIFICATION_REQUEST,
  SEND_ORDER_NOTIFICATION_FAIL,
  SEND_ORDER_NOTIFICATION_SUCCESS,
} from "../constants/notificationsConstants";

export const send_Order_Notification = (expoPushToken) => async (dispatch) => {
  dispatch({
    type: SEND_ORDER_NOTIFICATION_REQUEST,
  });

  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
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
