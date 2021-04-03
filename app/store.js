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

const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
