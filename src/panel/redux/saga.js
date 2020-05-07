import { put } from 'redux-saga/effects';
import PanelAction from './action-type';


const machines0 = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];


export default function* panelSaga() {
  yield put({
    type: PanelAction.SET_MACHINES,
    payload: {
      machines: machines0,
    }
  });
}
