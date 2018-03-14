const initialState = {
  items: [],
  totalAmount: 0,
  dataLoadFlag: false,
  serviceErrorFlag: false,
  message: null
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA_FLAG": {
      return { ...state, dataLoadFlag: action.dataLoadFlag };
    }

    case "SET_CART_DATA": {
      let items = action.data.items;
      let totalAmount = action.data.totalAmount;
      return {
        ...state,
        totalAmount: totalAmount,
        items: items,
        dataLoadFlag: true
      };
    }

    case "REMOVE_CART_ITEM_SUCCESS": {
      let newUserCartItems = state.items.filter(item => {
        return item.productId !== action.productId;
      });
      let newTotalAmount =
        state.totalAmount -
        parseFloat(action.price) * parseFloat(action.quantity);

      return {
        ...state,
        totalAmount: newTotalAmount,
        items: newUserCartItems,
        dataLoadFlag: true
      };
    }

    case "SUBMIT_ORDER_SUCCESS": {
      return {
        ...state,
        totalAmount: 0,
        items: [],
        dataLoadFlag: true
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
