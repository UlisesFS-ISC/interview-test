const setDataFlag = dataLoadFlag => {
  return {
    type: "SET_DATA_FLAG",
    dataLoadFlag
  };
};

const initiateProductCalls = () => {
  return {
    type: "INITIATE_PRODUCT_CALLS"
  };
};

const setLikesData = data => {
  return {
    type: "SET_LIKES_DATA",
    data
  };
};

const submitLikeCalls = (likeEntry, likedByUser) => {
  return {
    type: "SUBMIT_LIKE_CALLS",
    likeEntry,
    likedByUser
  };
};

const submitLikeSuccess = (likeEntry, likedByUser) => {
  return {
    type: "SUBMIT_LIKE_SUCCESS",
    likeEntry,
    likedByUser
  };
};

const submitCartItemCalls = (userName, cartEntry, newStockValue) => {
  return {
    type: "SUBMIT_CART_ITEM_CALLS",
    userName,
    cartEntry,
    newStockValue
  };
};

export const ProductActions = {
  initiateProductCalls,
  setDataFlag,
  setLikesData,
  submitLikeCalls,
  submitLikeSuccess,
  submitCartItemCalls
};
