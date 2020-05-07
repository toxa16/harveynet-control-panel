import { call, take } from 'redux-saga/effects';

import AuthAction from './action-type';
import panelSaga from '../../panel/redux/saga';


export default function* authSaga({ ownershipClient }) {
  yield take(AuthAction.AUTHENTICATE);
  yield call(panelSaga, ownershipClient);
}
