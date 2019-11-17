import ActionType from './action-type.enum';

const initialState = {
  username: null,
  machines: [],
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
      });
    }
    case ActionType.MACHINES_FETCH_SUCCESS: {
      return Object.assign({}, state, {
        machines: action.payload.machines,
      });
    }
    default: return state;
  }
}
