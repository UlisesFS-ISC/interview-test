// Framework
import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import * as firebase from "firebase";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

// Libraries
import "bootstrap/dist/css/bootstrap.css";

// Client Imports
import Routes from "../../ui/Routes.jsx";
import MainReducer from "../../ui/reducers/Main-Reducer";
import rootSaga from "../../ui/sagas/Main-Sagas";

// Actual Rendering Function
const renderApp = () => {
  const sagaMiddleware = createSagaMiddleware();
  let store = createStore(
    MainReducer,
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  sagaMiddleware.run(rootSaga);
  render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById("render-target")
  );
};

// Start App
// Unadvised exposure of apikey in prod environment TODO : run grunt Encryption for ApiKey
Meteor.startup(() => {
  firebase.initializeApp({
    apiKey: "AIzaSyBJ2FxMWnSs9jTQQt0n7dEy2z20otd1-DI",
    storageBucket: "interview-test-e52ba.appspot.com",
    authDomain: "interview-test-e52ba.firebaseapp.com"
  });
  renderApp();
});
