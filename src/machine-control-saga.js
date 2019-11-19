import { call, cancelled, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ActionType from './action-type.enum';

const controlServerUrl = 'ws://localhost:5000'; // env

/**
 * Control Server websocket channel.
 * @param {*} username 
 */
function controlServerChannel(username) {
  const url = `${controlServerUrl}/?controller=${username}`;
  const socket = new WebSocket(url);

  return eventChannel(emit => {
    function handleOpen() {
      console.log('websocket opened.')
    }
    function handleError(e) {
      console.error('Error occurred.');
      console.error(e);
    }
    function handleMessage(e) {
      const action = JSON.parse(e.data);
      emit(action);
    }
    function handleClose() {
      console.log('websocket closed.');
    }

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.close();
    };
  });
}

function* handleMessage(channel) {
  while (true) {
    const action  = yield take(channel);
    yield put(action);
  }
}

/**
 * Machine control saga.
 * @param {*} username 
 */
export default function* machineControlSaga(username) {
  let channel;
  try {
    while (true) {
      const machineSelect = yield take(ActionType.MACHINE_SELECT);
      //const machineId = machineSelect.payload.machine.id;
      //console.log({machineId});
  
      // opening websocket channel
      channel = yield call(controlServerChannel, username);

      yield fork(handleMessage, channel);
  
      yield take(ActionType.MACHINE_CONTROL_EXIT);
      channel.close();
    }
  } finally {
    // this is cancelled from auth saga
    if (yield cancelled()) {
      channel && channel.close();
    }
  }
}
