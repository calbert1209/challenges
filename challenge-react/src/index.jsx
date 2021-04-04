import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './components/App.jsx';
import {mainReducer} from './reducers';
import {createLocalProvider} from './locales/locales.jsx';

const store = createStore(mainReducer);
const LocaleProvider = createLocalProvider();

render(
  <Provider store={store}>
    <LocaleProvider locale={'en-US'}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
);
