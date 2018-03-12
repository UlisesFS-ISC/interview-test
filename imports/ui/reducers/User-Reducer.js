
const initialState = {
    userOrders: [],
    userData: {},
    dataLoadFlag: false,
    errorMessage: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET_USER_DATA' :
        {
            let userOrders = action.data.userOrders;
            let userData = action.data.userData;

            return {
                ...state,
                dataLoadFlag: true,
                userOrders: userOrders,
                userData: userData
            };
        }

        case 'SHOW_MESSAGE' :
        {
            let errorMessage = action.errorMessage;

            return {
                ...state,
                errorMessage: errorMessage,
                dataLoadFlag: true
            };
        }

        case 'CLEAN_MESSAGES' :
            return {
                ...state,
                errorMessage: null
            };

        default:
            return state
    }
};

export default UserReducer;
