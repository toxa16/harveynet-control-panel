import ControlAction from './control-action';


export default function control(s = null, a) {
  switch (a.type) {
    case ControlAction.SET_MACHINE_ID: {
      return a.payload.machineId;
    }
    case ControlAction.DISCONNECT: {
      return null;
    }
    default: return s;
  }
}
