import { call, take } from 'redux-saga/effects';

import panelSaga from './panel/redux/saga';
import AuthAction from './auth/redux/action-type';


export default function* appSaga() {
  yield take(AuthAction.AUTHENTICATE);
  yield call(panelSaga);
}
