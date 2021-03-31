export const actionTypes = {
  updateMessage: 'UPDATE_MESSAGE',
  setCharities: 'SET_CHARITIES',
  setPayments: 'SET_PAYMENTS',
  addPayment: 'ADD_PAYMENT',
};

const updateMessage = (message) => ({
  type: actionTypes.updateMessage,
  message,
});

const setCharities = (charities) => ({
  type: actionTypes.setCharities,
  charities,
});

const setPayments = (payments) => ({
  type: actionTypes.setPayments,
  payments,
});

const addPayment = (payment) => ({
  type: actionTypes.addPayment,
  payment,
});

export const actions = {
  updateMessage,
  setCharities,
  setPayments,
  addPayment,
};
