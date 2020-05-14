import PanelAction from './action-type';


const defaultState = {
  online: false,
  x: null,
  y: null,
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
      const { machineId } = a.payload;
      return s.map(x => {
        if (x.machineId === machineId) {
          return { ...x, state: defaultState };
        }
        return x;
      });
    }
    case PanelAction.SET_COORDINATES: {
      const { machineId, x, y } = a.payload;
      return s.map(m => {
        if (m.machineId === machineId) {
          const { state } = m;
          const newState = { ...state, x, y };
          return { ...m, state: newState };
        }
        return m;
      });
    }
    default: return s;
  }
}
