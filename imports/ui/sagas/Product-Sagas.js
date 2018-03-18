import { eventChannel, END } from "redux-saga";
import { take, takeEvery, put, call, cancelled } from "redux-saga/effects";
import { Meteor } from "meteor/meteor";

import { ProductActions } from "../actions/Product-Actions";
import { CartActions } from "../actions/Cart-Actions";
import { NavigationActions } from "../actions/Navigation-Actions";

function loadLikes(action) {
  return eventChannel(emitter => {
    Meteor.call("likes.getLikes", (error, response) => {
      if (error) {
        emitter(error);
        emitter(END);
      } else {
        emitter(response);
        emitter(END);
      }
    });
    return () => {};
  });
}

function submitLike(action) {
  return eventChannel(emitter => {
    if (!action.likedByUser) {
      Meteor.call("likes.insertLike", action.likeEntry, (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          emitter(response);
          emitter(END);
        }
      });
    } else {
      Meteor.call(
        "likes.removeLike",
        action.likeEntry.productId,
        action.likeEntry.userName,
        (error, response) => {
          if (error) {
            emitter(error);
            emitter(END);
          } else {
            emitter(response);
            emitter(END);
          }
        }
      );
    }
    return () => {};
  });
}

function insertItemIntoCart(action) {
  return eventChannel(emitter => {
    Meteor.call(
      "merchants.setProductAvailability",
      action.cartEntry.merchantId,
      action.cartEntry.productId,
      action.newStockValue,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        }
      }
    );
    Meteor.call(
      "carts.insertCartEntry",
      action.userName,
      action.cartEntry,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          emitter(response);
          emitter(END);
        }
      }
    );
    return () => {};
  });
}
/*
 *Action : empty
 */
export function* initiateProductCalls(action) {
  const productCalls = yield call(loadLikes, action);
  try {
    while (true) {
      const productResponse = yield take(productCalls);
      yield put(ProductActions.setLikesData(productResponse));
    }
  } catch (e) {
    yield put(
      ProductActions.showMessage("Data could not be loaded", e.message, true)
    );
  } finally {
    if (yield cancelled()) {
      productCalls.close();
    }
  }
}
/*
*Action : likeEntry { productId, merchantId, userName}
* *       likedByUser
 */
export function* submitLikeCalls(action) {
  const productCalls = yield call(submitLike, action);
  try {
    while (true) {
      const productResponse = yield take(productCalls);
      yield put(
        ProductActions.submitLikeSuccess(action.likeEntry, action.likedByUser)
      );
    }
  } catch (e) {
    yield put(ProductActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      productCalls.close();
    }
  }
}
/*
 *Action : cartEntry { productId, merchantId, userName, price, quantity}
 * *       newStockValue, userName
 */
export function* submitCartItemCalls(action) {
  const productCalls = yield call(insertItemIntoCart, action);
  try {
    while (true) {
      const productResponse = yield take(productCalls);
      yield put(CartActions.submitCartItemSuccess(action.cartEntry));
      yield put(
        NavigationActions.showMessage(
          `Added ${action.cartEntry.productName}`,
          "Item(s) placed on your cart",
          false
        )
      );
    }
  } catch (e) {
    yield put(ProductActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      productCalls.close();
    }
  }
}

export default function* ProductSagas() {
  yield takeEvery("INITIATE_PRODUCT_CALLS", initiateProductCalls);
  yield takeEvery("SUBMIT_LIKE_CALLS", submitLikeCalls);
  yield takeEvery("SUBMIT_CART_ITEM_CALLS", submitCartItemCalls);
}
