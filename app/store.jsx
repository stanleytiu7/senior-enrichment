import {combineReducers, createStore, applyMiddleware } from 'redux';
import rootReducer from './redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import creators from './action-creators.jsx';

//// state is here
//const initalState = {};


//const reducer1 = (state={}, actions) =>{};
//const reducer2 = (state={}, acitons) =>{};

//const reducers = combineReducers({
  //user: userReducer,
  //tweets: tweetsReducer
//})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
