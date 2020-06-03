import { call, cancel, delay, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import ControlAction from './control-action';


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


function* moveCommandListener(machineId, controlChannel) {
  try {
    while (true) {
      const action = yield take(`panel__move-command_${machineId}`);
      const command = action.payload;
      controlChannel.trigger('client-move-command', command);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('moveCommandListener terminated.'); // LOGGING (dev)
    }
  }
}


function* streamSaga(topic) {
  while (true) {
    console.log(topic, Date.now());
    yield delay(500);
  }
}


function* toolCommandListener(controlChannel, topic) {
  try {
    while (true) {
      const startAction = yield take(`${ControlAction.TOOL_COMMAND_START}_${topic}`);
      const streamTask = yield fork(streamSaga, topic);
      const stopAction = yield take(`${ControlAction.TOOL_COMMAND_STOP}_${topic}`);
      console.log(`${topic} stream stopped.`);
      yield cancel(streamTask);
    }
  } finally {
    if (process.env.NODE_ENV === 'development') {
      console.log('toolCommandListener terminated.'); // LOGGING (dev)
    }
  }
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
    const toolCommandListenerTask1 = yield fork(
      toolCommandListener,
      controlChannel,
      'binary_1',
    );

    yield take(ControlAction.DISCONNECT);
    pusher.unsubscribe(controlChannelName);
    sagaControlChannel.close();
    yield cancel(channelListenerTask);
    yield cancel(commandListenerTask);
    yield cancel(toolCommandListenerTask1);
  }
}
