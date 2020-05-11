import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Pusher from 'pusher-js';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


function createSagaChannel(machine, pusherChannel) {
  const { machineId } = machine;
  return eventChannel(emit => {
    pusherChannel.bind('pusher:member_added', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_ONLINE,
          payload: { machineId },
        });
      }
    });
    pusherChannel.bind('pusher:member_removed', member => {
      if (member.id === machineId) {
        emit({
          type: PanelAction.SET_OFFLINE,
          payload: { machineId },
        });
      }
    });
    /*pusherChannel.bind('client-my-event', function(data) {
      console.log(JSON.stringify(data));
    });*/

    // unsubscribe
    return () => {};
  });
}


function* machineSaga(machine, pusher) {
  const { machineId } = machine;
  const pusherChannel = pusher.subscribe(`presence-${machineId}`);
  const sagaChannel = yield call(createSagaChannel, machine, pusherChannel);
  while (true) {
    const action = yield take(sagaChannel);
    console.log(action);
    yield put(action);
  }
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
