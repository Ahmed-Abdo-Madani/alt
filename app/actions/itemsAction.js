import firebase from "firebase/app";
import "firebase/firestore";

import cache from "../utility/cache";
import {
  HOME_SCREEN_ITEMS_REQUSET,
  HOME_SCREEN_ITEMS_SUCCESS,
  HOME_SCREEN_ITEMS_FAIL,
} from "../constants/itemsConstants";

export const getHomeItems = (refresh = false) => async (dispatch) => {
  const cache_storage_key = "homeItems";
  dispatch({ type: HOME_SCREEN_ITEMS_REQUSET });
  const data = await cache.get(cache_storage_key);
  if (data && !refresh) {
    dispatch({ type: HOME_SCREEN_ITEMS_SUCCESS, payload: data });
  } else  {
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
          cache.store(cache_storage_key, items);
        });
    } catch (error) {
      dispatch({ type: HOME_SCREEN_ITEMS_FAIL, payload: error });
    }
  }
};
