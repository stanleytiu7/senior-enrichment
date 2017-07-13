import {
  createStore,
  applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './redux';

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)))
