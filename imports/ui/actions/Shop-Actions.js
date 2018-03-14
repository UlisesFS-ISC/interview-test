const setDataFlag = dataLoadFlag => {
  return {
    type: "SET_DATA_FLAG",
    dataLoadFlag
  };
};

const initiateMerchantCalls = (start, end) => {
  return {
    type: "INITIATE_MERCHANT_CALLS",
    start,
    end
  };
};

const setMerchantData = data => {
  return {
    type: "SET_MERCHANT_DATA",
    data
  };
};

export const ShopActions = {
  setDataFlag,
  initiateMerchantCalls,
  setMerchantData
};
