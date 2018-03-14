import React from "react";
import { connect } from "react-redux";

import { NavigationActions } from "../../actions/Navigation-Actions";
import Page from "./Page";

const mapStateToProps = state => {
  return {
    modalTitle: state.Navigation.modalTitle,
    serviceErrorFlag: state.Navigation.serviceErrorFlag,
    message: state.Navigation.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanMessage: () => dispatch(NavigationActions.cleanMessage())
  };
};

const PageContainer = connect(mapStateToProps, mapDispatchToProps)(Page);

export default PageContainer;
