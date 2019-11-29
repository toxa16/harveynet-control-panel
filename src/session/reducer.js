import SessionStatus from './session-status.enum';

const initialState = {
  status: SessionStatus.CLOSED,
};

export default function sessionReducer(state = initialState, action) {
  return state;
}
