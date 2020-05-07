import { call, put } from 'redux-saga/effects';

import PanelAction from './action-type';


export default function* panelSaga(ownershipClient) {
  //console.log('panel saga running...')
  const machines = yield call(ownershipClient.getUserMachines);
  yield put({
    type: PanelAction.SET_MACHINES,
    payload: { machines },
  });
}
