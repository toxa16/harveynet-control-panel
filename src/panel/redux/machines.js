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
    case PanelAction.SET_ONLINE: {
      const { machineId } = a.payload;
      return s.map(x => {
        if (x.machineId === machineId) {
          const { state } = x;
          const newState = { ...state, online: true };
          return { ...x, state: newState };
        }
        return x;
      });
    }
    case PanelAction.SET_OFFLINE: {
      // DUPLICATED FROM SET_ONLINE (only `online` flag changed)
      const { machineId } = a.payload;
      return s.map(x => {
        if (x.machineId === machineId) {
          const { state } = x;
          const newState = { ...state, online: false };
          return { ...x, state: newState };
        }
        return x;
      });
    }
    default: return s;
  }
}
