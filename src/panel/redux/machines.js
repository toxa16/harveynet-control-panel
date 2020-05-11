import PanelAction from './action-type';


const defaultState = {
  online: false,
}


export default function machines(s = null, a) {
  switch (a.type) {
    case PanelAction.SET_MACHINES: {
      const { machines } = a.payload;
      return machines.map(x => ({
        ...x,
        state: defaultState,
      }));
    }
    case PanelAction.MACHINES_ERROR: {
      return a.error;
    }
    default: return s;
  }
}
