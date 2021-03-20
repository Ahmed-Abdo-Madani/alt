import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import cache from "./utility/cache";
import { userLoginReducer } from "./reducers/userReducers";
import { getHomeScreenItemsReducer } from "./reducers/itemsReducers";
import { cartAddReducer } from "./reducers/cartReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  getHomeScreenItems: getHomeScreenItemsReducer,
  cart: cartAddReducer,
});

const cartItemsFromStorage = cache.get("cartItems")
  ? cache.get("cartItems")
  : [];
const userInfoFromStorage = cache.get("user") ? cache.get("user") : null;
const shippingAddressFromStorage = cache.get("shippingAddress")
  ? cache.get("shippingAddress")
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
