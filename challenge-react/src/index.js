import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {App} from './App.jsx';
import {actionTypes} from './actions';

const store = createStore((state, action) => {
  const _state =
    state == null
      ? {
          donationTotal: 0,
          message: '',
        }
      : state;

  switch (action.type) {
    case actionTypes.updateDonationTotal:
      const donationTotal = _state.donationTotal + action.donationTotal;
      return {..._state, donationTotal};
    case actionTypes.updateMessage:
      return {..._state, message: action.message};

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
