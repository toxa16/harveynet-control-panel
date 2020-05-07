const machines0 = [
  {
    machineId: 'test-machine-1',
  },
  {
    machineId: 'test-machine-2',
  },
];


const initialState = {
  machines: machines0,
};


export default function panel(state = initialState, action) {
  switch (action.type) {
    default: return state;
  }
}
