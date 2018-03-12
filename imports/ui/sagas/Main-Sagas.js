import { fork } from 'redux-saga/effects';
import Cart from './Cart-Sagas';
import Shop from './Shop-Sagas';
import User from './User-Sagas';

export default function* rootSaga() {
    yield fork(Cart);
    yield fork(Shop);
    yield fork(User);
}
