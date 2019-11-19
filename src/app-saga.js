import { call, cancel, delay, fork, put, putResolve, take } from 'redux-saga/effects';
import qs from 'qs';

import ActionType from './action-type.enum';

/**
 * Logout saga.
 */
function* logout() {
  //yield take(ActionType.LOGOUT_REQUEST);
  window.history.replaceState({}, '', '/');
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
  // fetching user's owned machines
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
  // opening machine control screen
  const machineControlTask = yield fork(machineControl);
  yield take(ActionType.LOGOUT_REQUEST);
  yield cancel(machineControlTask);
}

/**
 * Machine control screen saga.
 */
function* machineControl() {
  while (true) {
    const machineSelect = yield take(ActionType.MACHINE_SELECT);
    const machineId = machineSelect.payload.machine.id;
    console.log({machineId});
    yield take(ActionType.MACHINE_CONTROL_EXIT);
  }
}

function* authSaga() {
  console.log('calling auth saga');
  while (true) {
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    const username = loginRequest.payload.username;
    window.history.replaceState(
      {}, '', `/?username=${username}`,
    );
    yield put({
      type: ActionType.LOGIN_SUCCESS,
      payload: { username },
    });
    
    yield take(ActionType.LOGOUT_REQUEST);
    window.history.replaceState({}, '', '/');
    yield put({ type: ActionType.LOGOUT_SUCCESS });
  }
}

/**
 * App (root) saga.
 */
export default function* appSaga() {
  const query = qs.parse(
    window.location.search,
    { ignoreQueryPrefix: true },
  );

  yield fork(authSaga);

  const queryUsername = query.username;
  if (queryUsername) {
    yield put({
      type: ActionType.LOGIN_REQUEST,
      payload: {
        username: queryUsername,
      }
    });
    console.log('login request')
    //yield login(queryUsername);
    //yield call(logout);
  }

  

  /*while (true) {
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    const actionUsername = loginRequest.payload.username;
    window.history.replaceState(
      {}, '', `/?username=${actionUsername}`,
    );
    yield login(actionUsername)
    yield call(logout);
  }*/
}
