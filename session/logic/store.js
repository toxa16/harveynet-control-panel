import { createStore } from 'redux';

import sessionReducer from './reducer';

const sessionStore = createStore(
  sessionReducer,
);

export default sessionStore;
