import PanelAction from './action-type';


export default function machines(s = null, a) {
  switch (a.type) {
    case PanelAction.SET_MACHINES: {
      return a.payload.machines;
    }
    case PanelAction.MACHINES_ERROR: {
      return a.error;
    }
    default: return s;
  }
}
