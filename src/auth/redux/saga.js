import { call, take } from 'redux-saga/effects';

import AuthAction from './action-type';
import panelSaga from '../../panel/redux/saga';


export default function* authSaga() {
  const action = yield take(AuthAction.AUTHENTICATE);
  const { accessToken } = action.payload;
  yield call(panelSaga, accessToken);
}
