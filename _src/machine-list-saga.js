import { call, cancelled, put, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

const controlServerUrl = process.env.REACT_APP_CONTROL_SERVER_URL ||
  'wss://harveynet-control-server.herokuapp.com';

/**
 * Control Server /list Endpoint WebSocket channel.
 * @param {*} socket 
 */
function listEndpointChannel(socket) {
  return eventChannel(emit => {
    function handleOpen() {
      console.log('DEV: websocket opened.');
      //const action = { type: ActionType.CONNECT_SUCCESS };
      //emit(action);
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
      //const action = { type: ActionType.DISCONNECT_SUCCESS };
      //emit(action);
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
 * Machine list saga.
 * @param {*} username 
 */
export default function* machineListSaga(username) {
  const url = `${controlServerUrl}/list?username=${username}`;
  const socket = new WebSocket(url);
  const channel = yield call(listEndpointChannel, socket);
  try {
    yield call(handleChannelEmitter, channel);
  } finally {
    if (yield cancelled()) {
      socket.close();
    }
  }
}
