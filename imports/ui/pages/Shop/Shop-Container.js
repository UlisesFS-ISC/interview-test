import React from "react";
import { connect } from "react-redux";

import { ShopActions } from "../../actions/Shop-Actions";
import { ProductActions } from "../../actions/Product-Actions";
import { CartActions } from "../../actions/Cart-Actions";
import Shop from "./Shop";

const mapStateToProps = state => {
  return {
    merchants: state.Shop.merchants,
    index: state.Shop.index,
    limit: state.Shop.limit,
    dataLoadFlag: state.Shop.dataLoadFlag,
    likeDataLoadFlag: state.Product.dataLoadFlag,
    cartDataLoadFlag: state.Cart.dataLoadFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateMerchantCalls: (start, end) =>
      dispatch(ShopActions.initiateMerchantCalls(start, end)),
    initiateProductCalls: () => dispatch(ProductActions.initiateProductCalls()),
    initiateCartCalls: userName =>
      dispatch(CartActions.initiateCartCalls(userName)),
    setDataFlag: dataLoadFlag =>
      dispatch(ShopActions.setDataFlag(dataLoadFlag)),
    setLikesDataFlag: dataLoadFlag =>
      dispatch(ProductActions.setDataFlag(dataLoadFlag))
  };
};

const ShopContainer = connect(mapStateToProps, mapDispatchToProps)(Shop);

export default ShopContainer;
