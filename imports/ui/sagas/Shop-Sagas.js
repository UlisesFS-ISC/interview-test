import { eventChannel, END } from "redux-saga";
import { take, takeEvery, put, call, cancelled } from "redux-saga/effects";
import { Meteor } from "meteor/meteor";

import { ShopActions } from "../actions/Shop-Actions";

function loadMerchants(action) {
  return eventChannel(emitter => {
    let merchants;
    Meteor.call(
      "merchants.getMerchantsWithPagination",
      action.start,
      action.end,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          merchants = response;
        }
      }
    );
    Meteor.call("merchants.getMerchantsCount", (error, response) => {
      if (error) {
        emitter(error);
        emitter(END);
      } else {
        emitter({
          merchants: merchants,
          limit: response / 4,
          index: action.end
        });
        emitter(END);
      }
    });
    return () => {};
  });
}

export function* initiateMerchantCalls(action) {
  yield put(ShopActions.setDataFlag(false));
  const merchantsCall = yield call(loadMerchants, action);
  try {
    while (true) {
      const merchantsResponse = yield take(merchantsCall);
      yield put(ShopActions.setMerchantData(merchantsResponse));
    }
  } catch (e) {
    yield put(ShopActions.showMessage(e.message, true));
  } finally {
    if (yield cancelled()) {
      merchantsCall.close();
    }
  }
}

export default function* ShopSagas() {
  yield takeEvery("INITIATE_MERCHANT_CALLS", initiateMerchantCalls);
}
