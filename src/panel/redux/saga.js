import { call, put } from 'redux-saga/effects';

import PanelAction from './action-type';
import getUserMachines from '../../utils/get-user-machines';


export default function* panelSaga(accessToken) {
  try {
    const machines = yield call(getUserMachines, accessToken);
    yield put({
      type: PanelAction.SET_MACHINES,
      payload: { machines },
    });
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
