import { combineReducers } from "redux";

import Cart from "./Cart-Reducer";
import Navigation from "./Navigation-Reducer";
import Shop from "./Shop-Reducer";
import User from "./User-Reducer";

const MainReducer = combineReducers({
  Cart,
  Navigation,
  Shop,
  User
});

export default MainReducer;
