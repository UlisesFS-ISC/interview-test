import React from "react";
import { connect } from "react-redux";

import { UserActions } from "../../actions/User-Actions";
import User from "./User";

const mapStateToProps = state => {
  return {
    userOrders: state.User.userOrders,
    userData: state.User.userData,
    dataLoadFlag: state.User.dataLoadFlag
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateUserCalls: userName =>
      dispatch(UserActions.initiateUserCalls(userName)),
    logOut: () => dispatch(UserActions.logOut())
  };
};

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;
