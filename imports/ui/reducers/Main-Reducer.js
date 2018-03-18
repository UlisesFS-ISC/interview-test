import { combineReducers } from "redux";

import Cart from "./Cart-Reducer";
import Navigation from "./Navigation-Reducer";
import Product from "./Product-Reducer";
import Shop from "./Shop-Reducer";
import User from "./User-Reducer";

const MainReducer = combineReducers({
  Cart,
  Product,
  Navigation,
  Shop,
  User
});

export default MainReducer;
