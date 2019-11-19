import { call, cancelled, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ActionType from './action-type.enum';

const controlServerUrl = 'ws://localhost:5000'; // env

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
    function handleMessage(data) {
      console.log('message received: ', data);
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

export default function* machineControlSaga(username) {
  let channel;
  try {
    while (true) {
      const machineSelect = yield take(ActionType.MACHINE_SELECT);
      //const machineId = machineSelect.payload.machine.id;
      //console.log({machineId});
  
      // opening websocket channel
      channel = yield call(controlServerChannel, username);
  
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
