import { eventChannel, END } from "redux-saga";
import { take, takeEvery, put, call, cancelled } from "redux-saga/effects";
import { Meteor } from "meteor/meteor";
import { authHandler } from "../../api/authentication/auth-handler";

import { UserActions } from "../actions/User-Actions";

function loadUserInformation(action) {
  return eventChannel(emitter => {
    let userData;
    Meteor.call(
      "users.getUserByUserName",
      action.userName,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          userData = response;
        }
      }
    );
    Meteor.call(
      "orders.getOrdersByUserName",
      action.userName,
      (error, response) => {
        if (error) {
          emitter(error);
          emitter(END);
        } else {
          emitter({
            userData: userData,
            userOrders: response
          });
          emitter(END);
        }
      }
    );
    return () => {};
  });
}

export function* initiateUserCalls(action) {
  const userCall = yield call(loadUserInformation, action);
  try {
    while (true) {
      const userResponse = yield take(userCall);
      yield put(UserActions.setUserData(userResponse));
    }
  } catch (e) {
    yield put(UserActions.showMessage(e.message));
  } finally {
    if (yield cancelled()) {
      userCall.close();
    }
  }
}

export function* logOut() {
  const auth = new authHandler();
  auth.logout();
}

export default function* UserSagas() {
  yield takeEvery("INITIATE_USER_CALLS", initiateUserCalls);
  yield takeEvery("LOG_OUT", logOut);
}
