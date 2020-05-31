import { connect } from 'react-redux';

import MachineControlView from './view';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {
    machines: s.panel.machines,
  };
}

function dtp(d) {
  return {
    onUnmount: () => d({ type: ControlAction.DISCONNECT }),
  };
}


const MachineControl = connect(
  stp,
  dtp,
)(MachineControlView);

export default MachineControl;
