import React from "react";
import { connect } from "react-redux";

import { CartActions } from "../../actions/Cart-Actions";
import Cart from "./Cart";

const mapStateToProps = state => {
  return {
    items: state.Cart.items,
    totalAmount: state.Cart.totalAmount,
    dataLoadFlag: state.Cart.dataLoadFlag,
    serviceErrorFlag: state.Cart.serviceErrorFlag,
    message: state.Cart.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateCartCalls: userName =>
      dispatch(CartActions.initiateCartCalls(userName)),
    removeCartItemCalls: (userName, productId, merchantId, price, quantity) =>
      dispatch(
        CartActions.removeCartItemCalls(
          userName,
          productId,
          merchantId,
          price,
          quantity
        )
      ),
    submitOrderCalls: order => dispatch(CartActions.submitOrderCalls(order)),
    cleanMessage: () => dispatch(CartActions.cleanMessage())
  };
};

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartContainer;
