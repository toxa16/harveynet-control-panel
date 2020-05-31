import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import PanelAction from './action-type';


function* sagaChannelListener(sagaChannel) {
  while (true) {
    const action = yield take(sagaChannel);
    yield put(action);
  }
}

function createSagaControlChannel(controlChannel, machineId) {
  return eventChannel(emit => {
    controlChannel.bind('pusher:subscription_succeeded', () => {
      emit({
        type: PanelAction.ENABLE_CONTROL,
        payload: { machineId, enabled: true },
      });
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
  while (true) {
    const action = yield take(`panel__move-command_${machineId}`);
    const command = action.payload;
    controlChannel.trigger('client-move-command', command);
  }
}

/*export default function* controlSaga(pusher, machineId) {
  const controlChannel = pusher.subscribe(`presence-control-${machineId}`);
  const sagaControlChannel = yield call(createSagaControlChannel, controlChannel, machineId);
  yield fork(sagaChannelListener, sagaControlChannel);
  yield fork(moveCommandListener, machineId, controlChannel);
}*/

export default function* controlSaga(pusher) {
  console.log('control saga running...');
}
