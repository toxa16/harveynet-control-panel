import ActionType from './action-type.enum';

const machines0 = [
  { id: 'machine1' },
  { id: 'machine2' },
];

const initialState = {
  username: null,
  machines: machines0,
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
      });
    }
    default: return state;
  }
}
