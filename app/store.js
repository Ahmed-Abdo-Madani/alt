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

const getCahce= async(key) =>{
  const getit =  await cache.get(key)
    if(getit) return getit
  return  null
}
const cartItemsFromStorage = getCahce("cartItems")
const userInfoFromStorage = getCahce("user")
const shippingAddressFromStorage = getCahce("address")
 
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
},
  userLogin: { 
    userInfo: userInfoFromStorage,
    shippingAddress: shippingAddressFromStorage,
   },
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
