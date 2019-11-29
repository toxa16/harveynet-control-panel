import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import appReducer from './app-reducer';
import ConnectedApp from './connected-app';
import appSaga from './app-saga';
import sessionReducer from './session/reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    session: sessionReducer,
  }),
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(appSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
