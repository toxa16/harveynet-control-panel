import { call, put } from 'redux-saga/effects';
import Pusher from 'pusher-js';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


function machineChannel(machine, pusher) {
  const { machineId } = machine;
  const channel = pusher.subscribe(`presence-${machineId}`);
  channel.bind('pusher:member_added', member => {
    console.log(member);
  });
  channel.bind('pusher:member_removed', member => {
    console.log(member);
  });
  /*channel.bind('client-my-event', function(data) {
    console.log(JSON.stringify(data));
  });*/
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
      yield call(machineChannel, machine, pusher);
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
