import { call, cancel, cancelled, fork, put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import qs from 'qs';

import ActionType from './action-type.enum';

const ownershipServerUrl = process.env.REACT_APP_OWNERSHIP_SERVER_URL ||
  'https://harveynet-ownership-server.herokuapp.com';

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

function ownershipRequestChannel(username) {
  const url = `${ownershipServerUrl}/me/machines?username=${username}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  return eventChannel(emit => {
    function onLoad(e) {
      const { response } = e.target;
      const data = JSON.parse(response);
      const machines = data.data;
      emit(machines);
      emit(END);
    }
    xhr.addEventListener('load', onLoad);

    return () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        xhr.abort();  // aborting if not completed
      }
      xhr.removeEventListener('load', onLoad);
    }
  });
}
function* machineListSaga(username) {
  const channel = yield call(ownershipRequestChannel, username);
  try {
    while (true) {
      const machines = yield take(channel);
      console.log(machines);
      yield put({
        type: ActionType.MACHINES_FETCH_SUCCESS,
        payload: { machines },
      });
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}

/**
 * Auth saga.
 */
function* authSaga() {
  console.log('calling auth saga');
  while (true) {
    // logging in
    const loginRequest = yield take(ActionType.LOGIN_REQUEST);
    const username = loginRequest.payload.username;
    window.history.replaceState(
      {}, '', `/?username=${username}`,
    );
    yield put({
      type: ActionType.LOGIN_SUCCESS,
      payload: { username },
    });

    // forking machine list saga
    const machineListTask = yield fork(machineListSaga, username);
    
    // logging out
    yield take(ActionType.LOGOUT_REQUEST);
    yield cancel(machineListTask);  // cancelling machine list saga
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
  }
}
