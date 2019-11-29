import { call, put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import sessionSaga from './session/saga';

const controlServerUrl = process.env.REACT_APP_CONTROL_SERVER_URL ||
  'wss://harveynet-control-server.herokuapp.com';

/**
 * Control Server /session Endpoint WebSocket channel.
 * @param {*} socket 
 */
function sessionEndpointChannel(socket) {
  return eventChannel(emit => {
    function handleOpen() {
      console.log('DEV: websocket opened.');
    }
    function handleError(e) {
      console.error('Error occurred.');
      console.error(e);
    }
    function handleMessage(e) {
      const message = e.data;
      console.log('DEV: websocket message received');
      console.log(message);
      const action = JSON.parse(e.data);
      emit(action);
    }
    function handleClose() {
      console.log('DEV: websocket closed.');
      emit(END);
    }

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('error', handleError);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('error', handleError);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
    };
  });
}

/**
 * WebSocket channel event listener.
 * @param {*} channel 
 */
function* handleChannelEmitter(channel) {
  while (true) {
    const action  = yield take(channel);
    yield put(action);
  }
}

/**
 * App (root) saga.
 */
export default function* appSaga() {
  console.log(document.cookie);

  /*const url = `${controlServerUrl}/session`;
  const socket = new WebSocket(url);
  const channel = yield call(sessionEndpointChannel, socket);

  yield call(handleChannelEmitter, channel);*/

  yield call(sessionSaga);
}
