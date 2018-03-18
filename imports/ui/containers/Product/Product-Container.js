import React from "react";
import { connect } from "react-redux";
import { Session } from "meteor/session";
import { List } from "immutable";

import { ProductActions } from "../../actions/Product-Actions";
import { NavigationActions } from "../../actions/Navigation-Actions";
import Product from "./Product";

const mapStateToProps = (state, ownProps) => {
  let numberOfLikes = (numberOfLikes = state.Product.likes.get(
    ownProps.id,
    new List()
  ).size);
  let isOnCart = state.Cart.items.find(item => item.productId === ownProps.id);
  let likedByUser = state.Product.likes
    .get(ownProps.id, new List())
    .find(likeEntry => likeEntry.userName === Session.get("user"));

  return {
    isOnCart: isOnCart !== undefined,
    likedByUser: likedByUser !== undefined,
    numberOfLikes,
    dataLoadFlag: state.Product.dataLoadFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitLikeCalls: (likeEntry, likedByUser) =>
      dispatch(ProductActions.submitLikeCalls(likeEntry, likedByUser)),
    submitCartItemCalls: (userName, cartEntry, newStockValue) =>
      dispatch(
        ProductActions.submitCartItemCalls(userName, cartEntry, newStockValue)
      ),
    showMessage: (title, message, errorFlag) =>
      dispatch(NavigationActions.showMessage(title, message, errorFlag))
  };
};

const ProductContainer = connect(mapStateToProps, mapDispatchToProps)(Product);

export default ProductContainer;
