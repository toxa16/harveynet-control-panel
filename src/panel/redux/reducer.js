import PanelAction from './action-type';


const initialState = {
  machines: [],
};


export default function panel(state = initialState, action) {
  switch (action.type) {
    case PanelAction.SET_MACHINES: {
      const { machines } = action.payload;
      return { ...state, machines };
    }
    default: return state;
  }
}
