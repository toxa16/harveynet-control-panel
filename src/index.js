import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import appReducer from './app-reducer';
import ConnectedApp from './connected-app';
import appSaga from './app-saga';
import App from './app';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware),
);
//sagaMiddleware.run(appSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
