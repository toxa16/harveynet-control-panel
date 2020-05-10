import AuthAction from './action-type';


const initialState = {
  accessToken: null,
  authenticated: false,
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    case AuthAction.AUTHENTICATE: {
      const { accessToken } = action.payload;
      return { ...state, accessToken, authenticated: true };
    }
    default: return state;
  }
}
