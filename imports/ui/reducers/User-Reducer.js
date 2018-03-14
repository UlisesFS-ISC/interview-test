const initialState = {
  userOrders: [],
  userData: {},
  dataLoadFlag: false,
  errorMessage: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      let userOrders = action.data.userOrders;
      let userData = action.data.userData;

      return {
        ...state,
        dataLoadFlag: true,
        userOrders: userOrders,
        userData: userData
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
