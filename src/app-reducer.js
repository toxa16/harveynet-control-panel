import ActionType from './action-type.enum';

const initialState = {
  isLoggedIn: false,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        isLoggedIn: true,
      });
    }
    case ActionType.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isLoggedIn: false,
      });
    }
    default: return state;
  }
}
