import ControlAction from './control-action';

const initialState = {
  machineId: null,
  linear: 0,
  angular: 0,
};

export default function control(s = initialState, a) {
  switch (a.type) {
    case ControlAction.SET_MACHINE_ID: {
      const { machineId } = a.payload;
      return { ...s, machineId };
    }
    case ControlAction.MOVE_LINEAR: {
      const { linear } = a.payload;
      return { ...s, linear };
    }
    case ControlAction.STOP_LINEAR: {
      return { ...s, linear: 0 };
    }
    case ControlAction.DISCONNECT: {
      return initialState;
    }
    default: return s;
  }
}
