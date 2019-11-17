import ActionType from './action-type.enum';

const initialState = {
  isLoggedIn: false,
  username: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isLoggedIn: true,
        username: action.payload.username,
      });
    }
    case ActionType.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isLoggedIn: false,
        username: null,
      });
    }
    default: return state;
  }
}
