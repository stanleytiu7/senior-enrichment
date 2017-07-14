import {
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk

import rootReducer from './redux';

export default createStore(rootReducer, applyMiddleware(thunkMiddleware))
