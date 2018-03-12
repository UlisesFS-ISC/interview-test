const initiateUserCalls = userName => {
  return {
    type: "INITIATE_USER_CALLS",
    userName
  };
};

const setUserData = data => {
  return {
    type: "SET_USER_DATA",
    data
  };
};

const showMessage = (message, serviceErrorFlag) => {
  return {
    type: "SHOW_MESSAGE",
    message,
    serviceErrorFlag
  };
};

const cleanMessage = () => {
  return {
    type: "CLEAN_MESSAGES"
  };
};

const logOut = () => {
  return {
    type: "LOG_OUT"
  };
};

export const UserActions = {
  initiateUserCalls,
  setUserData,
  showMessage,
  cleanMessage,
  logOut
};
