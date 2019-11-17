import { put, take } from 'redux-saga/effects';
import qs from 'qs';

import ActionType from './action-type.enum';

export default function* appSaga() {
  const query = qs.parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  );

  if (query.username) {
    yield put({ type: ActionType.LOGIN_SUCCESS });
    yield take(ActionType.LOGOUT_REQUEST);
    window.history.pushState({}, '', '/');
    yield put({ type: ActionType.LOGOUT_SUCCESS });
  }

  while (true) {
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    window.history.pushState(
      {}, '', `/?username=${loginRequest.payload.username}`,
    );
    yield put({ type: ActionType.LOGIN_SUCCESS });
    
    yield take(ActionType.LOGOUT_REQUEST);
    window.history.pushState({}, '', '/');
    yield put({ type: ActionType.LOGOUT_SUCCESS });
  }
}
