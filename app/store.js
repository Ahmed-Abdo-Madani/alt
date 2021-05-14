import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer } from "./reducers/userReducers";
import { getHomeScreenItemsReducer } from "./reducers/itemsReducers";
import { cartAddReducer } from "./reducers/cartReducers";
import { userPaymentReducer } from "./reducers/paymentReducers";
import { shippingReducer } from "./reducers/ShippingReducers";
import { notificationsReducer } from "./reducers/notificationsReducers";
import { ordersReducers } from "./reducers/ordersReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  getHomeScreenItems: getHomeScreenItemsReducer,
  cart: cartAddReducer,
  userPayment: userPaymentReducer,
  shipping: shippingReducer,
  notifications: notificationsReducer,
  orders: ordersReducers,
});

const initialState = {};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
