import AuthAction from './action-type';


const initialState = {
  authenticated: false,
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    case AuthAction.AUTHENTICATE: {
      return { ...state, authenticated: true };
    }
    default: return state;
  }
}
