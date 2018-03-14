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

const logOut = () => {
  return {
    type: "LOG_OUT"
  };
};

export const UserActions = {
  initiateUserCalls,
  setUserData,
  logOut
};
