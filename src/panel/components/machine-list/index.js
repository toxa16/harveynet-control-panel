import { connect } from 'react-redux';

import MachineListView from './view';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {
    machines: s.panel.machines,
  };
}

function dtp(d) {
  return {
    onMachineSelect: machineId => {
      /*
      d({
        type: ControlAction.CONNECT,
        payload: { machineId },
      })
      */
    },
  };
}


const MachineList = connect(
  stp,
  dtp,
)(MachineListView);

export default MachineList;
