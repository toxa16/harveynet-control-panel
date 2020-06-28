import ControlAction from './control-action';

const initialState = {
  machineId: null,
};

export default function control(s = initialState, a) {
  switch (a.type) {
    case ControlAction.SET_MACHINE_ID: {
      const { machineId } = a.payload;
      return { ...s, machineId };
    }
    case ControlAction.DISCONNECT: {
      return initialState;
    }
    default: return s;
  }
}
