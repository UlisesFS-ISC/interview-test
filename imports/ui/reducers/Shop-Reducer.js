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
        merchants: merchants,
        limit: limit,
        index: index,
        dataLoadFlag: true
      };
    }

    default:
      return state;
  }
};

export default ShopReducer;
