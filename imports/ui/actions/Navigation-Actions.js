const showMessage = (title, message, serviceErrorFlag) => {
  return {
    type: "SHOW_MESSAGE",
    title,
    message,
    serviceErrorFlag
  };
};

const cleanMessage = () => {
  return {
    type: "CLEAN_MESSAGE"
  };
};

export const NavigationActions = {
  showMessage,
  cleanMessage
};
