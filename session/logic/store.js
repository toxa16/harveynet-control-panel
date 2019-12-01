import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sessionReducer from './reducer';
import sessionSaga from './saga';

const sagaMiddleware = createSagaMiddleware();
const sessionStore = createStore(
  sessionReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(sessionSaga);

export default sessionStore;
