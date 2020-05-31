import { call, fork, put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import Pusher from 'pusher-js';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';
import machineSaga from './machine-saga';


const appKey = process.env.REACT_APP_PUSHER_APP_KEY;
const cluster = process.env.REACT_APP_PUSHER_CLUSTER || 'eu';
const authEndpoint = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT;


export default function* panelSaga(accessToken) {
  //Pusher.logToConsole = true;
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
