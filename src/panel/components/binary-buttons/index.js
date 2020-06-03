import { connect } from 'react-redux';

import BinaryButtonsView from './view';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    /*onCommand: command => d({
      type: `${ControlAction.TOOL_COMMAND}_${command.machineId}`,
      payload: command,
    }),*/
    onCommandStart: (machineId, topic) => {
      console.log('command start', topic, machineId);
    },
    onCommandStop: (machineId, topic) => {
      console.log('command stop', topic, machineId);
    },
  };
}


const BinaryButtons = connect(
  stp,
  dtp,
)(BinaryButtonsView);

export default BinaryButtons;
