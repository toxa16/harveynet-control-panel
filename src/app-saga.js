import { call, put, take } from 'redux-saga/effects';
import qs from 'qs';

import ActionType from './action-type.enum';

/**
 * Logout saga.
 */
function* logout() {
  yield take(ActionType.LOGOUT_REQUEST);
  window.history.pushState({}, '', '/');
  yield put({ type: ActionType.LOGOUT_SUCCESS });
}

/**
 * Login saga.
 * @param {string} username
 */
function* login(username) {
  yield put({
    type: ActionType.LOGIN_SUCCESS,
    payload: { username },
  });
  const ownershipServerUrl = process.env.REACT_APP_OWNERSHIP_SERVER_URL ||
    'https://harveynet-ownership-server.herokuapp.com';
  const url = `${ownershipServerUrl}/me/machines?username=${username}`;
  const response = yield call(fetch, url);
  const data = yield response.json();
  const machines = data.data;
  yield put({
    type: ActionType.MACHINES_FETCH_SUCCESS,
    payload: { machines },
  });
}

/**
 * App (root) saga.
 */
export default function* appSaga() {
  const query = qs.parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  );

  const queryUsername = query.username;
  if (queryUsername) {
    yield login(queryUsername);
    yield call(logout);
  }

  while (true) {
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    const actionUsername = loginRequest.payload.username;
    window.history.pushState(
      {}, '', `/?username=${actionUsername}`,
    );
    yield login(actionUsername)
    yield call(logout);
  }
}
