import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const initialState = {};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
