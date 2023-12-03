import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import products from "./products";
import cart from "./cart";
const rootReducer = combineReducers({
  auth,
  profile,
  products,
  cart,
});

export default rootReducer;
