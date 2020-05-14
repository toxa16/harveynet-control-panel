import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Pusher from 'pusher-js';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


function createSagaChannel(machineId, pusherChannel) {
  return eventChannel(emit => {
    // checking whether the machine is already online
    pusherChannel.bind('pusher:subscription_succeeded', () => {
      const alreadyConnectedMachine = pusherChannel.members.get(machineId);
      if (alreadyConnectedMachine) {
        emit({
          type: PanelAction.SET_ONLINE,
          payload: { machineId },
        });
      }
    });
    // subscribing on machine connecting
    pusherChannel.bind('pusher:member_added', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_ONLINE,
          payload: { machineId },
        });
      }
    });
    // subscribing on machine disconnecting
    pusherChannel.bind('pusher:member_removed', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_OFFLINE,
          payload: { machineId },
        });
      }
    });
    // set coordinates
    pusherChannel.bind('client-set-coordinates', function(msg) {
      const { x, y } = msg;
      emit({
        type: PanelAction.SET_COORDINATES,
        payload: { machineId, x, y },
      });
    });

    /*let x = 0;
    let y = 0;
    const dx = 0.2;
    const dy = -0.05;
    setInterval(() => {
      emit({
        type: PanelAction.SET_COORDINATES,
        payload: { machineId, x, y },
      });
      x += dx;
      y += dy;
    }, 1000);*/

    // unsubscribe
    return () => {};
  });
}

function* sagaChannelListener(sagaChannel) {
  while (true) {
    const action = yield take(sagaChannel);
    yield put(action);
  }
}

/*function* moveCommandListener() {
  while (true) {
    yield take();
  }
}*/

function* machineSaga(machine, pusher) {
  const { machineId } = machine;
  const pusherChannel = pusher.subscribe(`presence-${machineId}`);
  const sagaChannel = yield call(createSagaChannel, machineId, pusherChannel);
  yield fork(sagaChannelListener, sagaChannel);
}


export default function* panelSaga(accessToken) {
  if (process.env.NODE_ENV === 'development') {
    Pusher.logToConsole = true;
  }
  const pusher = new Pusher(appKey, {
    cluster,
    authEndpoint,
    auth: {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
  });

  try {
    const machines = yield call(getUserMachines, accessToken);
    yield put({
      type: PanelAction.SET_MACHINES,
      payload: { machines },
    });
    for (const machine of machines) {
      yield fork(machineSaga, machine, pusher);
    }
  } catch(err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err);
    }
    yield put({
      type: PanelAction.MACHINES_ERROR,
      error: err,
    });
  }
}
