import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './components/App.jsx';
import { actionTypes } from './actions';

const store = createStore((state, action) => {
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
      return {..._state, charities: action.charities };

    case actionTypes.setPayments:
      return {..._state, payments: action.payments };

    case actionTypes.addPayment:
      const payments = [..._state.payments, action.payment];
      return {..._state, payments};

    case actionTypes.setError:
      return {..._state, error: action.error}

    default:
      return _state;
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
