import PanelAction from './action-type';


const initialState = {
  machines: null,
};


export default function panel(state = initialState, action) {
  switch (action.type) {
    case PanelAction.SET_MACHINES: {
      const { machines } = action.payload;
      return { ...state, machines };
    }
    case PanelAction.MACHINES_ERROR: {
      const { error } = action;
      return { ...state, machines: error };
    }
    default: return state;
  }
}
