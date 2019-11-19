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
      return Object.assign({}, state, {
        machines: action.payload.machines,
      });
    }
    case ActionType.MACHINE_SELECT: {
      return Object.assign({}, state, {
        currentMachine: action.payload.machine,
      });
    }
    default: return state;
  }
}
