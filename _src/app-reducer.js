import ActionType from './action-type.enum';

const initialState = {
  username: null,
  machines: [],
  currentMachine: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        username: action.payload.username,
      });
    }
    case ActionType.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        username: null,
        machines: [],
        currentMachine: null
      });
    }
    case ActionType.MACHINES_FETCH_SUCCESS: {
      const machines = action.payload.machines.map(x => {
        return {
          id: x.id,
          isOnline: false,
        }
      });
      return Object.assign({}, state, { machines });
    }
    case ActionType.MACHINE_SELECT: {
      return Object.assign({}, state, {
        currentMachine: action.payload.machine,
      });
    }
    case ActionType.MACHINE_CONTROL_EXIT: {
      const machines = state.machines.map(x => {
        return {
          id: x.id,
          isOnline: false,
        };
      });
      return Object.assign({}, state, {
        machines,
        currentMachine: null,
      });
    }
    case ActionType.MACHINE_STATUS_CHANGE: {
      const machines = state.machines.map(x => {
        const { machineId, isOnline } = action.payload;
        if (x.id === machineId) {
          return {
            id: x.id,
            isOnline,
          };
        } else {
          return x;
        }
      });

      let currentMachine = state.currentMachine;
      const { machineId, isOnline } = action.payload;
      if (state.currentMachine.id === machineId) {
        currentMachine = { id: machineId, isOnline };
      }
      return Object.assign({}, state, { currentMachine, machines });
    }
    case ActionType.MACHINE_LIST_UPDATE: {
      const { machines } = action.payload;
      return Object.assign({}, state, { machines });
    }
    default: return state;
  }
}
