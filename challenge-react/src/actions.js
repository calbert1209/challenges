export const actionTypes = {
  setMessage: 'UPDATE_MESSAGE',
  setCharities: 'SET_CHARITIES',
  setPayments: 'SET_PAYMENTS',
  addPayment: 'ADD_PAYMENT',
  setError: 'SET_ERROR',
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

// TODO verify arg, and/or provide default values
const setError = (error) => ({
  type: actionTypes.setError,
  error,
});

export const actions = {
  setMessage,
  setCharities,
  setPayments,
  addPayment,
  setError,
};
