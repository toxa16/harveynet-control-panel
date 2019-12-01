import SessionActionType from './action-type.enum';

const initialState = {
  isWebSocketOpen: false,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SessionActionType.WEBSOCKET_OPEN: {
      return Object.assign({}, state, {
        isWebSocketOpen: true,
      });
    }
  }
  return state;
}
