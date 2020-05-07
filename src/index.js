import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import './index.css';
import appReducer from './app-reducer';
import ConnectedApp from './connected-app';
import App from './app';
import auth from './auth/redux/reducer';
import panel from './panel/redux/reducer';
import authSaga from './auth/redux/saga';
import OwnershipClient from './utils/ownership-client';


const reducer = combineReducers({
  auth,
  panel,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);
const ownershipClient = new OwnershipClient();
sagaMiddleware.run(authSaga, { ownershipClient });


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
