import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userLoginReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
});

const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
