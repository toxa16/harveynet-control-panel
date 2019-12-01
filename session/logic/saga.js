import { delay, put } from 'redux-saga/effects';

import SessionActionType from './action-type.enum';

export default function* sessionSaga() {
  // simulating websocket open latency
  yield delay(500);
  // simulating websocket "open" event
  yield put({ type: SessionActionType.WEBSOCKET_OPEN });
}
