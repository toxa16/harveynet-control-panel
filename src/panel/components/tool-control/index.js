import { connect } from 'react-redux';

import ToolControlView from './view';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {};
}

function dtp(d) {
  return {
    onCommandStart: (topic, value) => d({
      type: `${ControlAction.TOOL_COMMAND_START}_${topic}`,
      payload: { value },
    }),
    onCommandStop: (topic) => d({
      type: `${ControlAction.TOOL_COMMAND_STOP}_${topic}`,
    }),
  };
}


const ToolControl = connect(
  stp,
  dtp,
)(ToolControlView);

export default ToolControl;
