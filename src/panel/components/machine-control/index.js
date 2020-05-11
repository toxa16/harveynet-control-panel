import { connect } from 'react-redux';

import MachineControlView from './view';


function stp(s) {
  return {
    machines: s.panel.machines,
  };
}

function dtp(d) {
  return {};
}


const MachineControl = connect(
  stp,
  dtp,
)(MachineControlView);

export default MachineControl;
