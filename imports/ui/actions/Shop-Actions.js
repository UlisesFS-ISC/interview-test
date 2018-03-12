
const setDataFlag = (dataLoadFlag) => {
    return {
        type: 'SET_DATA_FLAG',
        dataLoadFlag
    }
};

const initiateMerchantCalls = (start, end) => {
    return {
        type: 'INITIATE_MERCHANT_CALLS',
        start,
        end
    }
};

const setMerchantData = (data) => {
    return {
        type: 'SET_MERCHANT_DATA',
        data
    }
};

const showMessage = (message, serviceErrorFlag) => {
    return {
        type: 'SHOW_MESSAGE',
        message,
        serviceErrorFlag
    }
};

const cleanMessage = () => {
    return {
        type: 'CLEAN_MESSAGES'
    }
};


export const ShopActions = {
    setDataFlag,
    initiateMerchantCalls,
    setMerchantData,
    showMessage,
    cleanMessage
};