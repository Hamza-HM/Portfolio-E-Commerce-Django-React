import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import products from "./products";
import cart from "./cart";
import payment from "./payment";
const rootReducer = combineReducers({
  auth,
  profile,
  products,
  cart,
  payment,
});

export default rootReducer;
