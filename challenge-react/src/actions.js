export const actionTypes = {
  setMessage: 'SET_MESSAGE',
  setCharities: 'SET_CHARITIES',
  setPayments: 'SET_PAYMENTS',
  addPayment: 'ADD_PAYMENT',
};

const setMessage = (message) => ({
  type: actionTypes.setMessage,
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
  setMessage,
  setCharities,
  setPayments,
  addPayment,
};
