import { call, cancel, delay, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ControlAction from './control-action';


// config
const moveStreamInterval = 200;   // miliseconds
const toolStreamInterval = 200;   // miliseconds


function* sagaChannelListener(sagaChannel) {
  try {
    while (true) {
      const action = yield take(sagaChannel);
      yield put(action);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('sagaChannelListener terminated.');
    }
  }
}


function createSagaControlChannel(controlChannel, machineId) {
  return eventChannel(emit => {
    controlChannel.bind('pusher:subscription_succeeded', (data) => {
      emit({
        type: ControlAction.SET_MACHINE_ID,
        payload: { machineId },
      });
      if (process.env.NODE_ENV ==='development') {
        console.log('Pusher control subscription success.');  // LOGGING (dev)
      }
    });
    controlChannel.bind('pusher:subscription_error', (status) => {
      if (process.env.NODE_ENV ==='development') {
        console.error(`Pusher control subscription error: ${status}`);  // LOGGING (dev)
      }
    });
    // unsubscribe
    return () => {};
  });
}

/**
 * Turtlebot movement control saga.
 * @param {*} machineId UNNECESSARY (probably)
 * @param {*} controlChannel 
 */
function* moveCommandListener(machineId, controlChannel) {
  try {
    while (true) {
      const action = yield take(`panel__move-command_${machineId}`);
      const command = action.payload;
      controlChannel.trigger('client-move-command-turtlebot', command);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('moveCommandListener terminated.'); // LOGGING (dev)
    }
  }
}


/**
 * Streamed movement control.
 */
function* moveStreamSaga({ controlChannel, command }) {
  while (true) {
    controlChannel.trigger(`client-move-command-stream`, command);
    yield delay(moveStreamInterval);
  }
}
function* moveStreamCommandListener(controlChannel) {
  try {
    while (true) {
      const action = yield take(ControlAction.MOVE_COMMAND_START);
      const command = action.payload;
      const streamTask = yield fork(moveStreamSaga, { controlChannel, command });
      yield take(ControlAction.MOVE_COMMAND_STOP);
      yield cancel(streamTask);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('moveStreamCommandListener terminated.'); // LOGGING (dev)
    }
  }
}


/**
 * Streamed tool control.
 */
function* streamSaga({ controlChannel, topic, value }) {
  while (true) {
    yield delay(50);  // blocking instant slider updates
    controlChannel.trigger(`client-tool-${topic}`, { value });
    yield delay(toolStreamInterval - 50);
  }
}
function* toolCommandListener(controlChannel, topic) {
  try {
    while (true) {
      const action = yield take(`${ControlAction.TOOL_COMMAND_START}_${topic}`);
      const { value } = action.payload;
      const streamTask = yield fork(streamSaga, { controlChannel, topic, value });
      yield take(`${ControlAction.TOOL_COMMAND_STOP}_${topic}`);
      yield cancel(streamTask);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('toolCommandListener terminated.'); // LOGGING (dev)
    }
  }
}


function* toolControlSaga(controlChannel) {
  // binary
  yield fork(toolCommandListener, controlChannel, 'binary_1');
  yield fork(toolCommandListener, controlChannel, 'binary_2');
  yield fork(toolCommandListener, controlChannel, 'binary_3');
  yield fork(toolCommandListener, controlChannel, 'binary_4');
  yield fork(toolCommandListener, controlChannel, 'binary_5');
  yield fork(toolCommandListener, controlChannel, 'binary_6');
  yield fork(toolCommandListener, controlChannel, 'binary_7');
  yield fork(toolCommandListener, controlChannel, 'binary_8');
  yield fork(toolCommandListener, controlChannel, 'binary_9');
  // analog
  yield fork(toolCommandListener, controlChannel, 'analog_1');
  yield fork(toolCommandListener, controlChannel, 'analog_2');
  yield fork(toolCommandListener, controlChannel, 'analog_3');
}


export default function* controlSaga(pusher) {
  while (true) {
    const action = yield take(ControlAction.CONNECT);
    const { machineId } = action.payload;
    const controlChannelName = `presence-control-${machineId}`;
    const controlChannel = pusher.subscribe(controlChannelName);
    const sagaControlChannel = yield call(
      createSagaControlChannel,
      controlChannel,
      machineId,
    );
    const channelListenerTask = yield fork(
      sagaChannelListener,
      sagaControlChannel,
    );
    const commandListenerTask = yield fork(
      moveCommandListener,
      machineId,    // TODO: the `machineId` may be redundant
      controlChannel,
    );
    const moveStreamControlTask = yield fork(
      moveStreamCommandListener,
      controlChannel,
    );
    const toolControlTask = yield fork(
      toolControlSaga,
      controlChannel,
    );

    yield take(ControlAction.DISCONNECT);
    pusher.unsubscribe(controlChannelName);
    sagaControlChannel.close();
    yield cancel(channelListenerTask);
    yield cancel(commandListenerTask);
    yield cancel(moveStreamControlTask);
    yield cancel(toolControlTask);
  }
}
