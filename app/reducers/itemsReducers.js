import {
  HOME_SCREEN_ITEMS_REQUSET,
  HOME_SCREEN_ITEMS_SUCCESS,
  HOME_SCREEN_ITEMS_FAIL,
} from "../constants/itemsConstants";

export const getHomeScreenItemsReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case HOME_SCREEN_ITEMS_REQUSET:
      return {
        loading: true,
        items: [],
      };

    case HOME_SCREEN_ITEMS_SUCCESS:
      return {
        loading: false,
        items: action.payload,
      };
    case HOME_SCREEN_ITEMS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
