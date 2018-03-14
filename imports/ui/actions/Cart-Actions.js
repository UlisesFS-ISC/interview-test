const setDataFlag = dataLoadFlag => {
  return {
    type: "SET_DATA_FLAG",
    dataLoadFlag
  };
};

const initiateCartCalls = userName => {
  return {
    type: "INITIATE_CART_CALLS",
    userName
  };
};

const setCartData = data => {
  return {
    type: "SET_CART_DATA",
    data
  };
};

const submitOrderCalls = order => {
  return {
    type: "SUBMIT_ORDER_CALLS",
    order
  };
};

const submitOrderSuccess = () => {
  return {
    type: "SUBMIT_ORDER_SUCCESS"
  };
};

const removeCartItemCalls = (
  userName,
  productId,
  merchantId,
  price,
  quantity
) => {
  return {
    type: "REMOVE_CART_ITEM_CALLS",
    userName,
    productId,
    merchantId,
    price,
    quantity
  };
};

const removeCartItemSuccess = (productId, price, quantity) => {
  return {
    type: "REMOVE_CART_ITEM_SUCCESS",
    productId,
    price,
    quantity
  };
};

export const CartActions = {
  setDataFlag,
  initiateCartCalls,
  setCartData,
  submitOrderCalls,
  submitOrderSuccess,
  removeCartItemCalls,
  removeCartItemSuccess
};
