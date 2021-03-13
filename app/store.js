import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userLoginReducer } from "./reducers/userReducers";
import { getHomeScreenItemsReducer } from "./reducers/itemsReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  getHomeScreenItems: getHomeScreenItemsReducer,
});

const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
