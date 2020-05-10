import { connect } from 'react-redux';

import MachineListView from './view';


function stp(s) {
  return {
    machines: s.panel.machines,
    machinesError: s.panel.machinesError,
  };
}

function dtp(d) {
  return {};
}


const MachineList = connect(
  stp,
  dtp,
)(MachineListView);

export default MachineList;
