// Framework
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  browserHistory
} from "react-router-dom";

// Pages
import Shop from "./pages/Shop/Shop.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import User from "./pages/User/User.jsx";

const Routes = () =>
  <Router history={browserHistory}>
    <div>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/cart" component={Cart} />
        <Route path="/user" component={User} />
    </div>
  </Router>;

export default Routes;
