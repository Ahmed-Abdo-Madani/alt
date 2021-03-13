import firebase from "firebase/app";
import "firebase/firestore";
import {
  HOME_SCREEN_ITEMS_REQUSET,
  HOME_SCREEN_ITEMS_SUCCESS,
  HOME_SCREEN_ITEMS_FAIL,
} from "../constants/itemsConstants";

export const getHomeItems = () => async (dispatch) => {
  dispatch({ type: HOME_SCREEN_ITEMS_REQUSET });
  try {
    await firebase
      .firestore()
      .collection("items")
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.docs.forEach((doc) =>
          items.push({ id: doc.id, data: doc.data() })
        );
        dispatch({ type: HOME_SCREEN_ITEMS_SUCCESS, payload: items });
      });
  } catch (error) {
    dispatch({ type: HOME_SCREEN_ITEMS_FAIL, payload: error });
  }
};
