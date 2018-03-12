import { combineReducers } from "redux";

import Cart from "./Cart-Reducer";
import User from "./User-Reducer";
import Shop from "./Shop-Reducer";

const MainReducer = combineReducers({
  Cart,
  Shop,
  User
});

export default MainReducer;
