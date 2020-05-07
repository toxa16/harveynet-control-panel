import { call } from 'redux-saga/effects';

import panelSaga from './panel/redux/saga';


export default function* appSaga() {
  yield call(panelSaga);
}
