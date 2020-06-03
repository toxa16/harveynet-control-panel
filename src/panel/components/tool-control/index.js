import { connect } from 'react-redux';

import ToolControlView from './view';
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
    onCommandStart: (machineId, topic) => d({
      type: ControlAction.TOOL_COMMAND_START,
    }),
    onCommandStop: (machineId, topic) => d({
      type: ControlAction.TOOL_COMMAND_STOP,
    }),
  };
}


const ToolControl = connect(
  stp,
  dtp,
)(ToolControlView);

export default ToolControl;
