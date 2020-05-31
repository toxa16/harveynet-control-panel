import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import PanelAction from './action-type';
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
    controlChannel.bind('pusher:subscription_succeeded', () => {
      /*emit({
        type: PanelAction.ENABLE_CONTROL,
        payload: { machineId, enabled: true },
      });*/
      emit({
        type: ControlAction.SET_MACHINE_ID,
        payload: { machineId },
      })
    });
    controlChannel.bind('pusher:subscription_error', () => {
      emit({
        type: PanelAction.ENABLE_CONTROL,
        payload: { machineId, enabled: false },
      });
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
      console.log('moveCommandListener terminated.');
    }
  }
}

/*export default function* controlSaga(pusher, machineId) {
  const controlChannel = pusher.subscribe(`presence-control-${machineId}`);
  const sagaControlChannel = yield call(createSagaControlChannel, controlChannel, machineId);
  yield fork(sagaChannelListener, sagaControlChannel);
  yield fork(moveCommandListener, machineId, controlChannel);
}*/

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
      machineId,
      controlChannel,
    );

    yield take(ControlAction.DISCONNECT);
    pusher.unsubscribe(controlChannelName);
    sagaControlChannel.close();
    yield cancel(channelListenerTask);
    yield cancel(commandListenerTask);
  }
}
