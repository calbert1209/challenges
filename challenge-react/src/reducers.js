import { actionTypes } from './actions';

export const mainReducer = (state, action) => {
  const _state =
    state == null
      ? {
          message: '',
          charities: [],
          payments: [],
          error: null,
        }
      : state;

  switch (action.type) {
    case actionTypes.setMessage:
      return { ..._state, message: action.message };

    case actionTypes.setCharities:
      return { ..._state, charities: action.charities };

    case actionTypes.setPayments:
      return { ..._state, payments: action.payments };

    case actionTypes.addPayment:
      const payments = [..._state.payments, action.payment];
      return { ..._state, payments };

    default:
      return _state;
  }
};
