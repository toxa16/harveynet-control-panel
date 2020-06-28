import { connect } from 'react-redux';

import JoyLinear from './joy-linear';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {
    linear: s.panel.control.linear,
  };
}

function dtp(d) {
  return {
    onMove: linear => d({ type: ControlAction.MOVE_LINEAR, payload: { linear } }),
    onStop: () => d({ type: ControlAction.STOP_LINEAR }),
  };
}


export default connect(stp, dtp)(JoyLinear);
