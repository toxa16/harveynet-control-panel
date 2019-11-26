import { call, cancelled, put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import ActionType from './action-type.enum';
import machineControlSaga from './machine-control-saga';

const ownershipServerUrl = process.env.REACT_APP_OWNERSHIP_SERVER_URL ||
  'https://harveynet-ownership-server.herokuapp.com';

/**
 * A channel of XHR request to the Ownership Server's
 * user machines endpoint.
 * @param {*} username 
 */
function ownershipRequestChannel(username) {
  const url = `${ownershipServerUrl}/me/machines?username=${username}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.send();

  return eventChannel(emit => {
    function handler(e) {
      emit(e);
      emit(END);
    }
    xhr.addEventListener('load', handler);
    xhr.addEventListener('error', handler);

    return () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) {
        xhr.abort();  // aborting if not completed
      }
      xhr.removeEventListener('load', handler);
      xhr.removeEventListener('error', handler);
    }
  });
}

/**
 * Machine list saga.
 * @param {*} username 
 */
export default function* machineListSaga(username) {
  const channel = yield call(ownershipRequestChannel, username);
  try {
    const e = yield take(channel);
    if (e.type === 'error') {
      console.error('Error occurred: ownership XHR returned error.');
    } else if (e.type === 'load') {
      const machines = (JSON.parse(e.target.response)).data;
      yield put({
        type: ActionType.MACHINES_FETCH_SUCCESS,
        payload: { machines },
      });

      //yield call(machineControlSaga, username);
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}
