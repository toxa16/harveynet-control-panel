import { put, take } from 'redux-saga/effects';
import qs from 'qs';

import ActionType from './action-type.enum';

export default function* appSaga() {
  const query = qs.parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  );

  if (query.username) {
    yield put({
      type: ActionType.LOGIN_SUCCESS,
      payload: {
        username: query.username,
      }
    });
    yield take(ActionType.LOGOUT_REQUEST);
    window.history.pushState({}, '', '/');
    yield put({ type: ActionType.LOGOUT_SUCCESS });
  }

  while (true) {
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    const username2 = loginRequest.payload.username;
    window.history.pushState(
      {}, '', `/?username=${username2}`,
    );
    yield put({
      type: ActionType.LOGIN_SUCCESS,
      payload: {
        username: username2,
      },
    });

    yield take(ActionType.LOGOUT_REQUEST);
    window.history.pushState({}, '', '/');
    yield put({ type: ActionType.LOGOUT_SUCCESS });
  }
}
