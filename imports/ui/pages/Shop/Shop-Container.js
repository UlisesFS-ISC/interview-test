import React from "react";
import { connect } from "react-redux";

import { ShopActions } from "../../actions/Shop-Actions";
import Shop from "./Shop";

const mapStateToProps = state => {
  return {
    merchants: state.Shop.merchants,
    index: state.Shop.index,
    limit: state.Shop.limit,
    dataLoadFlag: state.Shop.dataLoadFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateMerchantCalls: (start, end) =>
      dispatch(ShopActions.initiateMerchantCalls(start, end))
  };
};

const ShopContainer = connect(mapStateToProps, mapDispatchToProps)(Shop);

export default ShopContainer;
