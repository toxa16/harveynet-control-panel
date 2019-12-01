import { createStore } from 'redux';

import sessionReducer from './reducer';

const store = createStore(
  sessionReducer,
);

export default store;
