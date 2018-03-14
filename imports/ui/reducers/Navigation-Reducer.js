const initialState = {
  modalTitle: null,
  serviceErrorFlag: false,
  message: null
};

const NavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_MESSAGE": {
      let modalTitle = action.title;
      let message = action.message;
      let serviceErrorFlag = action.serviceErrorFlag;

      return {
        modalTitle: modalTitle,
        message: message,
        serviceErrorFlag: serviceErrorFlag
      };
    }

    case "CLEAN_MESSAGE":
      return {
        modalTitle: null,
        serviceErrorFlag: false,
        message: null
      };

    default:
      return state;
  }
};

export default NavigationReducer;
