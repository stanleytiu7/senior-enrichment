import React from 'react';
import ReactDOM from 'react-dom';
import {
  Provider
} from 'react-redux';
import Routes from './routes';
import store from './store'

import Home from './components/Home';
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
);
