import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import products from "./products";
const rootReducer = combineReducers({
  auth,
  profile,
  products,
});

export default rootReducer;
