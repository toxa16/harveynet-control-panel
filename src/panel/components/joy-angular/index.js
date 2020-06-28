import { connect } from 'react-redux';

import JoyAngular from './joy-angular';
import ControlAction from '../../redux/control-action';


function stp(s) {
  return {
    angular: s.panel.control.angular,
  };
}

function dtp(d) {
  return {
    onMove: angular => d({ type: ControlAction.MOVE_ANGULAR, payload: { angular } }),
    onStop: () => d({ type: ControlAction.STOP_ANGULAR }),
  };
}


export default connect(stp, dtp)(JoyAngular);
