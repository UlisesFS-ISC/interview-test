const initialState = {
  merchants: [],
  index: 0,
  limit: 0,
  dataLoadFlag: false,
  serviceErrorFlag: false,
  message: null
};

const ShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_FLAG": {
      return { ...state, dataLoadFlag: action.dataLoadFlag };
    }

    case "SET_MERCHANT_DATA": {
      let merchants = action.data.merchants;
      let limit = action.data.limit;
      let index = action.data.index;

      return {
        ...state,
        dataLoadFlag: true,
        merchants: merchants,
        limit: limit,
        index: index
      };
    }

    case "SHOW_MESSAGE": {
      let message = action.message;
      let serviceErrorFlag = action.serviceErrorFlag;

      return {
        ...state,
        message: message,
        serviceErrorFlag: serviceErrorFlag,
        dataLoadFlag: true
      };
    }

    case "CLEAN_MESSAGES":
      return {
        ...state,
        serviceErrorFlag: false,
        message: null
      };

    default:
      return state;
  }
};

export default ShopReducer;
