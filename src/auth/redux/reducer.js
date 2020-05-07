import AuthAction from './action-type';


const initialState = {
  accessToken: null,
};


export default function auth(state = initialState, action) {
  switch (action.type) {
    case AuthAction.AUTHENTICATE: {
      const { accessToken } = action.payload;
      return { ...state, accessToken };
    }
    default: return state;
  }
}
