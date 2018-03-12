import { eventChannel, END } from "redux-saga";
import { take, takeEvery, put, call, cancelled } from "redux-saga/effects";
import { Meteor } from "meteor/meteor";

import { CartActions } from "../actions/Cart-Actions";

function loadCart(action) {
  return eventChannel(emitter => {
    Meteor.call(
      "carts.getCartByUserName",
      action.userName,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          let totalSumToPay = 0;
          response.items.forEach(item => {
            totalSumToPay += parseFloat(item.price) * parseFloat(item.quantity);
          });
          emitter({
            items: response.items,
            totalAmount: totalSumToPay
          });
          emitter(END);
        }
      }
    );
    return () => {};
  });
}

function removeItem(action) {
  return eventChannel(emitter => {
    Meteor.call(
      "merchants.rollBackProductAvailability",
      action.merchantId,
      action.productId,
      action.quantity,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          if (!response) {
            emitter(Error("Product not found"));
            emitter(END);
          }
        }
      }
    );
    Meteor.call(
      "carts.removeItemFromUserCart",
      action.userName,
      action.productId,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          if (!response) {
            emitter(Error("Item could not be removed"));
          }
          emitter(response);
          emitter(END);
        }
      }
    );
    return () => {};
  });
}

function submitOrder(action) {
  return eventChannel(emitter => {
    Meteor.call("orders.insertOrder", action.order, (error, response) => {
      if (error) {
        emitter(error);
        emitter(END);
      } else {
        emitter(response);
        emitter(END);
      }
    });
    Meteor.call(
      "carts.emptyUserCart",
      action.order.userName,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          if (!response) {
            emitter(Error("UserName's cart not found"));
          }
          emitter(response);
          emitter(END);
        }
      }
    );
    return () => {};
  });
}

export function* initiateCartCalls(action) {
  yield put(CartActions.setDataFlag(false));
  const cartCall = yield call(loadCart, action);
  try {
    while (true) {
      const cartResponse = yield take(cartCall);
      yield put(CartActions.setCartData(cartResponse));
    }
  } catch (e) {
    yield put(CartActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      cartCall.close();
    }
  }
}

export function* removeCartItemCalls(action) {
  yield put(CartActions.setDataFlag(false));
  const cartCall = yield call(removeItem, action);
  try {
    while (true) {
      const cartResponse = yield take(cartCall);
      yield put(CartActions.showMessage("Item removed from your cart", false));
      yield put(
        CartActions.removeCartItemSuccess(
          action.productId,
          action.price,
          action.quantity
        )
      );
    }
  } catch (e) {
    yield put(CartActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      cartCall.close();
    }
  }
}

export function* submitOrderCalls(action) {
  yield put(CartActions.setDataFlag(false));
  const cartCall = yield call(submitOrder, action);
  try {
    while (true) {
      yield take(cartCall);
      yield put(CartActions.submitOrderSuccess());
      yield put(CartActions.showMessage("Order submitted!", false));
    }
  } catch (e) {
    yield put(CartActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      cartCall.close();
    }
  }
}

export default function* CartSagas() {
  yield takeEvery("INITIATE_CART_CALLS", initiateCartCalls);
  yield takeEvery("REMOVE_CART_ITEM_CALLS", removeCartItemCalls);
  yield takeEvery("SUBMIT_ORDER_CALLS", submitOrderCalls);
}
